import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB already connected (reusing connection)');
    return;
  }

  try {
    const connString = process.env.MONGODB_URI || 'mongodb+srv://kalemlarevanth_db_user:F5sbES9vLtINgbPE@cluster0.sx9bxkq.mongodb.net/?appName=Cluster0';
    const conn = await mongoose.connect(connString);
    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
    throw error;
  }
};

export default connectDB;
