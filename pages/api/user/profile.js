import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

  await connectDB();

  // Get user from token
  const token = req.cookies.ch_token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.uid;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const { 
      fullName, 
      username, 
      bio, 
      phoneNumber, 
      avatar,
      currentPassword,
      newPassword 
    } = req.body;

    const user = await User.findById(userId).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update basic fields
    if (fullName !== undefined) user.fullName = fullName.trim();
    if (username !== undefined) {
      // Check if username is already taken
      if (username !== user.username) {
        const existingUser = await User.findOne({ username: username.trim() });
        if (existingUser) {
          return res.status(400).json({ message: 'Username already taken' });
        }
        user.username = username.trim();
      }
    }
    if (bio !== undefined) user.bio = bio.trim();
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (avatar !== undefined) user.avatar = avatar;

    // Handle password change
    if (newPassword && currentPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters' });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(userId).select('-password');

    return res.status(200).json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}
