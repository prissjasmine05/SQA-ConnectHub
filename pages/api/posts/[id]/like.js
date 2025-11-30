import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectDB();
  
  const Post = mongoose.models.Post || (await import('@/models/Post')).default;

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

  const { id: postId } = req.query;

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isCurrentlyLiked = post.likes.includes(userId);

    if (isCurrentlyLiked) {
      // Unlike
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: userId }
      });
    } else {
      // Like
      await Post.findByIdAndUpdate(postId, {
        $addToSet: { likes: userId }
      });
    }

    return res.status(200).json({ 
      liked: !isCurrentlyLiked,
      message: isCurrentlyLiked ? 'Post unliked' : 'Post liked'
    });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
