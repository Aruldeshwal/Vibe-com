// frontend/src/context/CartContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, checkoutCart } from '../api/client'; // Import the service layer

// 1. Create the Context (The "container" for global state)
export const CartContext = createContext();

// 2. The Provider Component (The "manager" of the state)
export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Initial Fetch ---
  useEffect(() => {
    fetchInitialCart();
  }, []);

  const fetchInitialCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCart();
      setCartState(data.cart);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to load cart data.');
    } finally {
      setLoading(false);
    }
  };

  // --- Cart Actions ---
  
  // Handles both adding a new item and updating an existing item's quantity
  const handleAddToCart = async (productId, qty = 1) => {
    try {
      setError(null);
      // Calls the API to update the cart on the backend
      const data = await addToCart(productId, qty);
      
      // Update local state with the new data returned from the backend
      setCartState(data.cart);
      setTotal(data.total);
      return true;
    } catch (err) {
      setError(err.message || 'Could not add item to cart.');
      return false;
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      setError(null);
      const data = await removeFromCart(productId);
      setCartState(data.cart);
      setTotal(data.total);
    } catch (err) {
      setError(err.message || 'Could not remove item.');
    }
  };
  
  const handleCheckout = async (details) => {
    try {
      setError(null);
      setLoading(true);
      const receipt = await checkoutCart(details);
      
      // Clear the cart state locally after a successful checkout
      setCartState({ items: [] });
      setTotal(0);
      return receipt;
    } catch (err) {
      setError(err.message || 'Checkout failed.');
      throw err; // Re-throw to allow the Checkout page to handle UI error
    } finally {
      setLoading(false);
    }
  };

  // --- Value provided to components ---
  const contextValue = {
    cart: cartState,
    total,
    loading,
    error,
    itemCount: cartState.items.reduce((sum, item) => sum + item.qty, 0),
    handleAddToCart,
    handleRemoveFromCart,
    handleCheckout,
    fetchInitialCart // Handy for refreshing the cart manually
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};