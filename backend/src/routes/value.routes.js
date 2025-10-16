import { Router } from 'express';
import { listValues, createValue, updateValue, deleteValue } from '../controllers/value.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listValues);
router.post('/', verifyToken, requireAdmin, createValue);
router.patch('/:id', verifyToken, requireAdmin, updateValue);
router.delete('/:id', verifyToken, requireAdmin, deleteValue);

export default router;
