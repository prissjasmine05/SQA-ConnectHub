import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  // Get user from token
  const token = req.cookies.ch_token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.uid;
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  switch (method) {
    case 'GET':
      try {
        const { page = 1, limit = 10, status = 'published', upcoming = false } = req.query;
        const skip = (page - 1) * limit;

        let filter = { isActive: true, status };
        
        if (upcoming === 'true') {
          filter['dateTime.start'] = { $gte: new Date() };
        }

        const events = await Event.find(filter)
          .populate('organizer', 'fullName avatar username')
          .populate('community', 'name avatar')
          .sort({ 'dateTime.start': 1 })
          .skip(skip)
          .limit(parseInt(limit));

        const total = await Event.countDocuments(filter);

        return res.status(200).json({
          events,
          pagination: {
            current: parseInt(page),
            total: Math.ceil(total / limit),
            hasNext: skip + events.length < total
          }
        });
      } catch (error) {
        console.error('GET events error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'POST':
      try {
        const { 
          title, 
          description, 
          location, 
          dateTime, 
          capacity, 
          tags = [], 
          price = 0,
          community = null,
          image
        } = req.body;

        if (!title || !description || !location || !dateTime) {
          return res.status(400).json({ message: 'Required fields missing' });
        }

        if (new Date(dateTime.start) <= new Date()) {
          return res.status(400).json({ message: 'Event start time must be in the future' });
        }

        if (new Date(dateTime.end) <= new Date(dateTime.start)) {
          return res.status(400).json({ message: 'Event end time must be after start time' });
        }

        const event = new Event({
          title: title.trim(),
          description: description.trim(),
          organizer: userId,
          community,
          location,
          dateTime,
          capacity,
          tags,
          price,
          image,
          status: 'published'
        });

        await event.save();
        await event.populate('organizer', 'fullName avatar username');

        return res.status(201).json({ 
          message: 'Event created successfully', 
          event 
        });
      } catch (error) {
        console.error('POST event error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
