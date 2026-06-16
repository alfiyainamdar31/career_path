const express = require("express");
const Career = require("../models/Career");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/careers
// @desc    Browse all careers with optional search and filters
// @access  Public
// Query params:
//   q        - free text search across title, description, skills
//   category - filter by career category
//   stream   - filter by relevant academic stream (SCIENCE/COMMERCE/ARTS/ANY)
//   tier     - filter by tier (S/A/B/C)
router.get("/", async (req, res) => {
  try {
    const { q, category, stream, tier } = req.query;

    const filter = {};

    if (q) {
      filter.$text = { $search: q };
    }
    if (category) {
      filter.category = category;
    }
    if (stream) {
      filter.relevantStreams = { $in: [stream, "ANY"] };
    }
    if (tier) {
      filter.tier = tier;
    }

    const careers = await Career.find(filter)
      .select(
        "title shortDescription category relevantStreams matchPercentage averageSalary growthRate icon color tier",
      )
      .sort({ matchPercentage: -1 });

    res.json({
      success: true,
      count: careers.length,
      careers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/careers/categories
// @desc    Get the list of distinct career categories for filter chips
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Career.distinct("category");
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/careers/:id
// @desc    Get full detail for a single career, including roadmap
// @access  Public for the overview; resources gated by premium below
router.get("/:id", async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    res.json({
      success: true,
      career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
