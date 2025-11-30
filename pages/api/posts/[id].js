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
    case 'GET':
      try {
        const post = await Post.findById(id)
          .populate('author', 'fullName avatar username')
          .populate('community', 'name avatar')
          .populate('comments.author', 'fullName avatar username');

        if (!post || !post.isActive) {
          return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json({ post });
      } catch (error) {
        console.error('GET post error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'PUT':
      try {
        const { content, media } = req.body;
        const post = await Post.findById(id);

        if (!post || !post.isActive) {
          return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId) {
          return res.status(403).json({ message: 'Not authorized' });
        }

        if (content !== undefined) post.content = content.trim();
        if (media !== undefined) post.media = media;

        await post.save();
        await post.populate('author', 'fullName avatar username');

        return res.status(200).json({ message: 'Post updated successfully', post });
      } catch (error) {
        console.error('PUT post error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'DELETE':
      try {
        const post = await Post.findById(id);

        if (!post || !post.isActive) {
          return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId) {
          return res.status(403).json({ message: 'Not authorized' });
        }

        post.isActive = false;
        await post.save();

        return res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        console.error('DELETE post error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
