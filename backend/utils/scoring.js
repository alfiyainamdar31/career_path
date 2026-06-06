// Calculate brain dominance based on answers (0 = Left, 1 = Right)
const calculateBrainDominance = (answers) => {
  let leftScore = 0;
  let rightScore = 0;

  answers.forEach((answer) => {
    if (answer === 0) {
      // Left
      leftScore += 2;
    } else if (answer === 1) {
      // Right
      rightScore += 2;
    } else if (answer === 2) {
      // Balanced
      leftScore += 1;
      rightScore += 1;
    }
  });

  const total = leftScore + rightScore;
  const leftPercent = (leftScore / total) * 100;
  const rightPercent = (rightScore / total) * 100;

  let dominance;
  if (leftPercent > 65) dominance = "STRONG_LEFT";
  else if (rightPercent > 65) dominance = "STRONG_RIGHT";
  else if (leftPercent > 55) dominance = "MODERATE_LEFT";
  else if (rightPercent > 55) dominance = "MODERATE_RIGHT";
  else dominance = "BALANCED";

  return {
    dominance,
    leftScore: Math.round(leftPercent),
    rightScore: Math.round(rightPercent),
  };
};

// Match careers based on brain dominance
const matchCareers = (dominance, careers) => {
  return careers
    .filter((career) => career.brainType.includes(dominance))
    .map((career) => ({
      careerId: career._id,
      title: career.title,
      description: career.description,
      matchScore: career.matchPercentage,
      requiredSkills: career.requiredSkills,
      averageSalary: career.averageSalary,
      growthRate: career.growthRate,
      resources: career.resources,
      tier: career.tier,
      icon: career.icon,
      color: career.color,
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = { calculateBrainDominance, matchCareers };
