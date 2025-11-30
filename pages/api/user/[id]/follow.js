import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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

  const { id: userId } = req.query; // User to follow/unfollow

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (currentUserId === userId) {
    return res.status(400).json({ message: 'Cannot follow yourself' });
  }

  try {
    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(userId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isCurrentlyFollowing = currentUser.following.includes(userId);

    if (isCurrentlyFollowing) {
      // Unfollow
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { following: userId }
      });
      await User.findByIdAndUpdate(userId, {
        $pull: { followers: currentUserId }
      });
    } else {
      // Follow
      await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: userId }
      });
      await User.findByIdAndUpdate(userId, {
        $addToSet: { followers: currentUserId }
      });
    }

    return res.status(200).json({ 
      isFollowing: !isCurrentlyFollowing,
      message: isCurrentlyFollowing ? 'Unfollowed successfully' : 'Followed successfully'
    });
  } catch (error) {
    console.error('Error following/unfollowing user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
