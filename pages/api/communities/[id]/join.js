import Community from '../../../../models/Community';
import User from '../../../../models/User';
import connectToDatabase from '../../../../lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectToDatabase();

  const { id } = req.query;

  // Get user from token
  let token = req.cookies.ch_token;
  
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '');
  }
  
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId || decoded.uid;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (req.method === 'POST') {
    try {
      const community = await Community.findById(id);
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      // Check if community is private
      if (community.isPrivate) {
        return res.status(400).json({ message: 'This is a private community. Please request to join instead.' });
      }

      // Check if user is already a member
      if (community.members.includes(userId)) {
        return res.status(400).json({ message: 'You are already a member of this community' });
      }

      // Add user to community
      await Community.findByIdAndUpdate(id, {
        $push: { members: userId },
        $inc: { memberCount: 1 }
      });

      // Add community to user's communities list
      await User.findByIdAndUpdate(userId, {
        $push: { communities: id }
      });

      return res.status(200).json({ 
        message: 'Successfully joined the community!',
        success: true 
      });
    } catch (error) {
      console.error('Join community error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
