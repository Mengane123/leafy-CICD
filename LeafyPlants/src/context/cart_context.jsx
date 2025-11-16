// src/context/CartContext.js
import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addProductToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProductFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateProductQuantity = (id, quantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeProductFromCart, updateProductQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
