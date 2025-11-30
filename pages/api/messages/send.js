import dbConnect from '../../../lib/mongodb';
import { Message, Conversation } from '../../../models/Message';
import User from '../../../models/User';
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
    const senderId = decoded.uid;

    const { recipientId, content, type = 'text', media } = req.body;

    // Validate input
    if (!recipientId || !content?.trim()) {
      return res.status(400).json({ message: 'Recipient ID and content are required' });
    }

    if (senderId === recipientId) {
      return res.status(400).json({ message: 'Cannot send message to yourself' });
    }

    // Verify recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Get sender info
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
      isGroup: false
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        isGroup: false
      });
      await conversation.save();
    }

    // Create the message
    const newMessage = new Message({
      conversation: conversation._id,
      sender: senderId,
      content: content.trim(),
      type,
      media: media || undefined,
      readBy: [{
        user: senderId,
        readAt: new Date()
      }]
    });

    await newMessage.save();

    // Update conversation's last message
    conversation.lastMessage = {
      content: content.trim(),
      sender: senderId,
      timestamp: new Date()
    };
    conversation.updatedAt = new Date();
    await conversation.save();

    // Create notification for recipient (avoid spam - only create if no recent notification exists)
    const recentNotification = await Notification.findOne({
      recipient: recipientId,
      sender: senderId,
      type: 'message',
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) } // Within last 5 minutes
    });

    if (!recentNotification) {
      await new Notification({
        recipient: recipientId,
        sender: senderId,
        type: 'message',
        title: 'New Message',
        message: `${sender.fullName || sender.fullname} sent you a message`,
        data: {
          messageId: newMessage._id,
          actionUrl: `/chat?user=${senderId}`
        },
        priority: 'medium'
      }).save();
    }

    // Populate sender info for response
    await newMessage.populate('sender', 'fullName fullname username avatar');

    // Format message for response
    const formattedMessage = {
      _id: newMessage._id,
      content: newMessage.content,
      sender: newMessage.sender._id,
      senderInfo: {
        name: newMessage.sender.fullName || newMessage.sender.fullname,
        username: newMessage.sender.username,
        avatar: newMessage.sender.avatar
      },
      createdAt: newMessage.createdAt,
      type: newMessage.type,
      media: newMessage.media,
      isRead: true // Always read for sender
    };

    res.status(201).json({ 
      message: formattedMessage,
      conversationId: conversation._id
    });

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
