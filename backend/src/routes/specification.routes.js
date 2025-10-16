import { Router } from 'express';
import { listSpecifications, createSpecification, updateSpecification, deleteSpecification } from '../controllers/specification.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listSpecifications);
router.post('/', verifyToken, requireAdmin, createSpecification);
router.patch('/:id', verifyToken, requireAdmin, updateSpecification);
router.delete('/:id', verifyToken, requireAdmin, deleteSpecification);

export default router;
