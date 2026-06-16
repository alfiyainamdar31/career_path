const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");
const Career = require("./models/Career");
const User = require("./models/User");

const questions = require("./seedData/questions");
const techAndEngineeringCareers = require("./seedData/careers/techAndEngineering.js");
const healthcareAndScienceCareers = require("./seedData/careers/healthcareAndScience.js");
const businessAndLawCareers = require("./seedData/careers/businessAndLaw.js");
const designMediaEducationCareers = require("./seedData/careers/designMediaEducation.js");
const testUsers = require("./seedData/testUsers");

const { calculateBrainDominance, matchCareers } = require("./utils/scoring");

const allCareers = [
  ...techAndEngineeringCareers,
  ...healthcareAndScienceCareers,
  ...businessAndLawCareers,
  ...designMediaEducationCareers,
];

// Sample answer sets used to give test users realistic quiz results.
// Each array has 15 entries (0 = Left, 1 = Right, 2 = Balanced) matching
// the order of the seeded question bank.
const sampleAnswerSets = {
  STRONG_LEFT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  HSC_SCIENCE_LEFT: [0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  COMMERCE_BALANCED: [2, 0, 1, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2],
  ARTS_RIGHT: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  GRADUATE_MODERATE_LEFT: [0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Question.deleteMany({});
    await Career.deleteMany({});
    await User.deleteMany({ email: { $regex: "@test.com$" } });
    console.log("Cleared existing questions, careers and test users");

    await Question.insertMany(questions);
    console.log(`Seeded ${questions.length} questions`);

    const insertedCareers = await Career.insertMany(allCareers);
    console.log(`Seeded ${insertedCareers.length} careers`);

    // Map test users to a sample answer set and stream so their quiz
    // results and career matches are populated immediately.
    const userAnswerMap = {
      "aarav.free@test.com": null, // SSC student, hasn't taken quiz yet
      "priya.monthly@test.com": "HSC_SCIENCE_LEFT",
      "rohan.lifetime@test.com": "COMMERCE_BALANCED",
      "sneha.arts@test.com": "ARTS_RIGHT",
      "karan.graduate@test.com": "GRADUATE_MODERATE_LEFT",
      "ananya.unverified@test.com": null, // unverified, hasn't taken quiz
    };

    for (const userData of testUsers) {
      const user = new User(userData);

      const answerSetKey = userAnswerMap[userData.email];
      if (answerSetKey) {
        const answers = sampleAnswerSets[answerSetKey];
        const { dominance, leftScore, rightScore } = calculateBrainDominance(
          answers,
        );

        // In seed.js, replace the careerMatches assignment with:
        const matched = matchCareers(
          dominance,
          insertedCareers,
          userData.currentStream,
        );

        // Ensure matched is an array
        const matchedArray = Array.isArray(matched) ? matched : [];

        user.quizAnswers = answers;
        user.brainDominance = dominance;
        user.leftScore = leftScore;
        user.rightScore = rightScore;
        user.careerMatches = matchedArray.map((career, index) => ({
          careerId: career.careerId,
          matchScore: career.matchScore,
          isPremium: userData.isPremium ? true : index < 3,
        }));
      }

      await user.save();
    }
    console.log(`Seeded ${testUsers.length} test users`);

    console.log("\nDatabase seeded successfully");
    console.log("\nSummary:");
    console.log(`  - ${questions.length} questions added`);
    console.log(`  - ${insertedCareers.length} careers added`);
    console.log(`  - ${testUsers.length} test users added`);
    console.log("\nTest accounts (all use password: Test@123):");
    testUsers.forEach((u) => {
      console.log(
        `  - ${u.email}  [${u.subscriptionPlan}]  verified=${u.isVerified}`,
      );
    });
    console.log("\nYou can now start the server: npm run dev");

    process.exit(0);
  } catch (error) {
    console.error("\nError seeding database:");
    console.error(error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach((key) => {
        console.error(`  - ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedDatabase();
