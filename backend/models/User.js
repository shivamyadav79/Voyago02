import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function () { return !this.googleId; } },
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    loginHistory: [
      {
        ip: String,
        device: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    
    // ✅ Add the `isVerified` field (default: false)
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Pre-save middleware to hash password (only if modified and for non-Google users)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create indexes outside of middleware
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ googleId: 1 }, { unique: true, sparse: true });

export default mongoose.model('User', UserSchema);
