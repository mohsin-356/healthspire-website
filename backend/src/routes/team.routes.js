import { Router } from 'express';
import { listTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/team.controller.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listTeam);
router.post('/', verifyToken, requireAdmin, createTeamMember);
router.patch('/:id', verifyToken, requireAdmin, updateTeamMember);
router.delete('/:id', verifyToken, requireAdmin, deleteTeamMember);

export default router;
