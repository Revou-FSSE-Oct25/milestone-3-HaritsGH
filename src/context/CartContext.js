'use client';

import { createContext, useContext, useState, useEffect } from "react";

// object itemDetails = {
//   id: string
//   name: string
//   price: number, preferably integer or float
//   quantity: integer
// }

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [inCartItems, setInCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(inCartItems));
  }, [inCartItems]);

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

  // Reduce item quantity from Cart
  const reduceItem = (id) => {
    const item = inCartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      // Decrement quantity
      setInCartItems(prev => 
        prev.map(cartItem => 
          cartItem.id === id 
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      // Remove item completely
      setInCartItems(previous => previous.filter(item => item.id !== id));
    }
  };

  // Remove item from Cart
  const removeItem = (id) => {
    setInCartItems(previous => previous.filter(item => item.id !== id));
  };

  // Clear item from Cart
  const clearCart = () => {
    setInCartItems([])
    localStorage.removeItem('cartItems');
  };

  // Calculate total price
  const totalCartValue = inCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{inCartItems, addItem, reduceItem, removeItem, clearCart, totalCartValue}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must used between cart context')
  
  return context;
};