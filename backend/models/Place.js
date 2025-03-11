
// models/Place.js
import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  type: { type: String },
  description: { type: String },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);
