import axios from "axios";

// --- Base Axios Client ---
export const api = axios.create({
  // Ensure this matches your Node/Express server's address and base API path
  baseURL: "http://localhost:5000/api", 
});

// --- Product Service Functions ---

/**
 * @desc Fetches the list of all available products. (GET /api/products)
 */
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw for components to handle
  }
};

// --- Cart Service Functions ---

/**
 * @desc Fetches the current cart contents and calculated total. (GET /api/cart)
 */
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    // Returns { cart: {}, total: 0 }
    return response.data; 
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

/**
 * @desc Adds a product to the cart or updates its quantity. (POST /api/cart)
 * @param {string} productId The ID of the product to add.
 * @param {number} qty The quantity to add (defaults to 1).
 */
export const addToCart = async (productId, qty = 1) => {
  try {
    const response = await api.post("/cart", { productId, qty });
    // Returns the updated { cart: {}, total: 0 }
    return response.data; 
  } catch (error) {
    console.error("Error adding to cart:", error);
    // A gentleman's code handles specific backend errors
    throw error.response?.data || error;
  }
};

/**
 * @desc Removes a specific item from the cart. (DELETE /api/cart/:id)
 * @param {string} productId The ID of the item (product) to remove.
 */
export const removeFromCart = async (productId) => {
  try {
    // Note the use of backticks for dynamic URL parameters
    const response = await api.delete(`/cart/${productId}`); 
    // Returns the updated { cart: {}, total: 0 }
    return response.data; 
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error.response?.data || error;
  }
};

/**
 * @desc Simulates the checkout process. (POST /api/checkout)
 * @param {{name: string, email: string}} checkoutDetails Customer name and email.
 */
export const checkoutCart = async (checkoutDetails) => {
  try {
    const response = await api.post("/cart/checkout", checkoutDetails);
    // Returns the mock receipt object
    return response.data; 
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error.response?.data || error;
  }
};