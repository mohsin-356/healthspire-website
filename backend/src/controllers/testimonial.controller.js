import { Testimonial } from '../models/testimonial.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listTestimonials = asyncHandler(async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Testimonial.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
