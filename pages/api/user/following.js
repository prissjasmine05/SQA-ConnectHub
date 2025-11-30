import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();
  
  const User = mongoose.models.User || (await import('@/models/User')).default;

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
    // Get current user's following list
    const currentUser = await User.findById(userId).select('following');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!currentUser.following || currentUser.following.length === 0) {
      return res.status(200).json({ users: [] });
    }

    // Get details of users being followed
    const followingUsers = await User.find({
      _id: { $in: currentUser.following },
      isActive: true
    })
    .select('fullName bio avatar followers following')
    .lean();

    return res.status(200).json({ users: followingUsers });
  } catch (error) {
    console.error('Error fetching following users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
