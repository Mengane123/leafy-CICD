import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addProductToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        } else {
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }
      }),
      removeProductFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      updateProductQuantity: (productId, newQuantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // Key for sessionStorage
      getStorage: () => sessionStorage, // Use sessionStorage
    }
  )
);
