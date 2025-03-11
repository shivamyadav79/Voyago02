// routes/adminAnalytics.js
import express from "express";
import { getAnalytics } from "../controllers/adminController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getAnalytics);

export default router;
