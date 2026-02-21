'use client';

import { useCart } from "@/context/CartContext";
import { useSessionContext } from "@/context/SessionContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { inCartItems, addItem, reduceItem, removeItem, clearCart, totalCartValue } = useCart();
  const session = useSessionContext();

  const handleQuantityChange = (item, change) => {
    change > 0 
      ? addItem(item)
      : reduceItem(item.id);
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-stone-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Please log in to view your cart.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-9/10 bg-stone-100 py-8">
      <div className="max-w-7xl w-9/10 mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>
        
        {inCartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cart Items */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items: ({inCartItems.length})</h2>
              
              <div className="space-y-4">
                {inCartItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <Image
                        unoptimized 
                        src={item.image} 
                        alt={item.name} 
                        width={50} 
                        height={50} 
                        className="object-cover rounded mx-2"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="border-t bg-gray-50 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">${totalCartValue.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Continue Shopping */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline transition-colors">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}