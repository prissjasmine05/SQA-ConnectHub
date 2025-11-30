import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  const { method, query: { id } } = req;

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
    case 'POST':
      try {
        const { content } = req.body;

        if (!content || content.trim().length === 0) {
          return res.status(400).json({ message: 'Comment content is required' });
        }

        const post = await Post.findById(id);

        if (!post || !post.isActive) {
          return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
          author: userId,
          content: content.trim(),
          createdAt: new Date()
        };

        post.comments.push(comment);
        await post.save();

        await post.populate('comments.author', 'fullName avatar username');

        const newComment = post.comments[post.comments.length - 1];

        return res.status(201).json({ 
          message: 'Comment added successfully', 
          comment: newComment 
        });
      } catch (error) {
        console.error('POST comment error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
