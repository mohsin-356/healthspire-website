import { Feature } from '../models/feature.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listFeatures = asyncHandler(async (req, res) => {
  const items = await Feature.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createFeature = asyncHandler(async (req, res) => {
  const item = await Feature.create(req.body);
  res.status(201).json(item);
});

export const updateFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Feature.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Feature.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
