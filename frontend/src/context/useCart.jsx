// frontend/src/context/useCart.jsx

import { useContext } from 'react';
import { CartContext } from './cartContext';

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  // A proper check to ensure the hook is used within the Provider
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};