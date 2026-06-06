const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["course", "book", "video", "article"],
    required: true,
  },
});

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    brainType: {
      type: [String],
      enum: [
        "STRONG_LEFT",
        "MODERATE_LEFT",
        "BALANCED",
        "MODERATE_RIGHT",
        "STRONG_RIGHT",
      ],
      required: true,
    },
    matchPercentage: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    averageSalary: {
      type: String,
      default: "Not specified",
    },
    growthRate: {
      type: String,
      default: "Not specified",
    },
    resources: [resourceSchema],
    icon: {
      type: String,
      default: "💼",
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    tier: {
      type: String,
      enum: ["S", "A", "B", "C"],
      default: "B",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Career", careerSchema);
