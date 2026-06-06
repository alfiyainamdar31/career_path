const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("./models/Question");
const Career = require("./models/Career");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Question.deleteMany({});
    await Career.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Seed Questions
    const questions = [
      {
        text: "When facing a complex problem, you typically:",
        options: [
          { text: "Break it down into smaller logical steps", type: "L" },
          { text: "Look for patterns and big-picture connections", type: "R" },
          {
            text: "Discuss with others to get multiple perspectives",
            type: "B",
          },
          { text: "Trust your gut feeling on the first solution", type: "R" },
        ],
        category: "problem_solving",
        order: 1,
      },
      {
        text: "Your ideal work environment is:",
        options: [
          { text: "Structured, quiet, with clear deadlines", type: "L" },
          { text: "Dynamic, collaborative, open workspace", type: "R" },
          { text: "Flexible, creative, visually inspiring", type: "R" },
          { text: "Organized, process-driven, analytical", type: "L" },
        ],
        category: "work_style",
        order: 2,
      },
      {
        text: "When learning new software, you prefer:",
        options: [
          { text: "Reading the manual/documentation first", type: "L" },
          { text: "Exploring features by trial and error", type: "R" },
          { text: "Watching video tutorials", type: "R" },
          { text: "Taking an online course with assignments", type: "L" },
        ],
        category: "problem_solving",
        order: 3,
      },
      {
        text: "You're more likely to remember:",
        options: [
          { text: "Facts, dates, and specific details", type: "L" },
          { text: "Faces, colors, and spatial layouts", type: "R" },
          { text: "Stories and emotional experiences", type: "R" },
          { text: "Procedures and step-by-step processes", type: "L" },
        ],
        category: "personal",
        order: 4,
      },
      {
        text: "In a debate, you prefer to use:",
        options: [
          { text: "Statistics and data to prove your point", type: "L" },
          { text: "Metaphors and analogies to explain", type: "R" },
          { text: "Logical fallacies identification", type: "L" },
          { text: "Emotional appeals and storytelling", type: "R" },
        ],
        category: "communication",
        order: 5,
      },
      {
        text: "Your notes or sketches tend to be:",
        options: [
          { text: "Bulleted lists and outlines", type: "L" },
          { text: "Mind maps with colors and drawings", type: "R" },
          { text: "Dense paragraphs of text", type: "L" },
          { text: "Random doodles and disconnected ideas", type: "R" },
        ],
        category: "personal",
        order: 6,
      },
    ];

    await Question.insertMany(questions);
    console.log(`✅ Seeded ${questions.length} questions`);

    // Seed Careers
    const careers = [
      {
        title: "Data Scientist",
        description:
          "Analyze complex data to help companies make better decisions using statistical methods and machine learning.",
        brainType: ["STRONG_LEFT", "MODERATE_LEFT"],
        matchPercentage: 95,
        requiredSkills: [
          "Python",
          "Statistics",
          "Machine Learning",
          "SQL",
          "Data Visualization",
        ],
        averageSalary: "$120,000 - $180,000",
        growthRate: "35% (Much faster than average)",
        resources: [
          {
            name: "Google Data Analytics Course",
            url: "https://coursera.org/google-data-analytics",
            type: "course",
          },
          {
            name: "Python for Data Science",
            url: "https://datacamp.com",
            type: "course",
          },
          {
            name: "Storytelling with Data",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "📊",
        color: "#3B82F6",
        tier: "S",
      },
      {
        title: "UX/UI Designer",
        description:
          "Create intuitive and beautiful digital experiences that users love, combining psychology with visual design.",
        brainType: ["STRONG_RIGHT", "MODERATE_RIGHT", "BALANCED"],
        matchPercentage: 98,
        requiredSkills: [
          "Figma",
          "User Research",
          "Prototyping",
          "Visual Design",
          "Wireframing",
        ],
        averageSalary: "$85,000 - $140,000",
        growthRate: "23% (Faster than average)",
        resources: [
          {
            name: "Google UX Design Certificate",
            url: "https://coursera.org/google-ux",
            type: "course",
          },
          {
            name: "Figma Masterclass",
            url: "https://udemy.com/figma",
            type: "course",
          },
          {
            name: "Don't Make Me Think",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "🎨",
        color: "#F97316",
        tier: "S",
      },
      {
        title: "Product Manager",
        description:
          "Lead product strategy and development across teams, bridging business, technology, and user needs.",
        brainType: ["BALANCED", "MODERATE_LEFT", "MODERATE_RIGHT"],
        matchPercentage: 92,
        requiredSkills: [
          "Strategy",
          "Communication",
          "Agile",
          "Data Analysis",
          "Leadership",
        ],
        averageSalary: "$110,000 - $170,000",
        growthRate: "15% (Average)",
        resources: [
          {
            name: "Product Management Certification",
            url: "https://productschool.com",
            type: "course",
          },
          {
            name: "Inspired by Marty Cagan",
            url: "https://amazon.com",
            type: "book",
          },
          {
            name: "Product School YouTube",
            url: "https://youtube.com/productschool",
            type: "video",
          },
        ],
        icon: "📱",
        color: "#8B5CF6",
        tier: "A",
      },
      {
        title: "Full Stack Developer",
        description:
          "Build complete web applications from front to back, solving real-world problems with code.",
        brainType: ["BALANCED", "MODERATE_LEFT"],
        matchPercentage: 90,
        requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Git"],
        averageSalary: "$90,000 - $150,000",
        growthRate: "22% (Faster than average)",
        resources: [
          {
            name: "The Odin Project",
            url: "https://theodinproject.com",
            type: "course",
          },
          {
            name: "Full Stack Open",
            url: "https://fullstackopen.com",
            type: "course",
          },
          {
            name: "JavaScript: The Good Parts",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "💻",
        color: "#10B981",
        tier: "S",
      },
      {
        title: "Marketing Strategist",
        description:
          "Create and execute marketing campaigns that drive growth and build brand awareness.",
        brainType: ["MODERATE_RIGHT", "BALANCED"],
        matchPercentage: 88,
        requiredSkills: [
          "Content Strategy",
          "SEO",
          "Analytics",
          "Social Media",
          "Copywriting",
        ],
        averageSalary: "$70,000 - $120,000",
        growthRate: "10% (Average)",
        resources: [
          {
            name: "Digital Marketing Specialization",
            url: "https://coursera.org/digital-marketing",
            type: "course",
          },
          {
            name: "HubSpot Academy",
            url: "https://academy.hubspot.com",
            type: "course",
          },
          {
            name: "Contagious by Jonah Berger",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "📈",
        color: "#EF4444",
        tier: "A",
      },
      {
        title: "Software Engineer",
        description:
          "Design, develop, and maintain software systems that power modern applications.",
        brainType: ["STRONG_LEFT", "MODERATE_LEFT"],
        matchPercentage: 94,
        requiredSkills: [
          "Algorithms",
          "Data Structures",
          "System Design",
          "Java/Python",
          "Databases",
        ],
        averageSalary: "$100,000 - $160,000",
        growthRate: "25% (Much faster than average)",
        resources: [
          {
            name: "CS50 by Harvard",
            url: "https://cs50.harvard.edu",
            type: "course",
          },
          { name: "LeetCode", url: "https://leetcode.com", type: "course" },
          {
            name: "Clean Code by Robert Martin",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "⚙️",
        color: "#6366F1",
        tier: "S",
      },
      {
        title: "Creative Director",
        description:
          "Lead creative vision for brands, campaigns, and visual storytelling across media.",
        brainType: ["STRONG_RIGHT"],
        matchPercentage: 96,
        requiredSkills: [
          "Leadership",
          "Visual Design",
          "Brand Strategy",
          "Art Direction",
          "Creativity",
        ],
        averageSalary: "$120,000 - $200,000",
        growthRate: "12% (Average)",
        resources: [
          {
            name: "Creative Leadership Course",
            url: "https://coursera.org",
            type: "course",
          },
          {
            name: "The Creative Habit by Twyla Tharp",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "🎬",
        color: "#F43F5E",
        tier: "A",
      },
      {
        title: "Financial Analyst",
        description:
          "Analyze financial data to help businesses make investment decisions and plan for growth.",
        brainType: ["STRONG_LEFT", "MODERATE_LEFT"],
        matchPercentage: 89,
        requiredSkills: [
          "Excel",
          "Financial Modeling",
          "Accounting",
          "Data Analysis",
          "Valuation",
        ],
        averageSalary: "$70,000 - $110,000",
        growthRate: "8% (Average)",
        resources: [
          {
            name: "Financial Analyst Certification",
            url: "https://cfi.com",
            type: "course",
          },
          {
            name: "Excel Skills for Business",
            url: "https://coursera.org",
            type: "course",
          },
          {
            name: "The Intelligent Investor",
            url: "https://amazon.com",
            type: "book",
          },
        ],
        icon: "💰",
        color: "#F59E0B",
        tier: "B",
      },
    ];

    await Career.insertMany(careers);
    console.log(`✅ Seeded ${careers.length} careers`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${questions.length} questions added`);
    console.log(`   - ${careers.length} careers added`);
    console.log("\n🚀 You can now start your server: npm run dev");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding database:");
    console.error(error.message);
    if (error.errors) {
      console.error("\nValidation errors:");
      Object.keys(error.errors).forEach((key) => {
        console.error(`   - ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedDatabase();
