// routes/adminUser.js
import express from 'express';
import { getAllUsers, deleteUser, banUser } from '../controllers/adminController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.delete('/:id', authenticateToken, deleteUser);
router.post('/ban/:id', authenticateToken, banUser);

export default router;
