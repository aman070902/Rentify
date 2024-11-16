import express from 'express';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';

const app = express();
const PORT = 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.message);
  res.status(500).send('Server Error');
});

export default app;
