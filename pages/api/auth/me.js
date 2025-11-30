import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const token = req.cookies.ch_token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    // Support both uid and userId for backward compatibility
    const userId = decoded.userId || decoded.uid;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({
      user: {
        _id: user._id,
        id: user._id,
        fullName: user.fullName,
        fullname: user.fullName, // for backward compatibility
        email: user.email,
        username: user.username,
        bio: user.bio,
        interests: user.interests,
        following: user.following,
        followers: user.followers,
        joinedYear: user.createdAt ? new Date(user.createdAt).getFullYear() : 2021,
        createdAt: user.createdAt,
        avatar: user.avatar || '/api/placeholder/120/120',
      }
    });

  } catch (error) {
    console.error('ME_API_ERROR:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
