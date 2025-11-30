import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { id } = req.query;

  // Get user from token (optional for GET)
  const token = req.cookies.ch_token;
  let userId = null;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.uid;
    } catch (error) {
      // Token invalid, but we can still show public event info
    }
  }

  switch (method) {
    case 'GET':
      try {
        const event = await Event.findById(id)
          .populate('organizer', 'fullName avatar username')
          .populate('community', 'name avatar description')
          .populate('participants.user', 'fullName avatar username');

        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        // Check if current user is participating
        const userParticipation = userId ? 
          event.participants.find(p => p.user._id.toString() === userId) : null;

        const eventData = {
          ...event.toObject(),
          userStatus: userParticipation ? userParticipation.status : null,
          isUserJoined: !!userParticipation,
          participantCount: event.participants.filter(p => p.status === 'registered').length,
          waitlistCount: event.participants.filter(p => p.status === 'waitlisted').length
        };

        return res.status(200).json({ event: eventData });
      } catch (error) {
        console.error('GET event error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'PUT':
      // Only organizer can update
      if (!userId) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      try {
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizer.toString() !== userId) {
          return res.status(403).json({ message: 'Not authorized to update this event' });
        }

        const updates = req.body;
        
        // Validate datetime if provided
        if (updates.dateTime) {
          if (new Date(updates.dateTime.start) <= new Date()) {
            return res.status(400).json({ message: 'Event start time must be in the future' });
          }
          if (new Date(updates.dateTime.end) <= new Date(updates.dateTime.start)) {
            return res.status(400).json({ message: 'Event end time must be after start time' });
          }
        }

        Object.keys(updates).forEach(key => {
          if (key !== '_id' && key !== 'organizer' && key !== 'participants') {
            event[key] = updates[key];
          }
        });

        await event.save();
        await event.populate('organizer', 'fullName avatar username');

        return res.status(200).json({ 
          message: 'Event updated successfully', 
          event 
        });
      } catch (error) {
        console.error('UPDATE event error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'DELETE':
      // Only organizer can delete
      if (!userId) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      try {
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        if (event.organizer.toString() !== userId) {
          return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error('DELETE event error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
