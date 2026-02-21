'use client';

import Link from "next/link";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useSessionContext } from "@/context/SessionContext";
import { useCart } from "@/context/CartContext";

export default function NavBar() {

  const session = useSessionContext();
  const { inCartItems } = useCart();
  
  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Search bar */}
        <input type="text" placeholder="Search products..." className="border border-gray-300 rounded px-2 py-1" />

        {/* User Section - Code from page.js lines 23-29 */}
        <div className="flex items-center gap-2">
          {session === null ? 
            <LoginButton /> : 
            <div className="flex flex-row items-center justify-end gap-1">
              <p className="text-sm text-gray-700">Hi, {session.name}</p>
              <Link 
                href="/checkout" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Cart {inCartItems.length > 0 && `(${inCartItems.length})`}
              </Link>
              {session.priviledge === 'admin' && (
                <Link 
                  href="/manage" 
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Manage Products
                </Link>
              )}
              <LogoutButton />
            </div>
          }
        </div>
      </div>
    </nav>
  );
}
