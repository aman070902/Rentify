import express from 'express';
import testRoutes from './routes/testRoutes'; // Ensure this exists
import authRoutes from './routes/authRoutes'; // Import authRoutes

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/test', testRoutes); // Register test routes
app.use('/auth', authRoutes); // Register auth routes under "/auth"

// Default route for testing server
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

