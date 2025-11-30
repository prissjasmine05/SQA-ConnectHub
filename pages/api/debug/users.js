import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Get all users to debug field issues
    const users = await User.find({}).select('+password').limit(5);
    
    const debugInfo = users.map(user => ({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      fullname: user.fullname, // This might not exist
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0,
      passwordStarts: user.password ? user.password.substring(0, 10) + '...' : 'No password'
    }));

    return res.status(200).json({
      ok: true,
      count: users.length,
      users: debugInfo
    });

  } catch (error) {
    console.error('DEBUG_ERR:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
}
