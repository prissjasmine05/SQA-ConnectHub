import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Delete all users (for development only!)
    const result = await User.deleteMany({});
    
    return res.status(200).json({
      ok: true,
      message: `Deleted ${result.deletedCount} users`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('CLEAR_DB_ERR:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
}
