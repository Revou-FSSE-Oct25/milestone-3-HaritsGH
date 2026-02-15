'use client';

import { CartProvider } from "@/context/CartContext";

import ProductList from "../components/ProductList";
// import ProductCategorySelector from "@/components/ProductCategorySelector";
import Advertisement from "../components/Advertisement";
import LogoutButton from "../components/LogoutButton";

import { getSession } from "@/lib/auth";

import { Suspense } from "react";

function DashboardPage() {
  // get session user role
  const session = getSession()

  const isAdmin = session?.role === 'admin';

  return (
    <CartProvider>
      <div className="flex flex-col items-center">
        <Advertisement/>
        <div>
          <h2>Dashboard</h2>
          <LogoutButton/>
        </div>

        {/* content admin only can see */}
        {isAdmin && (
          <div>
            <p>DAIWA SCARLET MONTOK BANGET AJGGG</p>
          </div>
        )}

        {/* content everyone can see */}
        <ProductList/>
      </div>
    </CartProvider>
  );
}

export default function DashboardPageWrapper(){
  return(
    <Suspense>
      <DashboardPage/>
    </Suspense>
  )
}