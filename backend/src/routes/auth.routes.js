import { Router } from 'express';
import { login, me, updateMe } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.get('/me', verifyToken, me);
router.patch('/me', verifyToken, updateMe);

export default router;
