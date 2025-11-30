import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { id } = req.query;

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
    case 'POST':
      try {
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        if (event.status !== 'published') {
          return res.status(400).json({ message: 'Event is not available for registration' });
        }

        if (new Date(event.dateTime.start) <= new Date()) {
          return res.status(400).json({ message: 'Cannot join past events' });
        }

        // Check if user already joined
        const existingParticipant = event.participants.find(
          p => p.user.toString() === userId && p.status === 'registered'
        );

        if (existingParticipant) {
          return res.status(400).json({ message: 'Already joined this event' });
        }

        // Check capacity
        const currentParticipants = event.participants.filter(p => p.status === 'registered').length;
        
        if (event.capacity && currentParticipants >= event.capacity) {
          // Add to waitlist
          event.participants.push({
            user: userId,
            status: 'waitlisted',
            registeredAt: new Date()
          });
          
          await event.save();
          
          return res.status(200).json({ 
            message: 'Added to waitlist - You will be notified if a spot becomes available',
            status: 'waitlisted'
          });
        }

        // Add to participants
        event.participants.push({
          user: userId,
          status: 'registered',
          registeredAt: new Date()
        });

        await event.save();

        return res.status(200).json({ 
          message: 'Successfully joined the event!',
          status: 'registered'
        });
      } catch (error) {
        console.error('JOIN event error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    case 'DELETE':
      try {
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        // Remove user from participants
        const participantIndex = event.participants.findIndex(
          p => p.user.toString() === userId
        );

        if (participantIndex === -1) {
          return res.status(400).json({ message: 'Not registered for this event' });
        }

        const wasRegistered = event.participants[participantIndex].status === 'registered';
        event.participants.splice(participantIndex, 1);

        // If someone was registered and left, promote someone from waitlist
        if (wasRegistered) {
          const waitlistedIndex = event.participants.findIndex(p => p.status === 'waitlisted');
          if (waitlistedIndex !== -1) {
            event.participants[waitlistedIndex].status = 'registered';
            event.participants[waitlistedIndex].registeredAt = new Date();
          }
        }

        await event.save();

        return res.status(200).json({ 
          message: 'Successfully left the event' 
        });
      } catch (error) {
        console.error('LEAVE event error:', error);
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
