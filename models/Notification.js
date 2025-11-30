import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'message',
      'follow',
      'like',
      'comment',
      'event_reminder',
      'event_invitation',
      'event_update',
      'community_invitation',
      'post_mention'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    // Flexible field to store additional data based on notification type
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    actionUrl: String // URL to navigate when notification is clicked
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes for performance
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ recipient: 1, type: 1 });
notificationSchema.index({ createdAt: -1 });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
