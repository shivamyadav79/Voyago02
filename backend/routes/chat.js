
// routes/chat.js
import express from 'express';
import { getChatHistory, sendChatMessage } from '../controllers/messageController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/city/:cityId', authenticateToken, getChatHistory);
router.post('/city/:cityId/send', authenticateToken, sendChatMessage);

export default router;
