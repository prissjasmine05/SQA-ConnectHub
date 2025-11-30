import dbConnect from '../../../lib/mongodb';
import Notification from '../../../models/Notification';
import Event from '../../../models/Event';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Verify JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.uid;

    const { eventId, type = 'event_reminder', recipientIds } = req.body;

    // Validate input
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Get event details
    const event = await Event.findById(eventId).populate('createdBy', 'fullName fullname username');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get creator info
    const creator = await User.findById(userId);
    if (!creator) {
      return res.status(404).json({ message: 'User not found' });
    }

    let notifications = [];
    let recipients = [];

    if (recipientIds && Array.isArray(recipientIds)) {
      // Send to specific users
      recipients = recipientIds;
    } else {
      // Send to all event participants
      recipients = event.participants || [];
    }

    // Create notification message based on type
    let title, message;
    switch (type) {
      case 'event_reminder':
        title = 'Event Reminder';
        message = `Don't forget about "${event.title}" happening soon!`;
        break;
      case 'event_invitation':
        title = 'Event Invitation';
        message = `You're invited to "${event.title}" by ${creator.fullName || creator.fullname}`;
        break;
      case 'event_update':
        title = 'Event Update';
        message = `"${event.title}" has been updated`;
        break;
      default:
        title = 'Event Notification';
        message = `Notification about "${event.title}"`;
    }

    // Create notifications for each recipient
    for (const recipientId of recipients) {
      if (recipientId !== userId) { // Don't send to self
        const notification = new Notification({
          recipient: recipientId,
          sender: userId,
          type,
          title,
          message,
          data: {
            eventId: event._id,
            actionUrl: `/events/${event._id}`
          },
          priority: type === 'event_reminder' ? 'high' : 'medium'
        });

        await notification.save();
        notifications.push(notification);
      }
    }

    res.status(201).json({ 
      message: `Created ${notifications.length} event notifications`,
      notifications: notifications.length
    });

  } catch (error) {
    console.error('Error creating event notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
