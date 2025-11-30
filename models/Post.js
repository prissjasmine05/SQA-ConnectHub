import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: {
    type: String,
    trim: true,
    maxLength: 200
  },
  content: { 
    type: String, 
    required: true, 
    trim: true 
  },
  image: {
    type: String, // Single image URL for simplicity
    trim: true
  },
  media: [{
    type: { 
      type: String, 
      enum: ['image', 'video'], 
      required: true 
    },
    url: { 
      type: String, 
      required: true 
    },
    caption: String
  }],
  community: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Community',
    default: null 
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  comments: [{
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    content: { 
      type: String, 
      required: true, 
      trim: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  commentsCount: {
    type: Number,
    default: 0
  },
  sharesCount: {
    type: Number,
    default: 0
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Index untuk performa
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ community: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
