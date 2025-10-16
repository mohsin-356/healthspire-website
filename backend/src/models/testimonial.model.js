import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: '' },
    organization: { type: String, default: '' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
