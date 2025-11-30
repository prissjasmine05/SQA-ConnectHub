import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import Community from '../../../models/Community';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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

    // Debug: Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Debug: Get all communities where user is in members array
    const communitiesWhereUserIsMember = await Community.find({
      members: userId
    }).select('name description members owner');

    // Debug: Get user's communities array
    const userCommunitiesArray = user.communities || [];

    // Debug: Get communities from user's communities array
    const communitiesFromArray = await Community.find({
      _id: { $in: userCommunitiesArray }
    }).select('name description members owner');

    res.status(200).json({
      debug: true,
      userId: userId,
      tokenData: decoded,
      userCommunitiesArray: userCommunitiesArray,
      userCommunitiesArrayLength: userCommunitiesArray.length,
      communitiesWhereUserIsMember: communitiesWhereUserIsMember,
      communitiesWhereUserIsMemberCount: communitiesWhereUserIsMember.length,
      communitiesFromArray: communitiesFromArray,
      communitiesFromArrayCount: communitiesFromArray.length
    });

  } catch (error) {
    console.error('Debug communities error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
