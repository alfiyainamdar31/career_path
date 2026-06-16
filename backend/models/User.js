const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  // Email verification via OTP, required at registration
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpCode: {
    type: String,
    select: false,
  },
  otpExpires: {
    type: Date,
    select: false,
  },
  otpAttempts: {
    type: Number,
    default: 0,
    select: false,
  },

  // Academic context, used to tailor quiz and recommendations
  academicLevel: {
    type: String,
    enum: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER", null],
    default: null,
  },
  currentStream: {
    type: String,
    enum: ["SCIENCE", "COMMERCE", "ARTS", "NOT_APPLICABLE", null],
    default: null,
  },

  // Quiz results
  quizAnswers: {
    type: [Number],
    default: [],
  },
  brainDominance: {
    type: String,
    enum: [
      "STRONG_LEFT",
      "MODERATE_LEFT",
      "BALANCED",
      "MODERATE_RIGHT",
      "STRONG_RIGHT",
      null,
    ],
    default: null,
  },
  leftScore: {
    type: Number,
    default: 0,
  },
  rightScore: {
    type: Number,
    default: 0,
  },
  careerMatches: [
    {
      careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career",
      },
      matchScore: Number,
      isPremium: {
        type: Boolean,
        default: false,
      },
    },
  ],

  // Subscription
  isPremium: {
    type: Boolean,
    default: false,
  },
  subscriptionPlan: {
    type: String,
    enum: ["FREE", "PREMIUM_MONTHLY", "PREMIUM_LIFETIME"],
    default: "FREE",
  },
  subscriptionExpiresAt: {
    type: Date,
    default: null,
  },
  stripeCustomerId: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving if it has been modified
// FIX: Remove the 'next' parameter when using async
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

// Alternative: Use a regular function with next (non-async)
// userSchema.pre("save", function(next) {
//   if (!this.isModified("password")) return next();
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) return next(err);
//       this.password = hash;
//       next();
//     });
//   });
// });

// Compare a plaintext password against the stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate a 6-digit numeric OTP and set its expiry window
userSchema.methods.generateOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.otpCode = otp;
  this.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minute validity
  this.otpAttempts = 0;
  return otp;
};

// Verify a submitted OTP against the stored value and expiry
userSchema.methods.verifyOTP = function (submittedOtp) {
  if (!this.otpCode || !this.otpExpires) return false;
  if (Date.now() > this.otpExpires) return false;
  return this.otpCode === submittedOtp;
};

module.exports = mongoose.model("User", userSchema);
