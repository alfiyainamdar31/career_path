const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const paymentRoutes = require("./routes/payment");

const app = express();

// 1. Security middleware first
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// 2. CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// 3. Body parsers - IMPORTANT: These must come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// 5. Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/payment", paymentRoutes);

// 6. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// 7. Error handling middleware - MUST be last
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ✅ FIXED: MongoDB connection for Mongoose 7+
// Remove the deprecated options
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    // Don't crash the server, just log the error
    console.log("⚠️ Make sure MongoDB is installed and running");
    console.log(
      "💡 To install MongoDB: https://docs.mongodb.com/manual/installation/",
    );
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
