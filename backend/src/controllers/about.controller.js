import { About } from '../models/about.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { defaultAbout } from '../lib/defaults.js';

export const getAbout = asyncHandler(async (req, res) => {
  let doc = await About.findOne();
  if (!doc) doc = await About.create(defaultAbout);
  res.json(doc);
});

export const updateAbout = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  let doc = await About.findOne();
  if (!doc) doc = await About.create({ ...defaultAbout, ...payload });
  else {
    Object.assign(doc, payload);
    await doc.save();
  }
  res.json(doc);
});
