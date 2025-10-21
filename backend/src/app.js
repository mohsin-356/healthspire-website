import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import specificationRoutes from './routes/specification.routes.js';
import featureRoutes from './routes/feature.routes.js';
import aboutRoutes from './routes/about.routes.js';
import achievementRoutes from './routes/achievement.routes.js';
import valueRoutes from './routes/value.routes.js';
import teamRoutes from './routes/team.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import clientRoutes from './routes/client.routes.js';
import blogRoutes from './routes/blog.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();

const defaultAllowed = [
  'https://healthspire.org',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];
const envAllowed = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const explicitAllowed = new Set([...defaultAllowed, ...envAllowed]);

// Enhanced CORS for Vercel deployment
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);
    
    try {
      if (explicitAllowed.has(origin)) return callback(null, true);
      
      const u = new URL(origin);
      
      // Allow localhost and 127.0.0.1 for development
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') {
        return callback(null, true);
      }
      
      // Allow Vercel preview deployments
      if (u.hostname.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      
      // Allow Netlify deployments
      if (u.hostname.endsWith('.netlify.app')) {
        return callback(null, true);
      }
      
    } catch (error) {
      console.error('CORS origin parsing error:', error);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Avoid conditional GET/304 interfering with fetch() by disabling etag and forcing no-store
app.set('etag', false);
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// Ensure uploads dir exists and serve static files
const uploadsDir = path.resolve(process.cwd(), 'uploads');
try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch {}
app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/specifications', specificationRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/values', valueRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/uploads', uploadRoutes);

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

export default app;
