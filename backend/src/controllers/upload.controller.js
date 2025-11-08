import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hasCloudinary = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function buildFileUrl(req, filename) {
  const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${base}/uploads/${encodeURIComponent(filename)}`;
}

export async function respondWithFile(req, res) {
  const file = req.file || {};
  const filePath = file.path;
  const buffer = file.buffer;
  let filename = file.filename;
  if (!filename && file.originalname) filename = file.originalname;

  if (!buffer && !filePath) return res.status(400).json({ error: 'No file uploaded' });

  try {
    if (hasCloudinary) {
      if (buffer) {
        const streamUpload = () => new Promise((resolve, reject) => {
          const cldStream = cloudinary.uploader.upload_stream(
            { folder: process.env.CLOUDINARY_FOLDER || 'healthspire', resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          Readable.from(buffer).pipe(cldStream);
        });
        const result = await streamUpload();
        return res.status(201).json({ url: result.secure_url || result.url, filename: result.public_id });
      } else if (filePath) {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: process.env.CLOUDINARY_FOLDER || 'healthspire',
          resource_type: 'image',
        });
        try { fs.unlinkSync(filePath); } catch {}
        return res.status(201).json({ url: result.secure_url || result.url, filename: result.public_id });
      }
    }

    if (!filename && filePath) filename = path.basename(filePath);
    if (!filename) return res.status(400).json({ error: 'Invalid upload' });
    const url = buildFileUrl(req, filename);
    return res.status(201).json({ url, filename });
  } catch (e) {
    return res.status(500).json({ error: 'Upload failed' });
  }
}
