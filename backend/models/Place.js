
// models/Place.js
import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5, required: true },
  images: [{ type: String, required: true }],
  location: {
    address: { type: String, required: true },
    coordinates: { type: [Number], index: '2dsphere' }, // [longitude, latitude] for maps
  },
  famous: { type: String,  },
}, { timestamps: true });

export default mongoose.model('Place', placeSchema);
