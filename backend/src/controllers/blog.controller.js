import { Blog } from '../models/blog.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listBlogs = asyncHandler(async (req, res) => {
  const items = await Blog.find().sort({ createdAt: -1 });
  res.json(items);
});

export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Blog.findById(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const item = await Blog.findOne({ slug });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const createBlog = asyncHandler(async (req, res) => {
  const payload = req.body;
  if (payload && typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map(s => s.trim()).filter(Boolean);
  }
  const item = await Blog.create(payload);
  res.status(201).json(item);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  if (payload && typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map(s => s.trim()).filter(Boolean);
  }
  const item = await Blog.findByIdAndUpdate(id, payload, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Blog.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
