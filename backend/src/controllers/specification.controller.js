import { Specification } from '../models/specification.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listSpecifications = asyncHandler(async (req, res) => {
  const items = await Specification.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createSpecification = asyncHandler(async (req, res) => {
  const item = await Specification.create(req.body);
  res.status(201).json(item);
});

export const updateSpecification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Specification.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteSpecification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Specification.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
