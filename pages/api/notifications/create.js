import dbConnect from '../../../lib/mongodb';
import Notification from '../../../models/Notification';
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
    const senderId = decoded.uid;

    const { recipientId, type, title, message, data, priority = 'medium' } = req.body;

    // Validate input
    if (!recipientId || !type || !title || !message) {
      return res.status(400).json({ 
        message: 'Recipient ID, type, title, and message are required' 
      });
    }

    // Don't send notification to self
    if (senderId === recipientId) {
      return res.status(400).json({ message: 'Cannot send notification to yourself' });
    }

    // Verify recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Create notification
    const notification = new Notification({
      recipient: recipientId,
      sender: senderId,
      type,
      title,
      message,
      data: data || {},
      priority
    });

    await notification.save();

    // Populate sender info for response
    await notification.populate('sender', 'fullName fullname username avatar');

    res.status(201).json({ 
      message: 'Notification created successfully',
      notification 
    });

  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
