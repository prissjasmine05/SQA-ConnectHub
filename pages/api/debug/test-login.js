import connectDB from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();
  
  const User = mongoose.models.User || (await import('@/models/User')).default;

  try {
    const { email = 'john@example.com', password = 'password123' } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { uid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', [
      `ch_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`
    ]);

    // Remove password from response
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      interests: user.interests,
      following: user.following,
      followers: user.followers,
      createdAt: user.createdAt
    };

    return res.status(200).json({
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Test login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
