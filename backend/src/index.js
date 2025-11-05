import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { connectMongo } from './lib/db.js';

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  await connectMongo();
  const server = http.createServer(app);
  server.listen(PORT, HOST, () => {
    console.log(`Healthspire API listening on http://${HOST}:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
