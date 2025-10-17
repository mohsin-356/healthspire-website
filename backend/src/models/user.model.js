import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'demo'], default: 'admin' },
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
