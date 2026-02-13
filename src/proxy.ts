import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, User } from "./lib/auth";

const PROTECTED_ROUTES = {
  '/dashboard': ['user', 'admin'],
  '/private': ['admin']
} as const;

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  const authCookie = request.cookies.get(AUTH_COOKIE)
  let user: User | null = null;
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

    const allowedRoles = PROTECTED_ROUTES[protectedRouteKey as keyof typeof PROTECTED_ROUTES]
    if (user && !allowedRoles.includes(user.role as any)) {
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }
  }

  return NextResponse.next();
}