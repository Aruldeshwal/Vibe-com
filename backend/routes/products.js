// backend/routes/products.js (Updated for Fake Store API)

import express from 'express';
import Product from '../models/Product.js';
import axios from 'axios'; // Import axios

const router = express.Router();

const FAKE_STORE_API = 'https://fakestoreapi.com/products?limit=10';

const fetchAndCacheProducts = async () => {
    try {
        // 1. Check local DB first (Simple Caching)
        let products = await Product.find({});
        if (products.length > 0) {
            console.log('✅ Serving products from local cache.');
            return products;
        }

        // 2. If DB is empty, fetch from external API
        console.log('🌐 Fetching products from Fake Store API...');
        const response = await axios.get(FAKE_STORE_API);
        const externalProducts = response.data;

        // 3. Map and save to local DB
        const productsToSave = externalProducts.map(p => ({
            name: p.title,
            price: p.price,
            desc: p.description,
            img: p.image, // Mapping 'image' to 'img'
            externalId: p.id
        }));

        products = await Product.insertMany(productsToSave);
        console.log(`✨ Successfully cached ${products.length} new products.`);
        return products;

    } catch (error) {
        console.error('❌ FAILED to fetch/cache products:', error.message);
        // Throw an error that the route handler can catch
        throw new Error('Inventory service unavailable.');
    }
};

// @route   GET /api/products
// @desc    Fetch all products (fetches from Fake Store if local DB is empty)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await fetchAndCacheProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(503).json({ 
            message: error.message,
            detail: 'Could not connect to external inventory source.'
        });
    }
});

export default router;