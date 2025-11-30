import connectDB from '@/lib/mongodb';
import Community from '@/models/Community';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

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
        const { page = 1, limit = 10, search } = req.query;
        const skip = (page - 1) * limit;

        let filter = { isActive: true };
        if (search) {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
          ];
        }

        const communities = await Community.find(filter)
          .populate('owner', 'fullName avatar username')
          .populate('admins', 'fullName avatar username')
          .select('-members') // Don't return full members list for performance
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit));

        const total = await Community.countDocuments(filter);

        return res.status(200).json({
          communities,
          pagination: {
            current: parseInt(page),
            total: Math.ceil(total / limit),
            hasNext: skip + communities.length < total
          }
        });
      } catch (error) {
        console.error('GET communities error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'POST':
      try {
        const { name, description, isPrivate = false, tags = [] } = req.body;

        if (!name || name.trim().length === 0) {
          return res.status(400).json({ message: 'Community name is required' });
        }

        // Check if community name already exists
        const existingCommunity = await Community.findOne({ 
          name: name.trim(), 
          isActive: true 
        });
        if (existingCommunity) {
          return res.status(400).json({ message: 'Community name already exists' });
        }

        const community = new Community({
          name: name.trim(),
          description: description?.trim() || '',
          owner: userId,
          admins: [userId],
          members: [userId],
          memberCount: 1,
          isPrivate,
          tags
        });

        await community.save();
        await community.populate('owner', 'fullName avatar username');

        // Add community to user's communities list
        await User.findByIdAndUpdate(userId, {
          $push: { communities: community._id }
        });

        return res.status(201).json({ 
          message: 'Community created successfully', 
          community 
        });
      } catch (error) {
        console.error('POST community error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
