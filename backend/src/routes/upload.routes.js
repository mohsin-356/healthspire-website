import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { respondWithFile } from '../controllers/upload.controller.js';

const uploadsDir = path.resolve(process.cwd(), 'uploads');
try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch {}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}_${name}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if ((file.mimetype || '').startsWith('image/')) return cb(null, true);
  cb(new Error('Only image uploads are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const router = Router();
router.post('/', verifyToken, requireAdmin, upload.single('file'), respondWithFile);

export default router;
