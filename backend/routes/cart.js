import express from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();
let MOCK_USER_ID;

async function ensureMockUser() {
    // Look up the User model and ensure at least one user exists
    let user = await User.findOne({});
    if (!user) {
        user = await User.create({});
        console.log(`[DB Persistence] Created new initial Mock User: ${user._id}`);
    }
    MOCK_USER_ID = user._id;
    return MOCK_USER_ID;
}
// backend/routes/cart.js (Updated getCart function)

async function getCart() {
    const userId = await ensureMockUser(); // Get the ID of the persistent mock user
    
    // 1. Find the cart SPECIFIC to this user.
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
        // 2. If no cart exists, CREATE a new one and LINK it to the user.
        cart = await Cart.create({ user: userId, items: [] });
        
        // 3. Since Cart.create doesn't populate, we must explicitly populate after creation 
        //    to ensure the total calculation works immediately.
        cart = await Cart.populate(cart, { path: "items.product" });
    }
    return cart;
}

router.get("/", async (req, res) => {
  const cart = await getCart();
  const total = cart.items.reduce((s, it) => s + (it.product.price * it.qty), 0);
  res.json({ cart, total });
});

router.post("/", async (req, res) => {
  const { productId, qty = 1 } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ error: "Invalid productId" });
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cart = await getCart();
  const item = cart.items.find(it => it.product._id.equals(product._id));
  if (item) item.qty += qty;
  else cart.items.push({ product: product._id, qty });

  cart.updatedAt = Date.now();
  await cart.save();
  await cart.populate("items.product");
  const total = cart.items.reduce((s, it) => s + (it.product.price * it.qty), 0);
  res.json({ cart, total });
});

router.delete('/:id', async (req, res) => {
    try {
        const { id: productId } = req.params; // Item ID is the Product ID
        
        // 1. Validation check
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID format." });
        }

        // 2. Fetch the current cart (with products populated)
        const cart = await getCart();

        // 3. Filter the items array to exclude the matching productId
        const initialItemCount = cart.items.length;
        
        // Mongoose array filtering: ensures we compare the ObjectId correctly
        cart.items = cart.items.filter(item => 
            !item.product._id.equals(productId)
        );

        // Check if anything was actually removed
        if (cart.items.length === initialItemCount) {
             return res.status(404).json({ message: "Item not found in cart." });
        }
        
        // 4. Save the updated cart
        cart.updatedAt = Date.now();
        await cart.save();

        // 5. Recalculate and respond (The cart is already populated from getCart/save)
        const total = cart.items.reduce((s, it) => s + (it.product.price * it.qty), 0);

        res.status(200).json({ 
            cart, 
            total,
            message: `Item with ID ${productId} has been removed from the cart.` 
        });

    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Server Error during item removal." });
    }
});

router.post('/checkout', async (req, res) => {
    try {
        const { name, email } = req.body; // Expecting user details from the frontend form

        // 1. Basic Input Validation (A necessary formality)
        if (!name || !email) {
            return res.status(400).json({ message: "Checkout requires a valid name and email address." });
        }
        
        // 2. Fetch the final cart and ensure it's not empty
        const cart = await getCart();
        if (cart.items.length === 0) {
            return res.status(400).json({ message: "Cannot checkout an empty cart, my friend!" });
        }

        // 3. Calculate Final Total (A final audit)
        const total = cart.items.reduce((s, it) => s + (it.product.price * it.qty), 0);

        // 4. Create Mock Receipt (The fulfillment of the requirement)
        const mockReceipt = {
            transactionId: new mongoose.Types.ObjectId(), // A unique ID for the receipt
            customerName: name,
            customerEmail: email,
            itemsPurchased: cart.items.map(item => ({
                id: item.product._id,
                name: item.product.name,
                price: item.product.price,
                qty: item.qty
            })),
            finalTotal: parseFloat(total.toFixed(2)), // Format for proper currency display
            timestamp: new Date().toISOString(),
            status: "Purchase Completed (Mock)"
        };

        // 5. Clear the Cart (The definitive sign of a completed transaction)
        cart.items = [];
        cart.updatedAt = Date.now();
        await cart.save();
        
        // Console log the receipt (for the sake of the assignment, this simulates an order record)
        console.log("------------------ MOCK RECEIPT ------------------");
        console.log(mockReceipt);
        console.log("--------------------------------------------------");

        // 6. Respond with the mock receipt
        res.status(200).json(mockReceipt);

    } catch (error) {
        console.error("Error during mock checkout:", error);
        res.status(500).json({ message: "Server Error during checkout process." });
    }
});

export default router;