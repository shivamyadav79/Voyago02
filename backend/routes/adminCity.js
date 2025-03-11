
// routes/adminCity.js
import express from 'express';
import { createCity, updateCity, deleteCity, getAllCities } from '../controllers/cityController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createCity);
router.put('/:id', authenticateToken, updateCity);
router.delete('/:id', authenticateToken, deleteCity);
router.get('/', authenticateToken, getAllCities);
export default router;
