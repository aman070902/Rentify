"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes")); // Ensure this exists
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Import authRoutes
const app = (0, express_1.default)();
const PORT = 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/test', testRoutes_1.default); // Register test routes
app.use('/auth', authRoutes_1.default); // Register auth routes under "/auth"
// Default route for testing server
app.get('/', (req, res) => {
    res.send('Server is running!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
