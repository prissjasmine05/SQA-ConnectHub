// /pages/api/user/save-interests.js
import db from '../../../lib/mongodb';
import User from '../../../models/User';
import { verifyTokenFromCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    await db();

    // 🔹 Verifikasi JWT dari cookie
    const payload = verifyTokenFromCookie(req);
    const { interests } = req.body;

    // 🔹 Validasi input
    if (!Array.isArray(interests)) {
      return res
        .status(400)
        .json({ ok: false, message: 'interests must be an array' });
    }

    // 🔹 Update user di database
    const user = await User.findByIdAndUpdate(
      payload.sub, // diset otomatis dari payload.uid di lib/auth.js
      { $set: { interests, onboardingCompleted: true } },
      { new: true }
    ).lean();

    if (!user)
      return res.status(404).json({ ok: false, message: 'User not found' });

    return res.status(200).json({ ok: true, user });
  } catch (err) {
    if (err.message === 'NO_TOKEN')
      return res.status(401).json({ ok: false, message: 'Unauthorized' });
    console.error('[save-interests]', err);
    return res.status(500).json({ ok: false, message: 'Internal error' });
  }
}
