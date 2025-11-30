import Post from '../../../../models/Post';
import Community from '../../../../models/Community';
import connectDB from '../../../../lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const posts = await Post.find({ community: id })
        .populate('author', 'fullName avatar username')
        .populate('community', 'name')
        .populate('comments.author', 'fullName avatar username')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Post.countDocuments({ community: id });

      return res.status(200).json({
        posts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / limit),
          hasNext: skip + posts.length < total
        }
      });
    } catch (error) {
      console.error('GET community posts error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  if (req.method === 'POST') {
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
      const { title, content, image } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      // Check if community exists
      const community = await Community.findById(id);
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      // Check if user is a member of the community
      if (!community.members.includes(userId)) {
        return res.status(403).json({ message: 'You must be a member to post in this community' });
      }

      const post = new Post({
        title: title.trim(),
        content: content.trim(),
        image: image || null,
        author: userId,
        community: id,
        likes: [],
        comments: [],
        likesCount: 0,
        commentsCount: 0
      });

      await post.save();
      await post.populate('author', 'fullName avatar username');
      await post.populate('community', 'name');

      return res.status(201).json({
        message: 'Post created successfully',
        post
      });
    } catch (error) {
      console.error('POST community posts error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
