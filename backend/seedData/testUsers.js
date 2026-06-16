// Test user accounts covering different subscription plans, academic
// levels, and verification states. All accounts use the password
// "Test@123" unless noted otherwise. Passwords are hashed automatically
// by the User model's pre-save hook.

const testUsers = [
  {
    name: "Aarav Sharma",
    email: "aarav.free@test.com",
    password: "Test@123",
    isVerified: true,
    academicLevel: "SSC_10TH",
    currentStream: "NOT_APPLICABLE",
    subscriptionPlan: "FREE",
    isPremium: false,
  },
  {
    name: "Priya Nair",
    email: "priya.monthly@test.com",
    password: "Test@123",
    isVerified: true,
    academicLevel: "HSC_12TH",
    currentStream: "SCIENCE",
    subscriptionPlan: "PREMIUM_MONTHLY",
    isPremium: true,
    subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  {
    name: "Rohan Mehta",
    email: "rohan.lifetime@test.com",
    password: "Test@123",
    isVerified: true,
    academicLevel: "HSC_12TH",
    currentStream: "COMMERCE",
    subscriptionPlan: "PREMIUM_LIFETIME",
    isPremium: true,
    subscriptionExpiresAt: null,
  },
  {
    name: "Sneha Iyer",
    email: "sneha.arts@test.com",
    password: "Test@123",
    isVerified: true,
    academicLevel: "HSC_12TH",
    currentStream: "ARTS",
    subscriptionPlan: "FREE",
    isPremium: false,
  },
  {
    name: "Karan Verma",
    email: "karan.graduate@test.com",
    password: "Test@123",
    isVerified: true,
    academicLevel: "GRADUATE",
    currentStream: "SCIENCE",
    subscriptionPlan: "PREMIUM_MONTHLY",
    isPremium: true,
    subscriptionExpiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  },
  {
    name: "Ananya Joshi",
    email: "ananya.unverified@test.com",
    password: "Test@123",
    isVerified: false,
    academicLevel: "SSC_10TH",
    currentStream: "NOT_APPLICABLE",
    subscriptionPlan: "FREE",
    isPremium: false,
  },
];

module.exports = testUsers;
