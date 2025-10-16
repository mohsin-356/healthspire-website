import mongoose from 'mongoose';

const ValueSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Value = mongoose.model('Value', ValueSchema);
