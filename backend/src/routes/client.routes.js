import { Router } from 'express';
import { listClients, createClient, updateClient, deleteClient } from '../controllers/client.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listClients);
router.post('/', verifyToken, requireAdmin, createClient);
router.patch('/:id', verifyToken, requireAdmin, updateClient);
router.delete('/:id', verifyToken, requireAdmin, deleteClient);

export default router;
