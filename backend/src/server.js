import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { connectMongo } from './lib/db.js';

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectMongo();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Healthspire API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
}

start();
