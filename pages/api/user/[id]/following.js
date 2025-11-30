import User from '@/models/User';
import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

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

    // Ambil data user beserta following list
    const user = await User.findById(id)
      .populate('following', 'fullName username avatar bio followers')
      .select('following');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      users: user.following || []
    });
  } catch (error) {
    console.error('Error fetching user following:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
