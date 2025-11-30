import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, unique: true, sparse: true, trim: true },
  // penting: select:false agar tidak otomatis terambil, nanti saat login kita .select('+password')
  password: { type: String, required: true, select: false },
  bio: { type: String, trim: true },
  avatar: String,
  phoneNumber: String,
  interests: [String],
  accountType: { type: String, enum: ['personal', 'community', 'business'], default: 'personal' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
  points: { type: Number, default: 0 },
  settings: {
    privacy: {
      profileVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false }
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      messages: { type: Boolean, default: true }
    }
  },
  privacySettings: {
    profileVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
    messagePermissions: { type: String, enum: ['everyone', 'friends', 'none'], default: 'friends' },
    friendRequests: { type: String, enum: ['everyone', 'friends-of-friends', 'none'], default: 'everyone' },
    activityStatus: { type: Boolean, default: true },
    readReceipts: { type: Boolean, default: true },
    lastSeen: { type: Boolean, default: true },
    dataCollection: { type: Boolean, default: false },
    personalization: { type: Boolean, default: true },
    analyticsSharing: { type: Boolean, default: false },
    locationSharing: { type: Boolean, default: false },
    phoneNumberVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'friends' },
    emailVisibility: { type: String, enum: ['public', 'friends', 'private'], default: 'private' },
    searchable: { type: Boolean, default: true },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    mutedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  onboardingCompleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
