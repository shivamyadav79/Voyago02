
// routes/adminPlace.js
import express from 'express';
import { createPlace, updatePlace, deletePlace, getAllPlaces } from '../controllers/placeController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createPlace);
router.put('/:id', authenticateToken, updatePlace);
router.delete('/:id', authenticateToken, deletePlace);
router.get('/', authenticateToken, getAllPlaces);
export default router;
