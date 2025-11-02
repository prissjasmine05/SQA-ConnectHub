import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await connectDB();

    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    // AMBIL password-nya secara eksplisit
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { uid: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const cookie = serialize('ch_token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({
      ok: true,
      user: { id: user._id, email: user.email, fullname: user.fullname }
    });

  } catch (e) {
    console.error('LOGIN_ERR', e);
    return res.status(500).json({ message: 'Internal error' });
  }
}
