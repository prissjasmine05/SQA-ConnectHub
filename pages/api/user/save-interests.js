import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'PUT' && req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectDB();

    const token = req.cookies.ch_token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { interests } = req.body;
    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ message: 'Interests must be an array' });
    }

    const user = await User.findByIdAndUpdate(
      decoded.uid,
      { interests },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ message: 'Interests updated', user });

  } catch (error) {
    console.error('Update interests error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
