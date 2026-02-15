'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { loginAction } from "./action";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isPending, startTransition] = useTransition();

  const handleLogin = (role) => {
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

export default function LoginPageWrapper(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage/>
    </Suspense>
  )
}