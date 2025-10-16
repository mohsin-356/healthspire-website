import mongoose from 'mongoose';

const SpecificationSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    stats: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Specification = mongoose.model('Specification', SpecificationSchema);
