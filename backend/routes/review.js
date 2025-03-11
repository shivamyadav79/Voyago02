
// routes/review.js
import express from 'express';
import { getAllReviews, getReviewById, getReviewsByPlace, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.get('/place/:placeId', getReviewsByPlace);

// Protected
router.post('/', authenticateToken, createReview);
router.put('/:id', authenticateToken, updateReview);
router.delete('/:id', authenticateToken, deleteReview);

export default router;
