import express from 'express';
import { connectDB } from './config/db'; // Import the database connection
import testRoutes from './routes/testRoutes'; // Ensure this exists
import authRoutes from './routes/authRoutes'; // Import authRoutes
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Add this line to verify MONGO_URI is being read

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB()
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => console.error("MongoDB connection failed:", error)); // Call the function to connect to the database

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from React frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/test', testRoutes); // Register test routes
app.use('/auth', authRoutes); // Register auth routes under "/auth"

// Default route for testing server
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Export the app
export default app;

