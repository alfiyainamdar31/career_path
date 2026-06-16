const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      type: {
        type: String,
        enum: ["L", "R", "B"], // Left brain, Right brain, Balanced
        required: true,
      },
    },
  ],
  category: {
    type: String,
    enum: [
      "problem_solving",
      "communication",
      "work_style",
      "personal",
      "interest",
      "aptitude",
    ],
    required: true,
  },
  // Which student groups this question applies to.
  // Shared questions apply to every academic level.
  applicableLevels: {
    type: [String],
    enum: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
    default: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
  },
  order: {
    type: Number,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
