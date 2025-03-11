// routes/search.js
import express from "express";
import { searchCitiesAndPlaces } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchCitiesAndPlaces);

export default router;
