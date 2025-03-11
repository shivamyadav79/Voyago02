// routes/email.js
import express from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = express.Router();

// POST /api/email/send
router.post('/send', sendEmail);

export default router;
