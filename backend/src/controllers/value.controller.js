import { Value } from '../models/value.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listValues = asyncHandler(async (req, res) => {
  const items = await Value.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createValue = asyncHandler(async (req, res) => {
  const item = await Value.create(req.body);
  res.status(201).json(item);
});

export const updateValue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Value.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteValue = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Value.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
