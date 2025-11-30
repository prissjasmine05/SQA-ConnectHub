import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import Community from '../../../models/Community';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    // Extract token from cookie or Authorization header
    let token = req.cookies.ch_token;
    
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({ message: 'Authentication token required' });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userId = decoded.userId || decoded.uid;
    
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    const { communityId } = req.body;

    if (!communityId) {
      return res.status(400).json({ message: 'Community ID is required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the community
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if user is a member of the community
    if (!community.members.includes(userId)) {
      return res.status(400).json({ message: 'You are not a member of this community' });
    }

    // Check if user is the creator (creators cannot leave their own community)
    if (community.createdBy.toString() === userId) {
      return res.status(400).json({ 
        message: 'Community creators cannot leave their own community. Please transfer ownership or delete the community instead.' 
      });
    }

    // Remove user from community members
    community.members = community.members.filter(
      memberId => memberId.toString() !== userId
    );

    // Remove community from user's communities array
    user.communities = user.communities.filter(
      userCommunityId => userCommunityId.toString() !== communityId
    );

    // Save both user and community
    await Promise.all([
      user.save(),
      community.save()
    ]);

    res.status(200).json({ 
      message: 'Successfully left the community',
      community: {
        _id: community._id,
        name: community.name,
        membersCount: community.members.length
      }
    });

  } catch (error) {
    console.error('Error leaving community:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
