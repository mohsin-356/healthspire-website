import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    benefits: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Feature = mongoose.model('Feature', FeatureSchema);
