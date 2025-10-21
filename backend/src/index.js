import 'dotenv/config';
import http from 'http';
import serverless from 'serverless-http';
import app from './app.js';
import { connectMongo } from './lib/db.js';

const PORT = process.env.PORT || 4000;

// For local development
async function start() {
  await connectMongo();
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Healthspire API listening on http://localhost:${PORT}`);
  });
}

// For Vercel serverless deployment
let isConnected = false;
async function connectToDatabase() {
  if (isConnected) return;
  await connectMongo();
  isConnected = true;
}

// Serverless handler for Vercel
const handler = serverless(app, {
  request: async (request, event, context) => {
    await connectToDatabase();
    return request;
  }
});

// Export for Vercel
export { handler };

// For local development
if (process.env.NODE_ENV !== 'production') {
  start().catch((err) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
  });
}
