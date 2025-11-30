import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle both uid and userId properties for compatibility
    const userId = decoded.userId || decoded.uid;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Get user from database
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        id: user._id,
        fullName: user.fullName,
        fullname: user.fullName, // for backward compatibility
        email: user.email,
        username: user.username,
        bio: user.bio,
        interests: user.interests,
        following: user.following,
        followers: user.followers,
        joinedYear: user.createdAt ? new Date(user.createdAt).getFullYear() : 2021,
        createdAt: user.createdAt,
        avatar: user.avatar || '/api/placeholder/120/120',
      }
    });

  } catch (error) {
    console.error('VERIFY_API_ERROR:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
}
