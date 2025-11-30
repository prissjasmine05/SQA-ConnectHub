import dbConnect from '../../../lib/mongodb';
import Notification from '../../../models/Notification';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
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

  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20, type, unreadOnly } = req.query;
      
      const query = {
        recipient: userId,
        isDeleted: false
      };

      if (type) {
        query.type = type;
      }

      if (unreadOnly === 'true') {
        query.isRead = false;
      }

      let notifications = await Notification.find(query)
        .populate('sender', 'fullName fullname username avatar')
        .populate('data.postId', 'content author')
        .populate('data.eventId', 'title date')
        .populate('data.communityId', 'name')
        .sort({ createdAt: -1 });

      // Deduplicate message notifications - only keep the latest from each sender
      if (!type || type === 'message') {
        const messageNotifications = notifications.filter(n => n.type === 'message');
        const otherNotifications = notifications.filter(n => n.type !== 'message');
        
        // Group message notifications by sender
        const messagesBySender = new Map();
        const messageCounts = new Map();
        
        messageNotifications.forEach(notification => {
          const senderId = notification.sender._id.toString();
          
          // Count messages from this sender
          messageCounts.set(senderId, (messageCounts.get(senderId) || 0) + 1);
          
          // Keep only the latest notification from each sender
          if (!messagesBySender.has(senderId) || 
              new Date(notification.createdAt) > new Date(messagesBySender.get(senderId).createdAt)) {
            messagesBySender.set(senderId, notification);
          }
        });
        
        // Update message content to show count if there are multiple messages
        Array.from(messagesBySender.values()).forEach(notification => {
          const senderId = notification.sender._id.toString();
          const count = messageCounts.get(senderId);
          const senderName = notification.sender.fullName || notification.sender.fullname;
          
          if (count > 1) {
            notification.title = 'New Messages';
            notification.message = `${senderName} sent you ${count} messages`;
          } else {
            notification.title = 'New Message';
            notification.message = `${senderName} sent you a message`;
          }
        });
        
        // Combine deduplicated messages with other notifications
        const deduplicatedMessages = Array.from(messagesBySender.values());
        notifications = [...deduplicatedMessages, ...otherNotifications]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // Apply pagination after deduplication
      const paginatedNotifications = notifications
        .slice((page - 1) * limit, page * limit);

      const totalNotifications = await Notification.countDocuments(query);
      const unreadCount = await Notification.countDocuments({
        recipient: userId,
        isRead: false,
        isDeleted: false
      });

      res.status(200).json({
        notifications: paginatedNotifications,
        totalNotifications: notifications.length,
        unreadCount,
        currentPage: page,
        totalPages: Math.ceil(notifications.length / limit)
      });

    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  } else if (req.method === 'PUT') {
    // Mark notifications as read
    try {
      const { notificationIds, markAllAsRead } = req.body;

      if (markAllAsRead) {
        await Notification.updateMany(
          { recipient: userId, isRead: false },
          { isRead: true }
        );
      } else if (notificationIds && Array.isArray(notificationIds)) {
        await Notification.updateMany(
          { _id: { $in: notificationIds }, recipient: userId },
          { isRead: true }
        );
      } else {
        return res.status(400).json({ message: 'Invalid request' });
      }

      res.status(200).json({ message: 'Notifications marked as read' });

    } catch (error) {
      console.error('Error updating notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  } else if (req.method === 'DELETE') {
    // Delete notifications
    try {
      const { notificationIds } = req.body;

      if (!notificationIds || !Array.isArray(notificationIds)) {
        return res.status(400).json({ message: 'Notification IDs required' });
      }

      await Notification.updateMany(
        { _id: { $in: notificationIds }, recipient: userId },
        { isDeleted: true }
      );

      res.status(200).json({ message: 'Notifications deleted' });

    } catch (error) {
      console.error('Error deleting notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
