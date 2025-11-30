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
      const { message } = req.body;

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ message: 'Message is required' });
      }

      const community = await Community.findById(id);
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      // Check if user is already a member
      if (community.members.includes(userId)) {
        return res.status(400).json({ message: 'You are already a member of this community' });
      }

      // Check if user already sent a request
      const existingRequest = community.joinRequests?.find(
        req => req.user.toString() === userId
      );

      if (existingRequest) {
        return res.status(400).json({ message: 'You have already sent a join request' });
      }

      // Add join request
      const joinRequest = {
        user: userId,
        message: message.trim(),
        status: 'pending',
        createdAt: new Date()
      };

      await Community.findByIdAndUpdate(id, {
        $push: { joinRequests: joinRequest }
      });

      // TODO: Send notification to community admins

      return res.status(200).json({ 
        message: 'Join request sent successfully!',
        success: true 
      });
    } catch (error) {
      console.error('Request join error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
