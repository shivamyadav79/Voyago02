
// routes/place.js
import express from 'express';
import { getAllPlaces, getPlaceById, searchPlaceByName, getPlacesByCity} from '../controllers/placeController.js';

const router = express.Router();

router.get('/', getAllPlaces);
router.get('/:id', getPlaceById);
router.get('/search', searchPlaceByName);
router.get("/city/:cityId", getPlacesByCity); // ✅ Ensure this is correct
export default router;
