'use server';

import { login, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(role, callbackUrl = '/') {
  // console.log('Login Action triggered 99');
  
  await login(role);
  redirect(callbackUrl)
}

export async function logoutAction() {
  await logout();
  // console.log('Logout Action triggered 99');
  redirect('/');
}