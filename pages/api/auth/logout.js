import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const cookie = serialize('ch_token', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 0,
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ ok: true });
}
