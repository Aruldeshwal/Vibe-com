// backend/models/Product.js (No changes needed, but ensure fields are flexible)

import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  // The ID is still the MongoDB ID, but we might store the external ID too
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  img: String, // Corresponds to the 'image' field in Fake Store API
  desc: String, // Corresponds to 'description'
  externalId: { type: Number, unique: true }, // New field to store the Fake Store ID
});

export default mongoose.model('Product', ProductSchema);