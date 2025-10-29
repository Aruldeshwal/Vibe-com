// frontend/src/components/ProductCard.jsx

import React from 'react';
import { useCart } from '../context/useCart';

const ProductCard = ({ product }) => {
    const { handleAddToCart, loading } = useCart();

    const priceDisplay = `$${product.price.toFixed(2)}`;

    const handleAdd = () => {
        handleAddToCart(product._id);
    };

    return (
        <div
            className="
                bg-white border border-gray-200 rounded-xl shadow-md 
                p-4 sm:p-5 flex flex-col 
                transition-transform hover:shadow-xl hover:-translate-y-1
                w-full max-w-sm mx-auto
            "
        >
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 text-center sm:text-left">
                {product.name}
            </h3>

            {/* Image Section */}
            <div
                className="
                    w-full h-32 sm:h-40 md:h-48 
                    bg-gray-100 flex items-center justify-center 
                    rounded-md mb-3
                "
            >
                <span className="text-gray-500 text-xs sm:text-sm">
                    Product Visual
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base grow mb-3 text-center sm:text-left">
                {product.desc}
            </p>

            {/* Footer: Price + Button */}
            <div
                className="
                    mt-auto flex flex-col sm:flex-row 
                    justify-between items-center gap-3
                    pt-3 border-t border-gray-100
                "
            >
                <span className="text-xl sm:text-2xl font-bold text-green-700">
                    {priceDisplay}
                </span>

                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="
                        w-full sm:w-auto 
                        bg-blue-600 text-white py-2 px-4 
                        rounded-lg font-medium 
                        hover:bg-blue-700 transition-colors 
                        disabled:opacity-50 text-sm sm:text-base
                    "
                >
                    {loading ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
