// pages/api/auth/me.js
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  try {
    const token = req.cookies?.ch_token;
    if (!token) return res.status(200).json({ authenticated: false });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(payload.uid).select('_id email fullname interests');

    if (!user) return res.status(200).json({ authenticated: false });
    return res.status(200).json({ authenticated: true, user });
  } catch {
    return res.status(200).json({ authenticated: false });
  }
}
