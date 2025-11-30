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

    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all communities where user is a member (including ones they created)
    const allCommunities = await Community.find({
      members: userId
    }).populate('owner', 'fullName username');

    // Separate created communities and joined communities
    const createdCommunities = [];
    const joinedCommunities = [];

    allCommunities.forEach(community => {
      const communityData = {
        _id: community._id,
        name: community.name,
        description: community.description,
        members: community.members,
        owner: community.owner,
        createdAt: community.createdAt,
        isPrivate: community.isPrivate,
        // Add some default styling for the UI
        icon: getRandomIcon(),
        color: getRandomColor()
      };

      // Check if this community was created by the current user
      const createdByUserId = community.owner?._id?.toString() || community.owner?.toString();
      
      if (createdByUserId === userId) {
        createdCommunities.push(communityData);
      } else {
        joinedCommunities.push(communityData);
      }
    });

    // Format all communities data for the UI
    const formattedCommunities = [...createdCommunities, ...joinedCommunities];

    res.status(200).json({
      communities: formattedCommunities,
      createdCommunities: createdCommunities,
      joinedCommunities: joinedCommunities,
      totalCommunities: formattedCommunities.length,
      totalCreated: createdCommunities.length,
      totalJoined: joinedCommunities.length
    });

  } catch (error) {
    console.error('Error fetching user communities:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Helper functions for UI styling
function getRandomIcon() {
  const icons = ['👥', '💻', '📚', '🎨', '🏃', '🍳', '📷', '🎵', '🌱', '⚽'];
  return icons[Math.floor(Math.random() * icons.length)];
}

function getRandomColor() {
  const colors = ['#8B9D83', '#5A8B8B', '#E8DCC4', '#D4D4D4', '#D9C4A8', '#A8B5D1', '#F4B942', '#E67E22'];
  return colors[Math.floor(Math.random() * colors.length)];
}
