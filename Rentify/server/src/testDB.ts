import { connectDB } from './config/db';

const testConnection = async () => {
  try {
    await connectDB();
    console.log('Test connection successful!');
  } catch (error: any) {
    console.error(`Test connection failed:`, error);
  }
};

testConnection();

