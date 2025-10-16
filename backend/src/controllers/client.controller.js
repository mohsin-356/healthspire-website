import { Client } from '../models/client.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listClients = asyncHandler(async (req, res) => {
  const items = await Client.find().sort({ createdAt: 1 });
  res.json(items);
});

export const createClient = asyncHandler(async (req, res) => {
  const item = await Client.create(req.body);
  res.status(201).json(item);
});

export const updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Client.findByIdAndUpdate(id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Client.findByIdAndDelete(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});
