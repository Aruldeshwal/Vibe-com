// frontend/src/components/CartItem.jsx

import React from 'react';
import { useCart } from '../context/useCart';

const CartItem = ({ item }) => {
    const { handleRemoveFromCart, handleAddToCart, loading } = useCart();

    const product = item.product;
    const itemSubtotal = (product.price * item.qty).toFixed(2);

    const handleRemove = () => handleRemoveFromCart(product._id);
    const handleUpdateQuantity = (change) => handleAddToCart(product._id, change);

    return (
        <div
            className="
                flex flex-col sm:flex-row sm:items-center sm:justify-between
                border-b border-gray-200 
                py-3 sm:py-5 gap-4 sm:gap-2
                px-2 sm:px-0
                transition-all duration-200
                rounded-md
            "
        >
            {/* --- Product Info --- */}
            <div className="flex items-center w-full sm:w-1/2">
                <div
                    className="
                        w-14 h-14 sm:w-12 sm:h-12 bg-gray-100 rounded-md mr-3 sm:mr-4 shrink-0
                        flex items-center justify-center
                    "
                >
                    <span className="text-gray-500 text-xs sm:text-[10px] text-center">
                        Item Visual
                    </span>
                </div>

                <div className="flex flex-col flex-auto min-w-0"> 
            
            <span 
                // Default (mobile) width: Constrains the name to about 70px (approx 4-5 chars)
                // We use the full CSS properties directly because Tailwind's `truncate`
                // doesn't allow flexible truncation length based on width alone.
                // The `w-[70px]` forces the text container to be small.
                className="font-semibold text-base sm:text-lg text-gray-800 
                           w-[70px] sm:w-full overflow-hidden whitespace-nowrap text-ellipsis"
                title={product.name}
            >
                {product.name || 'Item Name'}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">${(product.price || 0).toFixed(2)} each</span>
        </div>
            </div>

            {/* --- Quantity Controls --- */}
            <div
                className="
                    flex items-center justify-center 
                    w-full sm:w-1/4 gap-1 sm:gap-2
                "
            >
                <button
                    onClick={() => handleUpdateQuantity(-1)}
                    disabled={loading || item.qty <= 1}
                    className="
                        px-2 sm:px-3 py-1.5 sm:py-2 border rounded-l
                        hover:bg-gray-100 disabled:opacity-50
                        text-sm sm:text-base
                        transition
                    "
                >
                    –
                </button>

                <span
                    className="
                        px-3 sm:px-4 py-1.5 sm:py-2 border-t border-b 
                        font-medium text-sm sm:text-base text-center w-10 sm:w-12
                    "
                >
                    {item.qty}
                </span>

                <button
                    onClick={() => handleUpdateQuantity(1)}
                    disabled={loading}
                    className="
                        px-2 sm:px-3 py-1.5 sm:py-2 border rounded-r
                        hover:bg-gray-100 disabled:opacity-50
                        text-sm sm:text-base
                        transition
                    "
                >
                    +
                </button>
            </div>

            {/* --- Subtotal + Remove --- */}
            <div
                className="
                    flex flex-row sm:flex-row items-center justify-between 
                    sm:justify-end sm:w-1/4 w-full
                    mt-1 sm:mt-0 gap-2 sm:gap-3
                "
            >
                <span
                    className="
                        font-bold text-base sm:text-xl text-gray-800 text-right w-auto
                    "
                >
                    ${itemSubtotal}
                </span>

                <button
                    onClick={handleRemove}
                    disabled={loading}
                    className="
                        text-red-600 hover:text-red-800
                        transition-colors disabled:opacity-50
                        text-base sm:text-lg
                    "
                    title="Remove Item"
                >
                    ❌
                </button>
            </div>
        </div>
    );
};

export default CartItem;
