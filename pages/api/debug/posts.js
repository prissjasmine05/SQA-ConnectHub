import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Get Post model from mongoose
    const Post = mongoose.models.Post || (await import('@/models/Post')).default;
    
    // Get all posts to debug
    const posts = await Post.find({})
      .populate('author', 'fullName fullname email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const totalPosts = await Post.countDocuments({});
    const activePosts = await Post.countDocuments({ isActive: true });

    const debugInfo = posts.map(post => ({
      id: post._id,
      content: post.content.substring(0, 50) + '...',
      author: post.author,
      isActive: post.isActive,
      createdAt: post.createdAt,
      media: post.media.length,
      likes: post.likes.length,
      comments: post.comments.length
    }));

    return res.status(200).json({
      ok: true,
      totalPosts,
      activePosts,
      posts: debugInfo
    });

  } catch (error) {
    console.error('DEBUG_POSTS_ERR:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
}
