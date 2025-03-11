
// routes/adminAudit.js
import express from 'express';
import { getAuditLogs } from '../controllers/adminController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAuditLogs);

export default router;
