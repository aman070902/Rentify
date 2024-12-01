import express from 'express';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';
import searchRoutes from './routes/searchRoutes'; // Import the search route
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));


connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api', searchRoutes); // Register the search route

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

