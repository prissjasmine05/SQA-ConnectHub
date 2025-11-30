import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Switch account - decoded token:', { userId: decoded.userId, email: decoded.email });
    
    // Get user data
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    console.log('Switch account - switching to user:', { id: user._id, email: user.email, fullName: user.fullName });

    // Set token as httpOnly cookie with correct name - force overwrite existing cookie
    res.setHeader('Set-Cookie', [
      `ch_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    ]);

    // Return user data
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      accountType: user.accountType,
      interests: user.interests,
      onboardingCompleted: user.onboardingCompleted
    };

    res.status(200).json({ 
      message: 'Account switched successfully',
      user: userResponse 
    });
  } catch (error) {
    console.error('Switch account error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
