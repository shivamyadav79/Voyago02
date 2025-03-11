
// routes/city.js
import express from 'express';
import { getAllCities, getCityById, searchCityByName } from '../controllers/cityController.js';

const router = express.Router();

router.get('/search', searchCityByName);
router.get('/get-cities', getAllCities);
router.get('/:id', getCityById);

export default router;
