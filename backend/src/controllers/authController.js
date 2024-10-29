import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new userModel({ username, password: hashedPassword, role });
        await user.save();

        // Generate JWT token 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.log("Registration Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token 
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.log("Login Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
