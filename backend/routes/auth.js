const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const { sendOTPEmail, sendLoginOTPEmail } = require("../utils/emailService.js");

const router = express.Router();

// Generate a signed JWT for an authenticated user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const buildUserPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isPremium: user.isPremium,
  subscriptionPlan: user.subscriptionPlan,
  subscriptionExpiresAt: user.subscriptionExpiresAt,
  brainDominance: user.brainDominance,
  leftScore: user.leftScore,
  rightScore: user.rightScore,
  academicLevel: user.academicLevel,
  currentStream: user.currentStream,
  isVerified: user.isVerified,
});

// @route   POST /api/auth/register
// @desc    Create an unverified account and email a registration OTP
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, academicLevel, currentStream } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.isVerified) {
        return res.status(400).json({
          success: false,
          message: "An account with this email already exists",
        });
      }
      // Unverified account exists: refresh its OTP and resend
      const otp = userExists.generateOTP();
      userExists.name = name;
      userExists.password = password;
      if (academicLevel) userExists.academicLevel = academicLevel;
      if (currentStream) userExists.currentStream = currentStream;
      await userExists.save();

      await sendOTPEmail(userExists.email, userExists.name, otp);

      return res.status(200).json({
        success: true,
        requiresVerification: true,
        userId: userExists._id,
        message: "Verification code sent to your email",
      });
    }

    const user = new User({
      name,
      email,
      password,
      academicLevel: academicLevel || null,
      currentStream: currentStream || null,
    });

    const otp = user.generateOTP();
    await user.save();

    await sendOTPEmail(user.email, user.name, otp);

    res.status(201).json({
      success: true,
      requiresVerification: true,
      userId: user._id,
      message: "Account created. Verification code sent to your email",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   POST /api/auth/verify-registration-otp
// @desc    Verify the OTP sent at registration and activate the account
// @access  Public
router.post("/verify-registration-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide the verification code",
      });
    }

    const user = await User.findById(userId).select(
      "+otpCode +otpExpires +otpAttempts",
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    if (user.otpAttempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new code.",
      });
    }

    if (!user.verifyOTP(otp)) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: buildUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during verification",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   POST /api/auth/resend-otp
// @desc    Resend a fresh registration OTP
// @access  Public
router.post("/resend-otp", async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    const otp = user.generateOTP();
    await user.save();
    await sendOTPEmail(user.email, user.name, otp);

    res.json({
      success: true,
      message: "A new verification code has been sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while resending code",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user (requires a verified account)
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      const otp = user.generateOTP();
      await user.save();
      await sendOTPEmail(user.email, user.name, otp);

      return res.status(200).json({
        success: true,
        requiresVerification: true,
        userId: user._id,
        message: "Please verify your email. A new code has been sent.",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: buildUserPayload(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get the currently authenticated user
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("careerMatches.careerId")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update academic level and stream for an existing user
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const { academicLevel, currentStream } = req.body;

    const user = await User.findById(req.user._id);
    if (academicLevel) user.academicLevel = academicLevel;
    if (currentStream) user.currentStream = currentStream;
    await user.save();

    res.json({ success: true, user: buildUserPayload(user) });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error updating profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
