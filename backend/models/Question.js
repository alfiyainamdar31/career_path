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
        enum: ["L", "R", "B"], // Left, Right, Balanced
        required: true,
      },
    },
  ],
  category: {
    type: String,
    enum: ["problem_solving", "communication", "work_style", "personal"],
    required: true,
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
