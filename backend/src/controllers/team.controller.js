import { TeamMember } from '../models/teamMember.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listTeam = asyncHandler(async (req, res) => {
  const items = await TeamMember.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createTeamMember = asyncHandler(async (req, res) => {
  const item = await TeamMember.create(req.body);
  res.status(201).json(item);
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await TeamMember.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await TeamMember.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
