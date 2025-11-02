import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  // penting: select:false agar tidak otomatis terambil, nanti saat login kita .select('+password')
  password: { type: String, required: true, select: false },
  interests: [String],
  onboardingCompleted: { type: Boolean, default: false }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
