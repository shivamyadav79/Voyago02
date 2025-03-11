
// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
