import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  organizer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  community: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Community',
    default: null 
  },
  location: {
    type: { 
      type: String, 
      enum: ['online', 'physical'], 
      required: true 
    },
    address: String,
    city: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    meetingLink: String
  },
  dateTime: {
    start: { 
      type: Date, 
      required: true 
    },
    end: { 
      type: Date, 
      required: true 
    }
  },
  capacity: { 
    type: Number, 
    default: null 
  },
  participants: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['registered', 'waitlisted', 'cancelled'], 
      default: 'registered' 
    },
    registeredAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  tags: [String],
  image: String,
  price: { 
    type: Number, 
    default: 0 
  },
  currency: { 
    type: String, 
    default: 'IDR' 
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'cancelled', 'completed'], 
    default: 'draft' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Index untuk performa
eventSchema.index({ organizer: 1, createdAt: -1 });
eventSchema.index({ community: 1, 'dateTime.start': 1 });
eventSchema.index({ 'dateTime.start': 1, status: 1 });
eventSchema.index({ status: 1, isActive: 1 });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
