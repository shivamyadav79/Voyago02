
// routes/moderator.js
import express from 'express';
import { reportUser, deleteMessageByModerator } from '../controllers/moderatorController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/report-user', authenticateToken, reportUser);
router.delete('/messages/:messageId', authenticateToken, deleteMessageByModerator);

export default router;
