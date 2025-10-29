// frontend/src/pages/Cart.jsx

import React, { useState } from "react";
import { useCart } from "../context/useCart";
import CartItem from "../component/cartItem";

const CartPage = () => {
  const { cart, total, loading, error, handleCheckout } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleFormChange = (e) => {
    setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    try {
      const mockReceipt = await handleCheckout(checkoutDetails);
      setReceipt(mockReceipt);
      setIsCheckingOut(false);
    } catch (err) {
      alert(`Checkout Error: ${err.message}`);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-16 sm:mt-20 text-base sm:text-xl font-medium">
        Fetching your cart contents... 🛍️
      </div>
    );
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!cart || !cart.items)
    return (
      <div className="text-center mt-20 text-base sm:text-lg font-medium">
        Preparing cart data...
      </div>
    );

  // --- Receipt View ---
  if (receipt) {
    return (
      <div className="max-w-md sm:max-w-xl mx-auto mt-8 sm:mt-10 p-4 sm:p-8 bg-green-50 border-4 border-green-300 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-green-700 mb-3 sm:mb-4">
          Transaction Complete! ✅
        </h2>
        <p className="text-base sm:text-xl mb-4 sm:mb-6">
          A mock receipt has been successfully generated.
        </p>

        <div className="text-left bg-white p-3 sm:p-4 rounded-lg border">
          <p className="text-sm sm:text-base">
            <strong>Customer:</strong> {receipt.customerName}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Email:</strong> {receipt.customerEmail}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Items:</strong> {receipt.itemsPurchased.length}
          </p>
          <p className="mt-2 text-lg sm:text-2xl font-bold text-red-600">
            Final Total: ${receipt.finalTotal.toFixed(2)}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
            ID: {receipt.transactionId}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500">
            Time: {new Date(receipt.timestamp).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => setReceipt(null)}
          className="mt-5 sm:mt-6 bg-blue-600 text-white py-2 px-4 sm:px-6 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Return to Shopping
        </button>
      </div>
    );
  }

  // --- Empty Cart ---
  if (cart.items.length === 0) {
    return (
      <div className="text-center mt-16 sm:mt-20 p-4 sm:p-10 border rounded-lg max-w-sm sm:max-w-lg mx-auto bg-gray-100">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
          Your Cart is Empty 🛒
        </h2>
        <p className="text-sm sm:text-lg mb-2">
          Add something to your cart to continue shopping!
        </p>
        <a
          href="/"
          className="mt-3 inline-block text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
        >
          Go to Products
        </a>
      </div>
    );
  }

  // --- Main Cart ---
  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 px-2 sm:px-6">
      {/* Cart Items */}
      <div className="w-full lg:w-3/5 bg-white p-3 sm:p-6 border rounded-lg shadow-md">
        <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6 border-b pb-2 text-gray-800 text-center sm:text-left">
          Your Current Selection
        </h2>
        <div className="space-y-2 sm:space-y-4">
          {cart.items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="w-full lg:w-2/5 bg-white p-3 sm:p-6 border rounded-lg shadow-md lg:sticky lg:top-20 h-fit">
        <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 border-b pb-2 text-gray-800 text-center sm:text-left">
          Order Summary
        </h2>

        <div className="flex justify-between text-base sm:text-xl font-semibold mb-3 sm:mb-6">
          <span>Total Items:</span>
          <span>{cart.items.reduce((sum, item) => sum + item.qty, 0)}</span>
        </div>

        <div className="flex justify-between text-xl sm:text-3xl font-extrabold text-red-700 border-t pt-3 sm:pt-4">
          <span>Grand Total:</span>
          <span>${(total || 0).toFixed(2)}</span>
        </div>

        <button
          onClick={() => setIsCheckingOut(true)}
          className="w-full mt-4 sm:mt-6 bg-green-600 text-white text-sm sm:text-lg py-2 sm:py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md"
        >
          Proceed to Mock Checkout
        </button>

        {/* Checkout Modal */}
        {isCheckingOut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3 sm:px-0">
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-2xl w-full max-w-xs sm:max-w-md">
              <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 border-b pb-2">
                Finalize Purchase
              </h3>
              <form onSubmit={handleCheckoutSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={checkoutDetails.name}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm sm:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={checkoutDetails.email}
                    onChange={handleFormChange}
                    required
                    className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-full sm:w-auto py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {loading ? "Processing..." : `Pay $${(total || 0).toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
