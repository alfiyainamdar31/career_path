const express = require("express");
const User = require("../models/User");
const Question = require("../models/Question");
const Career = require("../models/Career");
const { protect } = require("../middleware/auth");
const { calculateBrainDominance, matchCareers } = require("../utils/scoring");

const router = express.Router();

// @route   GET /api/quiz/questions
// @desc    Get all quiz questions
// @access  Public
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find({ isActive: true })
      .sort("order")
      .select("-__v");

    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/quiz/submit
// @desc    Submit quiz answers and get results
// @access  Private
router.post("/submit", protect, async (req, res) => {
  try {
    const { answers } = req.body; // Array of 0(L),1(R),2(B)

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide answers",
      });
    }

    // Calculate brain dominance
    const { dominance, leftScore, rightScore } = calculateBrainDominance(
      answers,
    );

    // Get all careers
    const careers = await Career.find({});

    // Match careers based on dominance
    const matchedCareers = matchCareers(dominance, careers);

    // Update user
    const user = await User.findById(req.user._id);
    user.quizAnswers = answers;
    user.brainDominance = dominance;
    user.leftScore = leftScore;
    user.rightScore = rightScore;

    // Save career matches (only top 3 for free users)
    user.careerMatches = matchedCareers.map((career, index) => ({
      careerId: career.careerId,
      matchScore: career.matchScore,
      isPremium: user.isPremium ? true : index < 3, // Premium sees all, free sees top 3
    }));

    await user.save();

    // Prepare results (hide premium careers for non-premium users)
    let visibleCareers = matchedCareers;
    if (!user.isPremium) {
      visibleCareers = matchedCareers.slice(0, 3);
    }

    res.json({
      success: true,
      results: {
        dominance,
        leftScore,
        rightScore,
        careers: visibleCareers,
        isPremium: user.isPremium,
        message: user.isPremium
          ? "Full results unlocked!"
          : "Upgrade to premium to see all 10+ career matches",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/quiz/results
// @desc    Get user's quiz results
// @access  Private
router.get("/results", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "careerMatches.careerId",
    );

    if (!user.brainDominance) {
      return res.status(404).json({
        success: false,
        message: "Please take the quiz first",
      });
    }

    res.json({
      success: true,
      results: {
        dominance: user.brainDominance,
        leftScore: user.leftScore,
        rightScore: user.rightScore,
        careers: user.careerMatches,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
