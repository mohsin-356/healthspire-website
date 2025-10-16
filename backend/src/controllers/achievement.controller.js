import { Achievement } from '../models/achievement.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listAchievements = asyncHandler(async (req, res) => {
  const items = await Achievement.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createAchievement = asyncHandler(async (req, res) => {
  const item = await Achievement.create(req.body);
  res.status(201).json(item);
});

export const updateAchievement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Achievement.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteAchievement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Achievement.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
