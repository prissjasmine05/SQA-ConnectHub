// pages/api/auth/register.js
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { fullname, email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

  try {
    await connectDB();

    const exist = await User.findOne({ email });
    if (exist) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname: fullname || '', email, password: hash });

    // buat token & set cookie (httpOnly)
    const token = jwt.sign({ uid: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const cookie = serialize('ch_token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(201).json({ ok: true, user: { id: user._id, email: user.email, fullname: user.fullname } });
  } catch (err) {
    console.error('REGISTER_ERR', err);
    return res.status(500).json({ message: 'Internal error' });
  }
}
