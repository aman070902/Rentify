import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    console.log("Login request received with body:", req.body); // Log request body
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("User found:", user); // Log if user is found

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password validation result:", isPasswordValid); // Log password validation result

        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'default_secret', // Replace 'default_secret' with a real secret in production
            { expiresIn: '1h' }
        );

        console.log("Token generated:", token); // Log token generation
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error during login:", error); // Log any server error
        return res.status(500).json({ message: 'Server error' });
    }
};

