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
    // Get current user to know who they're already following
    const currentUser = await User.findById(userId).select('following');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find users that the current user is not following and exclude themselves
    const suggestedUsers = await User.find({
      _id: { 
        $nin: [...currentUser.following, userId] // Exclude following users and self
      },
      isActive: true
    })
    .select('fullName bio avatar followers following')
    .limit(5) // Limit to 5 suggestions
    .lean();

    // Add isFollowing field to each user
    const usersWithFollowStatus = suggestedUsers.map(user => ({
      ...user,
      isFollowing: currentUser.following.includes(user._id)
    }));

    return res.status(200).json({ users: usersWithFollowStatus });
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
