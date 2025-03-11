
// routes/place.js
import express from 'express';
import { getAllPlaces, getPlaceById, searchPlaceByName } from '../controllers/placeController.js';

const router = express.Router();

router.get('/', getAllPlaces);
router.get('/:id', getPlaceById);
router.get('/search', searchPlaceByName);

export default router;
