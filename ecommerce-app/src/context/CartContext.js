'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  setCart((prev) => {
    const exists = prev.find((p) => p.id === product.id);
    let updated;
    if (exists) {
      updated = prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updated = [...prev, { ...product, quantity: 1 }];
    }
    return updated;
  });

  toast(`Added to Cart: ${product.name}`); 
};

const removeFromCart = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
  toast('Removed from Cart'); 
};


  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
