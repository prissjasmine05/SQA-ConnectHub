// /lib/auth.js
import jwt from 'jsonwebtoken';

export function getTokenFromReq(req) {
  // 🔧 baca ch_token dulu, fallback ke token
  const cookieToken = req.cookies?.ch_token || req.cookies?.token;
  const authHeader = req.headers?.authorization || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const token = cookieToken || bearer;
  if (!token) throw new Error('NO_TOKEN');
  return token;
}

export function verifyTokenFromCookie(req) {
  const token = getTokenFromReq(req);
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing JWT_SECRET env');

  const payload = jwt.verify(token, secret);
  // 🔧 normalisasi: pastikan selalu ada .sub
  return { ...payload, sub: payload.sub || payload.uid };
}

// (opsional) biarkan apa adanya jika tidak dipakai
export function setLoginCookie(res, token) {
  res.setHeader(
    'Set-Cookie',
    `ch_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`
  );
}
