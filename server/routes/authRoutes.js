const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

// Route for user registration
router.post('/register', async (req, res) => {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Return success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route for user login
  router.post('/login', async (req, res) => {
    try {
      // Extract email and password from request body
      const { email, password } = req.body;
  
      // Check if user with the provided email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  
      // Return token to the client
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;
