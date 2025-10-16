import { Router } from 'express';
import { listFeatures, createFeature, updateFeature, deleteFeature } from '../controllers/feature.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listFeatures);
router.post('/', verifyToken, requireAdmin, createFeature);
router.patch('/:id', verifyToken, requireAdmin, updateFeature);
router.delete('/:id', verifyToken, requireAdmin, deleteFeature);

export default router;
