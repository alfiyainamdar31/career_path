const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

const testRegister = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Delete existing test user if exists
    await User.deleteOne({ email: "test@example.com" });
    console.log("Cleaned up existing test user");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    // Create new user
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    });

    await user.save();
    console.log("User created successfully:", {
      id: user._id,
      name: user.name,
      email: user.email,
    });

    // Test password comparison
    const isMatch = await user.comparePassword("123456");
    console.log("Password verification:", isMatch ? "Success" : "Failed");

    await mongoose.disconnect();
    console.log("Test completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
};

testRegister();
