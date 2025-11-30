import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { fullname, email, password, interests } = req.body || {};

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Don't hash here, let the pre('save') middleware handle it
    const user = await User.create({
      fullName: fullname, // Fix: use correct field name from schema
      email,
      password, // Let pre('save') middleware hash this
      interests: interests || [],
      bio: 'Tech enthusiast, avid reader, and aspiring chef.',
      createdAt: new Date()
    });

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

    return res.status(201).json({
      ok: true,
      user: {
        id: user._id,
        fullname: user.fullName, // Fix: use correct field name
        email: user.email,
        interests: user.interests,
        bio: user.bio
      }
    });

  } catch (error) {
    console.error('SIGNUP_ERR:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
}
