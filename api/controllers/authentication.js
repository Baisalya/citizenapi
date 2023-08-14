import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import User from '../models/user.cjs';
import { User } from '../models/user.js';
//const User = require('../models/user');

// Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username  or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email cannot be empty' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password cannot be empty' });
    }

    console.log('Received login request:', email);
    // Check if the email exists
    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) {
      return res.status(404).json({ message: 'Email is not registered' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Use 'email' instead of 'username' in payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set the access token as an HTTP-only cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      // secure: true, // Enable this if you're using HTTPS
      // sameSite: 'strict', // Adjust this based on your requirements
      // maxAge: 3600000, // Adjust the max age of the cookie if needed
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    // Handle errors in a consistent manner
    console.error('Error during login:', err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

