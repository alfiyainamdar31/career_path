const mongoose = require("mongoose");

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
  isPremium: {
    type: Boolean,
    default: false,
  },
  stripeCustomerId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// NO pre-save hook here - we'll hash password in the controller

// Method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
