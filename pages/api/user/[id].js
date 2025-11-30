import User from '@/models/User';
import connectDB from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(id)
      .select('-password')
      .populate('following', 'fullName username avatar')
      .populate('followers', 'fullName username avatar');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      user: {
        _id: user._id,
        fullName: user.fullName,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        interests: user.interests,
        following: user.following,
        followers: user.followers,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      userId: id
    });
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
