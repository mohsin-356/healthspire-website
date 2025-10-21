import 'dotenv/config';
import app from './app.js';
import { connectMongo } from './lib/db.js';

// Ensure DB connection is established on cold start (Vercel) and reused
await connectMongo();

// Export Express app for Vercel (@vercel/node will handle requests)
export default app;
