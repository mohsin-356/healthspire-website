import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/about.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getAbout);
router.patch('/', verifyToken, requireAdmin, updateAbout);

export default router;
