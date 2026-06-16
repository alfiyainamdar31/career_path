// Calculate brain dominance from quiz answers.
// Each answer is 0 (Left), 1 (Right), or 2 (Balanced).
const calculateBrainDominance = (answers) => {
  let leftScore = 0;
  let rightScore = 0;

  answers.forEach((answer) => {
    if (answer === 0) {
      leftScore += 2;
    } else if (answer === 1) {
      rightScore += 2;
    } else if (answer === 2) {
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

// Match and rank careers for a given brain dominance.
// If the user has selected a stream (SCIENCE/COMMERCE/ARTS), careers
// relevant to that stream receive a small ranking boost so the list
// stays realistic for the student's academic path.
const matchCareers = (dominance, careers, stream = null) => {
  // Ensure careers is an array
  const careerArray = Array.isArray(careers) ? careers : [];

  console.log(`Matching careers for dominance: ${dominance}`);
  console.log(`Total careers: ${careerArray.length}`);

  // Filter careers by brain type
  const filtered = careerArray.filter((career) => {
    if (!career) return false;

    // Get brainType - handle both plain objects and Mongoose documents
    let brainType = career.brainType;
    if (
      brainType &&
      typeof brainType === "object" &&
      !Array.isArray(brainType)
    ) {
      // If it's a Mongoose array or similar, convert to array
      brainType = Array.isArray(brainType) ? brainType : [brainType];
    }

    // Ensure it's an array
    if (!brainType || !Array.isArray(brainType)) {
      console.log(`Career ${career.title || "unknown"} has no valid brainType`);
      return false;
    }

    // Check if dominance matches any in brainType
    const matches = brainType.some((type) => type === dominance);
    if (matches) {
      console.log(`✓ ${career.title} matches ${dominance}`);
    }
    return matches;
  });

  console.log(`Filtered careers count: ${filtered.length}`);

  // Map and score careers
  const mapped = filtered.map((career) => {
    let adjustedScore =
      typeof career.matchPercentage === "number" ? career.matchPercentage : 0;

    if (stream && career.relevantStreams) {
      let relevantStreams = career.relevantStreams;
      if (
        relevantStreams &&
        typeof relevantStreams === "object" &&
        !Array.isArray(relevantStreams)
      ) {
        relevantStreams = Array.isArray(relevantStreams)
          ? relevantStreams
          : [relevantStreams];
      }

      if (Array.isArray(relevantStreams)) {
        if (relevantStreams.includes(stream)) {
          adjustedScore = Math.min(100, adjustedScore + 3);
        } else if (!relevantStreams.includes("ANY")) {
          adjustedScore = Math.max(0, adjustedScore - 5);
        }
      }
    }

    // Get career ID - handle both Mongoose document and plain object
    const careerId = career._id || career.careerId || null;

    return {
      careerId: careerId,
      title: career.title || "Unknown Career",
      shortDescription: career.shortDescription || "",
      description: career.description || "",
      matchScore: adjustedScore,
      category: career.category || "",
      relevantStreams: Array.isArray(career.relevantStreams)
        ? career.relevantStreams
        : [],
      requiredSkills: Array.isArray(career.requiredSkills)
        ? career.requiredSkills
        : [],
      averageSalary: career.averageSalary || "",
      growthRate: career.growthRate || "",
      futureScope: career.futureScope || "",
      roadmap: Array.isArray(career.roadmap) ? career.roadmap : [],
      keyExams: Array.isArray(career.keyExams) ? career.keyExams : [],
      resources: Array.isArray(career.resources) ? career.resources : [],
      tier: career.tier || 3,
      icon: career.icon || "",
      color: career.color || "",
    };
  });

  // Sort by match score
  const sorted = mapped.sort((a, b) => b.matchScore - a.matchScore);
  console.log(`Sorted careers count: ${sorted.length}`);

  return sorted;
};
module.exports = { calculateBrainDominance, matchCareers };
