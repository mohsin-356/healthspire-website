import { Router } from 'express';
import { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonial.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listTestimonials);
router.post('/', verifyToken, requireAdmin, createTestimonial);
router.patch('/:id', verifyToken, requireAdmin, updateTestimonial);
router.delete('/:id', verifyToken, requireAdmin, deleteTestimonial);

export default router;
