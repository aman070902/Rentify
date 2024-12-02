"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const chatroomRoutes_1 = __importDefault(require("./routes/chatroomRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes")); // Import the search route
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
(0, db_1.connectDB)();
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/auth', authRoutes_1.default);
app.use('/api/items', itemRoutes_1.default);
app.use("/api/chatrooms", chatroomRoutes_1.default);
app.use('/api', searchRoutes_1.default); // Register the search route
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
