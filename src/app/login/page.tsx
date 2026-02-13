'use client';

import { useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { loginAction } from "./action";
import React from "react";

export default function LoginPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm/>
    </Suspense>
  )
}

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [isPending, startTransition] = useTransition();

  const handleLogin = (role: 'admin' | 'user') => {
    startTransition(async () => {
      await loginAction(role, callbackUrl);
    });
  };

  return (
    <div>
      <div>
        <h2>Welcome back!</h2>
        <p>Select a role to continue</p>
      </div>
      
      <div>
        {/* Button for User role */}
        <button onClick={() => handleLogin('user')} disabled={isPending}>
          {isPending ? 'Signing in' : 'Sign in as User'}
        </button>

        {/* Button for Admin role */}
        <button onClick={() => handleLogin('admin')} disabled={isPending}>
          {isPending ? 'Signing in' : 'Sign in as Admin'}
        </button>
      </div>
    </div>
  )
}