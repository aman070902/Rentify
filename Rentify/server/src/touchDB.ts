import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    process.exit(0); // Exit after testing
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

connectDB();
