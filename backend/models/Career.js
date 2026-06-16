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

// A single step in the academic/career roadmap for a profession
const roadmapStepSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true, // e.g. "After 10th", "After 12th", "Undergraduate", "Postgraduate / Specialization"
  },
  title: {
    type: String,
    required: true, // e.g. "Choose Science stream with PCM"
  },
  description: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    default: [],
  },
  exams: {
    type: [String],
    default: [],
  },
});

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Used for brain-quiz based matching
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

    // High level category for browsing/filtering
    category: {
      type: String,
      enum: [
        "Technology",
        "Healthcare",
        "Business & Finance",
        "Design & Creative",
        "Science & Research",
        "Law & Public Service",
        "Education",
        "Media & Communication",
        "Engineering",
        "Arts & Humanities",
      ],
      required: true,
    },

    // Which 10th/12th streams lead naturally into this career
    relevantStreams: {
      type: [String],
      enum: ["SCIENCE", "COMMERCE", "ARTS", "ANY"],
      default: ["ANY"],
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
    futureScope: {
      type: String,
      default: "",
    },

    // Step-by-step roadmap from school to profession
    roadmap: {
      type: [roadmapStepSchema],
      default: [],
    },

    // Entrance/competitive exams relevant to this career overall
    keyExams: {
      type: [String],
      default: [],
    },

    resources: [resourceSchema],
    icon: {
      type: String,
      default: "briefcase",
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

// Text index to support the career explorer search bar
careerSchema.index({
  title: "text",
  description: "text",
  requiredSkills: "text",
});

module.exports = mongoose.model("Career", careerSchema);
