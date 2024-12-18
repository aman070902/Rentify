"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create a new user
        const newUser = new User_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        return res.status(201).json({ message: 'User registered successfully!' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login request received with body:", req.body); // Log request body
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        console.log("User found:", user); // Log if user is found
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        console.log("Password validation result:", isPasswordValid); // Log password validation result
        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', // Replace 'default_secret' with a real secret in production
        { expiresIn: '1h' });
        console.log("Token generated:", token); // Log token generation
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error during login:", error); // Log any server error
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.loginUser = loginUser;
