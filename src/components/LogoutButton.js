'use client';

import { logoutAction } from "../app/login/action";
import { startTransition, useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}