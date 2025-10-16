import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    number: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Achievement = mongoose.model('Achievement', AchievementSchema);
