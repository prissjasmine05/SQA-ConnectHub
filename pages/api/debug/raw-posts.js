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
    
    // Get raw posts without populate
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(5);
    
    const debugInfo = posts.map(post => ({
      id: post._id,
      content: post.content.substring(0, 50) + '...',
      authorId: post.author, // Raw author ID
      authorType: typeof post.author,
      isActive: post.isActive,
      createdAt: post.createdAt
    }));

    return res.status(200).json({
      ok: true,
      posts: debugInfo
    });

  } catch (error) {
    console.error('RAW_POSTS_ERR:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
}
