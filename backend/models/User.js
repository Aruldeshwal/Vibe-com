// backend/models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Only an ID and a timestamp are needed for this mock persistence
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);