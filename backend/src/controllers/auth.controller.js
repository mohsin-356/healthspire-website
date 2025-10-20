import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function sign(user) {
  const payload = { id: user._id.toString(), email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  return token;
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  let user = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = sign(user);
  res.json({ token, user: { id: user._id, email: user.email, role: user.role, avatar: user.avatar || '' } });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('_id email role avatar');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user._id, email: user.email, role: user.role, avatar: user.avatar || '' });
});

export const updateMe = asyncHandler(async (req, res) => {
  const { avatar } = req.body || {};
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (typeof avatar === 'string') user.avatar = avatar;
  await user.save();
  res.json({ id: user._id, email: user.email, role: user.role, avatar: user.avatar || '' });
});
