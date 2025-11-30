import dbConnect from '../../../lib/mongodb';
import { Message, Conversation } from '../../../models/Message';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { userId: targetUserId } = req.query;

  if (req.method !== 'GET') {
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
    const currentUserId = decoded.uid;

    if (!targetUserId) {
      return res.status(400).json({ message: 'Target user ID is required' });
    }

    // Verify target user exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create conversation between the two users
    let conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, targetUserId] },
      isGroup: false
    });

    if (!conversation) {
      // Double-check to prevent race condition duplicates
      conversation = await Conversation.findOne({
        participants: { $all: [currentUserId, targetUserId] },
        isGroup: false
      });
      
      if (!conversation) {
        // Create new conversation if it doesn't exist
        conversation = new Conversation({
          participants: [currentUserId, targetUserId],
          isGroup: false
        });
        await conversation.save();
      }
    }

    // Get messages for this conversation
    const messages = await Message.find({
      conversation: conversation._id,
      isDeleted: false
    })
    .populate('sender', 'fullName fullname username avatar')
    .sort({ createdAt: 1 });

    // Mark messages as read for current user
    await Message.updateMany(
      {
        conversation: conversation._id,
        sender: { $ne: currentUserId },
        'readBy.user': { $ne: currentUserId }
      },
      {
        $push: {
          readBy: {
            user: currentUserId,
            readAt: new Date()
          }
        }
      }
    );

    // Format messages for frontend
    const formattedMessages = messages.map(message => ({
      _id: message._id,
      content: message.content,
      sender: message.sender._id,
      senderInfo: {
        name: message.sender.fullName || message.sender.fullname,
        username: message.sender.username,
        avatar: message.sender.avatar
      },
      createdAt: message.createdAt,
      type: message.type,
      media: message.media,
      isRead: message.readBy.some(read => read.user.toString() === currentUserId)
    }));

    res.status(200).json({ messages: formattedMessages });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
