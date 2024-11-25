import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

