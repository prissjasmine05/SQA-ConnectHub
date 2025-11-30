import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    unique: true
  },
  description: { 
    type: String, 
    trim: true 
  },
  avatar: String,
  banner: String,
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  admins: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  memberCount: { 
    type: Number, 
    default: 0 
  },
  isPrivate: { 
    type: Boolean, 
    default: false 
  },
  joinRequests: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    message: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    reviewedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    reviewedAt: Date
  }],
  tags: [String],
  rules: [String],
  settings: {
    allowMemberPosts: { type: Boolean, default: true },
    requireApproval: { type: Boolean, default: false },
    allowEvents: { type: Boolean, default: true }
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Index untuk performa
communitySchema.index({ name: 1 });
communitySchema.index({ owner: 1 });
communitySchema.index({ members: 1 });
communitySchema.index({ isActive: 1, createdAt: -1 });

export default mongoose.models.Community || mongoose.model('Community', communitySchema);
