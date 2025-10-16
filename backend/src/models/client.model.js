import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Client = mongoose.model('Client', ClientSchema);
