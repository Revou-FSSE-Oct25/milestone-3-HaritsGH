'use client';

import { createContext, useContext, useState } from "react";

// object itemDetails = {
//   id: string
//   name: string
//   price: number, preferably integer or float
//   quantity: integer
// }

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [inCartItems, setInCartItems] = useState([]);

  // Add item to Cart
  const addItem = (newItem) => {
    setInCartItems((previous) =>{
      const existingItem = previous.find(item => item.id === newItem.id)
      if ( existingItem ) {
        return previous.map(item => item.id === newItem.id ? {...item, quantity: item.quantity + 1}: item)
      }
      return [...previous, {...newItem, quantity : 1}]
    })
  };

  // Remove item from Cart
  const removeItem = (id) => {
    setInCartItems(previous => previous.filter(item => item.id !== id))
  };

  // CLear item from Cart
  const clearCart = () => {
    setInCartItems([])
  };

  // Calculate total price
  const totalCartValue = inCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{inCartItems, addItem, removeItem, clearCart, totalCartValue}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must used between cart context')
  
  return context;
};