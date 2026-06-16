const express = require("express");
const User = require("../models/User");
const Question = require("../models/Question");
const Career = require("../models/Career");
const { protect } = require("../middleware/auth");
const { calculateBrainDominance, matchCareers } = require("../utils/scoring");

const router = express.Router();

// Number of free career matches shown to non-premium users
const FREE_CAREER_LIMIT = 3;

// @route   GET /api/quiz/questions
// @desc    Get quiz questions, optionally filtered by academic level
// @access  Public
router.get("/questions", async (req, res) => {
  try {
    const { level } = req.query;

    const filter = { isActive: true };
    if (level) {
      filter.applicableLevels = level;
    }

    const questions = await Question.find(filter).sort("order").select("-__v");

    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/quiz/submit
// @desc    Submit quiz answers, calculate dominance and match careers
// @access  Private
router.post("/submit", protect, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide answers",
      });
    }

    const { dominance, leftScore, rightScore } = calculateBrainDominance(
      answers,
    );

    const careers = await Career.find({});
    const user = await User.findById(req.user._id);

    const matchedCareers = matchCareers(dominance, careers, user.currentStream);

    user.quizAnswers = answers;
    user.brainDominance = dominance;
    user.leftScore = leftScore;
    user.rightScore = rightScore;

    user.careerMatches = matchedCareers.map((career, index) => ({
      careerId: career.careerId,
      matchScore: career.matchScore,
      isPremium: user.isPremium ? true : index < FREE_CAREER_LIMIT,
    }));

    await user.save();

    let visibleCareers = matchedCareers;
    if (!user.isPremium) {
      visibleCareers = matchedCareers.slice(0, FREE_CAREER_LIMIT);
    }

    res.json({
      success: true,
      results: {
        dominance,
        leftScore,
        rightScore,
        totalMatches: matchedCareers.length,
        careers: visibleCareers,
        isPremium: user.isPremium,
        academicLevel: user.academicLevel,
        currentStream: user.currentStream,
        message: user.isPremium
          ? "Full results unlocked"
          : `Upgrade to premium to see all ${matchedCareers.length} career matches`,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/quiz/results
// @desc    Get the current user's saved quiz results
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

    let careerMatches = user.careerMatches;
    if (!user.isPremium) {
      careerMatches = careerMatches.slice(0, FREE_CAREER_LIMIT);
    }

    const careers = careerMatches
      .filter((cm) => cm.careerId)
      .map((cm) => ({
        careerId: cm.careerId._id,
        title: cm.careerId.title,
        shortDescription: cm.careerId.shortDescription,
        description: cm.careerId.description,
        matchScore: cm.matchScore,
        category: cm.careerId.category,
        relevantStreams: cm.careerId.relevantStreams,
        requiredSkills: cm.careerId.requiredSkills,
        averageSalary: cm.careerId.averageSalary,
        growthRate: cm.careerId.growthRate,
        futureScope: cm.careerId.futureScope,
        roadmap: cm.careerId.roadmap,
        keyExams: cm.careerId.keyExams,
        resources: cm.careerId.resources,
        tier: cm.careerId.tier,
        icon: cm.careerId.icon,
        color: cm.careerId.color,
      }));

    res.json({
      success: true,
      results: {
        dominance: user.brainDominance,
        leftScore: user.leftScore,
        rightScore: user.rightScore,
        totalMatches: user.careerMatches.length,
        careers,
        isPremium: user.isPremium,
        academicLevel: user.academicLevel,
        currentStream: user.currentStream,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
