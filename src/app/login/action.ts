'use server';

import { login as authLogin, logout as authLogout, UserRole } from "../../lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(role: UserRole, callbackUrl: string = '/dashboard') {
  console.log('Login Action triggered')
  await authLogin(role);

  redirect(callbackUrl);
}

export async function logoutAction() {
  await authLogout();

  console.log('Logout Action triggered')
  redirect('/login')
}