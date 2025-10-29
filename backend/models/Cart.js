import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1, min: 1 }
});

const CartSchema = new mongoose.Schema({
  items: [CartItemSchema],
  // --- ADDED FOR PERSISTENCE BONUS ---
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true // Ensures only one cart per user
  },
  // ------------------------------------
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Cart', CartSchema);