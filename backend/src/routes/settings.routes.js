import { Router } from 'express';
import { resetAll } from '../controllers/settings.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/reset', verifyToken, requireAdmin, resetAll);

export default router;
