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

  let currentUserId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    currentUserId = decoded.uid;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { id: userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Get target user's followers list
    const targetUser = await User.findById(userId).select('followers');
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!targetUser.followers || targetUser.followers.length === 0) {
      return res.status(200).json({ users: [] });
    }

    // Get details of followers
    const followers = await User.find({
      _id: { $in: targetUser.followers },
      isActive: true
    })
    .select('fullName bio avatar followers following')
    .lean();

    return res.status(200).json({ users: followers });
  } catch (error) {
    console.error('Error fetching followers:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
