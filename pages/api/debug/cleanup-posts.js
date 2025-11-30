import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Get models from mongoose
    const Post = mongoose.models.Post || (await import('@/models/Post')).default;
    const User = mongoose.models.User || (await import('@/models/User')).default;
    
    // Get all posts
    const posts = await Post.find({});
    
    // Get all valid user IDs - use correct User model import
    const users = await User.find({}).select('_id');
    const validUserIds = users.map(user => user._id.toString());
    
    // Find posts with invalid authors
    const postsToDelete = posts.filter(post => 
      !post.author || !validUserIds.includes(post.author.toString())
    );
    
    // Delete posts with invalid authors
    const deletePromises = postsToDelete.map(post => 
      Post.deleteOne({ _id: post._id })
    );
    
    await Promise.all(deletePromises);
    
    return res.status(200).json({
      ok: true,
      message: `Deleted ${postsToDelete.length} posts with invalid authors`,
      deletedCount: postsToDelete.length,
      deletedPosts: postsToDelete.map(p => p._id)
    });

  } catch (error) {
    console.error('CLEANUP_ERR:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
}
