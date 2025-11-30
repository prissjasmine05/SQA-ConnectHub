import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token for this account
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        accountType: user.accountType 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data and token (don't set as cookie yet)
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      accountType: user.accountType,
      interests: user.interests,
      onboardingCompleted: user.onboardingCompleted,
      token: token // Include token in response
    };

    res.status(200).json({ 
      message: 'Account verified successfully',
      user: userResponse 
    });
  } catch (error) {
    console.error('Verify account error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
