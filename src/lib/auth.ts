'use server';

import { cookies } from "next/headers";

export const AUTH_COOKIE = 'auth_token';

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export async function login(role: UserRole) {
  const user: User = {
    id: crypto.randomUUID(),
    name: role === 'admin' ? 'admin user' : 'standard user',
    role
  }
  const expires = new Date(Date.now() + 1000 * 60 * 60) // will expire in 1 hour
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    // secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  })

  console.log(`[Mock Auth] Logging in as ${role}`)
  return user
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE)

  console.log('[Mock Auth] Logging out...')
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)

  if (!token) return null

  try {
    return JSON.parse(token.value) as User
  } catch {
    return null
  }
  
  return null;
}