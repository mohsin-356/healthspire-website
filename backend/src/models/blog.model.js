import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    author: { type: String, default: '' },
    date: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    tags: { type: [String], default: [] },
    coverImg: { type: String, default: '' },
    contentHtml: { type: String, required: true },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', BlogSchema);
