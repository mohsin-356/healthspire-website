import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function buildFileUrl(req, filename) {
  const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${base}/uploads/${encodeURIComponent(filename)}`;
}

export function respondWithFile(req, res) {
  const { filename } = req.file || {};
  if (!filename) return res.status(400).json({ error: 'No file uploaded' });
  const url = buildFileUrl(req, filename);
  res.status(201).json({ url, filename });
}
