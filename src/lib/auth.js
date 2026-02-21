import { cookies } from "next/headers";

export const AUTH_COOKIE = 'auth_token';

export async function login(role) {
  const user = {
    id: crypto.randomUUID(),
    name: role === 'admin' ? 'admin user' : 'standard user',
    priviledge: role
  }
  const expires = new Date(Date.now() + 1000 * 60 * 10); // expires in 10 minutes

  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    // secure: true,
    expires,
    sameSite: 'lax',
    path: '/'
  })

  // console.log(`login triggered as ${role}...`);
  return user;
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)

  // console.log(`logout triggered...`)
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)

  if (!token) return null

  try {
    return JSON.parse(token.value)
  } catch {
    return null
  }
}