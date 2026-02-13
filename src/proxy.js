import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
import { AUTH_COOKIE } from "./lib/auth";

const PROTECTED_ROUTES = {
  '/dashboard': ['user', 'admin'],
  '/private': ['admin']
};

export function proxy(request) {
  const {pathname} = request.nextUrl;

  const authCookie = request.cookies.get(AUTH_COOKIE)
  let user = null;
  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value)
    } catch {
      console.log('ga punya cookie')
    }
  }

  const isLoggedin = !!user;

  if (isLoggedin && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  const protectedRouteKey = Object.keys(PROTECTED_ROUTES).find(route => pathname.startsWith(route))

  if (protectedRouteKey) {
    // if not logged in, we kick them to login page
    if (!isLoggedin) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    // RBAC (Role-Based Access Control)

    const allowedRoles = protectedRouteKey ? PROTECTED_ROUTES[protectedRouteKey] : undefined;
    if (user && !allowedRoles.includes(user.priviledge)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next();
}