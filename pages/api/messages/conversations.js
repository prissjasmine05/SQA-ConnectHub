import dbConnect from '../../../lib/mongodb';
import { Message, Conversation } from '../../../models/Message';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
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
    const userId = decoded.uid;

    // Get all conversations for the user (ensure no duplicate conversations)
    const conversations = await Conversation.find({
      participants: userId,
      isActive: true,
      isGroup: false // Only 1-on-1 conversations
    })
    .populate({
      path: 'participants',
      select: 'fullName fullname username avatar'
    })
    .populate({
      path: 'lastMessage.sender',
      select: 'fullName fullname username'
    })
    .sort({ updatedAt: -1 });

    // Format conversations for frontend and remove duplicates by other participant
    const formattedConversations = [];
    const seenUsers = new Set();

    for (const conv of conversations) {
      const otherParticipant = conv.participants.find(p => p && p._id.toString() !== userId);
      
      if (!otherParticipant) continue;
      
      // Skip if we've already seen this user
      const otherUserId = otherParticipant._id.toString();
      if (seenUsers.has(otherUserId)) continue;
      
      seenUsers.add(otherUserId);

      formattedConversations.push({
        _id: otherParticipant._id,
        name: otherParticipant.fullName || otherParticipant.fullname,
        username: otherParticipant.username,
        avatar: otherParticipant.avatar,
        lastMessage: conv.lastMessage?.content || 'Start a conversation',
        lastMessageTime: conv.lastMessage?.timestamp || conv.updatedAt,
        lastMessageSender: conv.lastMessage?.sender?._id.toString() === userId ? 'You' : 
          (conv.lastMessage?.sender?.fullName || conv.lastMessage?.sender?.fullname || 'Unknown')
      });
    }

    res.status(200).json({ conversations: formattedConversations });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
