'use server';

import { login as authLogin, logout as authLogout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(role, callbackUrl = '/dashboard') {
  console.log('Login Action triggered')
  await authLogin(role);

  redirect(callbackUrl);
}

export async function logoutAction() {
  await authLogout();

  console.log('Logout Action triggered')
  redirect('/login')
}