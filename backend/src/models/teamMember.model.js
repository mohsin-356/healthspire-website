import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    img: { type: String, default: '' },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
