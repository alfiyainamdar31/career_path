const healthcareAndScienceCareers = [
  {
    title: "Doctor (MBBS)",
    shortDescription:
      "Diagnose, treat, and care for patients across general or specialized medicine.",
    description:
      "Doctors examine patients, diagnose illnesses, prescribe treatments, and provide preventive care. The profession demands years of rigorous study but offers deep impact and stable demand worldwide.",
    brainType: ["STRONG_LEFT", "MODERATE_LEFT", "BALANCED"],
    matchPercentage: 91,
    category: "Healthcare",
    relevantStreams: ["SCIENCE"],
    requiredSkills: [
      "Biology",
      "Chemistry",
      "Clinical Diagnosis",
      "Patient Communication",
      "Attention to Detail",
    ],
    averageSalary:
      "$60,000 - $250,000+ (varies widely by specialization and region)",
    growthRate:
      "Consistently high demand, especially in primary care and specialized fields",
    futureScope:
      "Healthcare demand continues to grow with aging populations and expanding access to care. Telemedicine, AI-assisted diagnostics, and preventive care are reshaping how doctors practice, but the core need for skilled physicians remains strong.",
    keyExams: ["NEET (UG)", "NEET (PG) for specialization"],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose the Science stream with Biology",
        description:
          "Physics, Chemistry, and Biology (PCB) are mandatory for medical entrance exams.",
        subjects: ["Physics", "Chemistry", "Biology"],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Clear NEET and pursue MBBS",
        description:
          "A 5.5-year MBBS program including clinical internship is the standard pathway to becoming a doctor.",
        subjects: [
          "Anatomy",
          "Physiology",
          "Biochemistry",
          "Pharmacology",
          "Pathology",
        ],
        exams: ["NEET (UG)"],
      },
      {
        stage: "Internship",
        title: "Complete a 1-year compulsory rotating internship",
        description:
          "Hands-on clinical training across departments such as medicine, surgery, pediatrics, and gynecology.",
        subjects: ["Clinical Rotations"],
        exams: [],
      },
      {
        stage: "Postgraduate / Specialization",
        title: "Pursue MD/MS or a specialized diploma",
        description:
          "Specializing in fields like cardiology, surgery, dermatology, or radiology requires clearing postgraduate entrance exams.",
        subjects: ["Specialization-specific clinical training"],
        exams: ["NEET (PG)"],
      },
    ],
    resources: [
      {
        name: "NEET Preparation Guide (NTA)",
        url: "https://neet.nta.nic.in",
        type: "article",
      },
      {
        name: "Gray's Anatomy for Students",
        url: "https://www.elsevier.com",
        type: "book",
      },
    ],
    icon: "stethoscope",
    color: "#EF4444",
    tier: "S",
  },
  {
    title: "Biotechnology Researcher",
    shortDescription:
      "Apply biology and technology to develop medicines, crops, and industrial processes.",
    description:
      "Biotechnology researchers work in labs to develop new drugs, improve agricultural yields, create biofuels, or advance genetic research, combining laboratory science with innovation.",
    brainType: ["STRONG_LEFT", "MODERATE_LEFT"],
    matchPercentage: 85,
    category: "Science & Research",
    relevantStreams: ["SCIENCE"],
    requiredSkills: [
      "Molecular Biology",
      "Lab Techniques",
      "Genetics",
      "Data Analysis",
      "Research Methodology",
    ],
    averageSalary: "$55,000 - $120,000 (varies by region and sector)",
    growthRate:
      "Growing steadily, especially in pharmaceuticals and agri-biotech",
    futureScope:
      "Biotechnology is central to advances in personalized medicine, gene therapy, sustainable agriculture, and biofuels. Growth in pharmaceutical R&D and increasing investment in life sciences research support strong long-term prospects.",
    keyExams: [
      "NEET (UG) for related programs",
      "JEE Main (for B.Tech Biotechnology)",
      "CUET",
    ],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose the Science stream with Biology and Chemistry",
        description:
          "A strong foundation in biology and chemistry is essential, with mathematics helpful for data analysis.",
        subjects: [
          "Biology",
          "Chemistry",
          "Physics",
          "Mathematics (recommended)",
        ],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Pursue B.Sc or B.Tech in Biotechnology",
        description:
          "Degree programs cover molecular biology, genetics, microbiology, and biochemical engineering.",
        subjects: [
          "Molecular Biology",
          "Genetics",
          "Microbiology",
          "Biochemistry",
        ],
        exams: ["CUET", "JEE Main (for B.Tech route)"],
      },
      {
        stage: "Undergraduate (Years 2-4)",
        title: "Gain lab research experience",
        description:
          "Internships in research labs, pharmaceutical companies, or agricultural institutes build practical research skills.",
        subjects: ["Bioinformatics", "Lab Techniques", "Research Projects"],
        exams: [],
      },
      {
        stage: "Postgraduate / Specialization",
        title: "Pursue M.Sc or PhD for advanced research roles",
        description:
          "A master's degree or doctorate is typically required for independent research positions in academia or industry.",
        subjects: [
          "Advanced Genetics",
          "Genomics",
          "Specialized Research Topics",
        ],
        exams: ["CSIR-NET", "GATE"],
      },
    ],
    resources: [
      {
        name: "Introduction to Biotechnology (NPTEL)",
        url: "https://nptel.ac.in",
        type: "course",
      },
      {
        name: "Molecular Biology of the Cell",
        url: "https://www.garlandscience.com",
        type: "book",
      },
    ],
    icon: "microscope",
    color: "#22C55E",
    tier: "B",
  },
  {
    title: "Pharmacist",
    shortDescription:
      "Dispense medications and advise patients on safe and effective drug use.",
    description:
      "Pharmacists ensure the safe dispensing of medications, counsel patients on usage and side effects, and may work in retail pharmacies, hospitals, or pharmaceutical companies.",
    brainType: ["MODERATE_LEFT", "BALANCED"],
    matchPercentage: 82,
    category: "Healthcare",
    relevantStreams: ["SCIENCE"],
    requiredSkills: [
      "Pharmacology",
      "Chemistry",
      "Attention to Detail",
      "Patient Communication",
      "Regulatory Knowledge",
    ],
    averageSalary: "$50,000 - $100,000 (varies by region and sector)",
    growthRate:
      "Stable demand across retail, hospital, and pharmaceutical sectors",
    futureScope:
      "Pharmacists play an expanding role in patient care, including medication management and immunization services. Growth in the pharmaceutical industry and personalized medicine continues to create opportunities in research and regulatory roles as well.",
    keyExams: ["State CET (Pharmacy)", "GPAT (for postgraduate study)"],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose the Science stream with Biology or Mathematics",
        description:
          "Physics, Chemistry, and either Biology or Mathematics are typically required for pharmacy admissions.",
        subjects: ["Physics", "Chemistry", "Biology/Mathematics"],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Pursue a B.Pharm degree",
        description:
          "A 4-year Bachelor of Pharmacy program covering pharmaceutical chemistry, pharmacology, and pharmacy practice.",
        subjects: [
          "Pharmaceutics",
          "Pharmacology",
          "Pharmaceutical Chemistry",
          "Pharmacy Practice",
        ],
        exams: ["State CET (Pharmacy)"],
      },
      {
        stage: "Undergraduate (Years 2-4)",
        title: "Complete internships in hospital or retail pharmacy settings",
        description:
          "Practical training builds skills in dispensing, patient counseling, and pharmacy operations.",
        subjects: ["Clinical Pharmacy", "Hospital Pharmacy Practice"],
        exams: [],
      },
      {
        stage: "Postgraduate / Specialization (optional)",
        title: "Pursue M.Pharm for research or specialized roles",
        description:
          "A master's degree opens doors to drug research, regulatory affairs, or academic positions.",
        subjects: [
          "Pharmaceutical Analysis",
          "Drug Regulatory Affairs",
          "Clinical Research",
        ],
        exams: ["GPAT"],
      },
    ],
    resources: [
      {
        name: "Pharmacology Made Easy",
        url: "https://www.elsevier.com",
        type: "book",
      },
      {
        name: "Pharmacy Practice Basics (NPTEL)",
        url: "https://nptel.ac.in",
        type: "course",
      },
    ],
    icon: "pill",
    color: "#14B8A6",
    tier: "B",
  },
];

module.exports = healthcareAndScienceCareers;
