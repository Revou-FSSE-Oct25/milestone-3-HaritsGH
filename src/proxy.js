import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "./lib/auth";

const PROTECTED_ROUTES = {
  '/checkout' : ['user', 'admin'],
  '/manage' : ['admin']
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get(AUTH_COOKIE);
  let user = null;
  if (authCookie) {
    try {
      user =JSON.parse(authCookie.value)
    } catch {
      // console.log('ga punya cookie')
    }
  }

  const isLoggedIn = !!user;

  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const protectedRouteKey = Object.keys(PROTECTED_ROUTES).find(route => pathname.startsWith(route))

  if (protectedRouteKey) {
    // if not logged in, kick to login page
    if (!isLoggedIn) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    // Role-Based Access Control (RBAC)

    const allowedRoles = PROTECTED_ROUTES[protectedRouteKey]
    if (user && !allowedRoles.includes(user.priviledge)) {
      return NextResponse.redirect(new URL('/faq', request.url))
    }
  }

  return NextResponse.next()
}