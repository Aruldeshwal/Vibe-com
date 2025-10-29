// backend/seed/seed.js (Finalized for Mock User Creation)

import mongoose from 'mongoose'; // <--- CRUCIAL: Must be imported for mongoose.connect
import dotenv from 'dotenv';
import Product from '../models/Product.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

// --- ESM PATH RESOLUTION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// --- SEED DATA (Only Mock User) ---
const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.error("❌ MONGO_URI is not set. Please check your .env file.");
      return process.exit(1);
    }
    
    await mongoose.connect(MONGO_URI);
    console.log("💎 MongoDB connection established for seeding.");


    // 1. Clear out previous records (Clearing products is still a good practice)
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Existing collections cleared.');

    // 2. Create a single mock user
    const mockUser = await User.create({});
    console.log(`👤 Mock User Created. Use this ID for testing: ${mockUser._id}`);

    // --- REMOVED: Placeholder "Seeded Successfully" for Products ---
    console.log('✨ Database Ready for Fake Store API integration! ✨'); 
    
    mongoose.connection.close();
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDB();