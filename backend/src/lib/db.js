import mongoose from 'mongoose';

export async function connectMongo() {
  // Return existing connection if already connected
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

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
  
  // Optimized connection options for serverless
  const connectionOptions = {
    autoIndex,
    dbName,
    serverSelectionTimeoutMS: 5000, // Reduced for faster serverless startup
    socketTimeoutMS: 45000,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // Disable mongoose buffering
  };

  await mongoose.connect(uri, connectionOptions);
  console.log(`MongoDB connected (db: ${mongoose.connection.name})`);
}
