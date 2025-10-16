import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    subheading: { type: String, required: true },
    ctaText: { type: String, default: '' },
    ctaUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export const About = mongoose.model('About', AboutSchema);
