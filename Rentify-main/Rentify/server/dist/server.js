"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));

// Load environment variables
dotenv_1.default.config();

// Debug to check MONGO_URI
console.log('MONGO_URI in server.js:', process.env.MONGO_URI);

const PORT = process.env.PORT || 3001;

app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});