import { Router } from 'express';
import { listBlogs, getBlogById, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);
router.post('/', verifyToken, requireAdmin, createBlog);
router.patch('/:id', verifyToken, requireAdmin, updateBlog);
router.delete('/:id', verifyToken, requireAdmin, deleteBlog);

export default router;
