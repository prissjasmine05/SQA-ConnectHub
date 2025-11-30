import dbConnect from '../../../lib/mongodb';
import Notification from '../../../models/Notification';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Get token from Authorization header or cookies
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      token = req.cookies.ch_token;
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.uid;

    // Clean up old message notifications (keep only the latest from each sender)
    const messageNotifications = await Notification.find({
      recipient: userId,
      type: 'message',
      isDeleted: false
    }).populate('sender', 'fullName fullname username avatar').sort({ createdAt: -1 });

    const toDelete = [];
    const seenSenders = new Set();

    messageNotifications.forEach(notification => {
      const senderId = notification.sender._id.toString();
      if (seenSenders.has(senderId)) {
        // This is an older notification from the same sender
        toDelete.push(notification._id);
      } else {
        seenSenders.add(senderId);
      }
    });

    // Mark old notifications as deleted
    if (toDelete.length > 0) {
      await Notification.updateMany(
        { _id: { $in: toDelete } },
        { isDeleted: true }
      );
    }

    res.status(200).json({ 
      message: 'Notifications cleaned up',
      deletedCount: toDelete.length 
    });

  } catch (error) {
    console.error('Error cleaning up notifications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
