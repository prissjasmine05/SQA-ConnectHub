import Community from '../../../models/Community';
import connectDB from '../../../lib/mongodb';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const community = await Community.findById(id)
        .populate('owner', 'fullName avatar username')
        .populate('admins', 'fullName avatar username')
        .populate({
          path: 'members',
          select: 'fullName avatar username',
          options: { limit: 10 } // Only get first 10 members for preview
        });

      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }

      res.status(200).json(community);
    } catch (error) {
      console.error('Error fetching community:', error);
      res.status(500).json({ error: 'Failed to fetch community' });
    }
  }
}
