// frontend/src/pages/Products.jsx

import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/client';
import ProductCard from '../component/productCard';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState(null);

    // --- Data Fetching Logic (The Inventory Retrieval) ---
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setPageError('Failed to fetch the inventory. Server may be offline.');
                console.error(err);
            } finally {
                setPageLoading(false);
            }
        };
        loadProducts();
    }, []); // Empty dependency array ensures this runs once

    // --- Loading and Error States ---
    if (pageLoading) {
        return <div className="text-center mt-20 text-xl font-medium">Fetching the splendid inventory... ⏳</div>;
    }

    if (pageError) {
        return <div className="text-center mt-20 text-red-600 font-bold p-4 border border-red-300 bg-red-50 rounded-lg">{pageError}</div>;
    }

    // --- Product Grid Display ---
    return (
        <div>
            <h2 className="text-3xl font-serif font-bold mb-8 text-gray-800 border-b pb-2">
                Items of Distinction
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    // We rely on MongoDB's unique _id as the React key
                    <ProductCard key={product._id} product={product} /> 
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;