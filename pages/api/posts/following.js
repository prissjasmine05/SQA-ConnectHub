import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
    const { users, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let followingUserIds = [];
    
    if (users) {
      // Parse user IDs from query parameter
      followingUserIds = users.split(',').filter(id => id.trim());
    } else {
      // Get current user's following list
      const User = mongoose.models.User || (await import('@/models/User')).default;
      const currentUser = await User.findById(userId).select('following');
      
      if (!currentUser || !currentUser.following || currentUser.following.length === 0) {
        return res.status(200).json({ 
          posts: [], 
          message: 'No following users found' 
        });
      }
      
      followingUserIds = currentUser.following;
    }

    // Get posts from followed users
    const posts = await Post.find({ 
      author: { $in: followingUserIds },
      isActive: true 
    })
      .populate('author', 'fullName fullname avatar username email')
      .populate('community', 'name avatar')
      .populate('comments.author', 'fullName fullname avatar username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Post.countDocuments({ 
      author: { $in: followingUserIds },
      isActive: true 
    });

    return res.status(200).json({
      posts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + posts.length < total
      }
    });
  } catch (error) {
    console.error('Get following posts error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
