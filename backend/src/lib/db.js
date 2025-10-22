import mongoose from 'mongoose';

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is required and must be a MongoDB Atlas SRV URI (mongodb+srv://)');
  }
  if (!uri.startsWith('mongodb+srv://')) {
    throw new Error('MONGODB_URI must be a MongoDB Atlas SRV URI (mongodb+srv://)');
  }
  const dbName = process.env.MONGODB_DB_NAME || 'healthspire';
  const autoIndex = String(process.env.MONGODB_AUTOINDEX || (process.env.NODE_ENV !== 'production')).toLowerCase() === 'true';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    autoIndex,
    dbName,
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`MongoDB connected (db: ${mongoose.connection.name})`);
}
