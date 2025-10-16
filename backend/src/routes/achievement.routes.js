import { Router } from 'express';
import { listAchievements, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievement.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listAchievements);
router.post('/', verifyToken, requireAdmin, createAchievement);
router.patch('/:id', verifyToken, requireAdmin, updateAchievement);
router.delete('/:id', verifyToken, requireAdmin, deleteAchievement);

export default router;
