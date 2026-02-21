'use client';

import { logoutAction } from "@/app/login/action"
import { useTransition } from "react";
import { useCart } from "@/context/CartContext";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  const { clearCart } = useCart();

  const handleLogout = () => {
    // Clear cart state and localStorage
    clearCart();
    
    // Trigger server logout
    startTransition(() => logoutAction());
  };

  return (
    <button 
      className="border border-black"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  )
}

export default LogoutButton
