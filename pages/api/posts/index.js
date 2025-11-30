import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectDB();
  
  // Get models from mongoose - this ensures they're properly registered
  const Post = mongoose.models.Post || (await import('@/models/Post')).default;
  const User = mongoose.models.User || (await import('@/models/User')).default;
  const Community = mongoose.models.Community || (await import('@/models/Community')).default;

  const { method } = req;

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

  switch (method) {
    case 'GET':
      try {
        const { page = 1, limit = 10, community, author } = req.query;
        const skip = (page - 1) * limit;

        let filter = { isActive: true };
        if (community) filter.community = community;
        if (author) filter.author = author;

        console.log('Fetching posts with filter:', filter);

        const posts = await Post.find(filter)
          .populate('author', 'fullName fullname avatar username email') // Include both field names
          .populate('community', 'name avatar')
          .populate('comments.author', 'fullName fullname avatar username')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit));

        const total = await Post.countDocuments(filter);

        console.log(`Found ${posts.length} posts out of ${total} total`);
        console.log('First post:', posts[0] ? {
          id: posts[0]._id,
          content: posts[0].content,
          author: posts[0].author,
          createdAt: posts[0].createdAt
        } : 'No posts');

        return res.status(200).json({
          posts,
          pagination: {
            current: parseInt(page),
            total: Math.ceil(total / limit),
            hasNext: skip + posts.length < total
          }
        });
      } catch (error) {
        console.error('GET posts error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'POST':
      try {
        const { content, media = [], community = null } = req.body;

        if (!content || content.trim().length === 0) {
          return res.status(400).json({ message: 'Content is required' });
        }

        const post = new Post({
          author: userId,
          content: content.trim(),
          media,
          community
        });

        await post.save();
        await post.populate('author', 'fullName fullname avatar username email');

        return res.status(201).json({ message: 'Post created successfully', post });
      } catch (error) {
        console.error('POST create error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
