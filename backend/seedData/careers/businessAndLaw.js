// Business & Finance and Law & Public Service careers for seeding

const businessAndLawCareers = [
  {
    title: "Chartered Accountant",
    shortDescription:
      "Manage finances, audits, and tax compliance for businesses and individuals.",
    description:
      "Chartered Accountants handle financial reporting, auditing, taxation, and business advisory services. The qualification is highly respected and offers strong career stability across industries.",
    brainType: ["STRONG_LEFT", "MODERATE_LEFT"],
    matchPercentage: 89,
    category: "Business & Finance",
    relevantStreams: ["COMMERCE", "SCIENCE"],
    requiredSkills: [
      "Accounting",
      "Taxation",
      "Auditing",
      "Financial Analysis",
      "Regulatory Compliance",
    ],
    averageSalary:
      "$50,000 - $150,000 (varies by region, firm size and experience)",
    growthRate: "Stable, high demand across all business sectors",
    futureScope:
      "Accounting and finance professionals remain essential as businesses navigate increasingly complex regulations. While automation handles routine bookkeeping, advisory, audit, and strategic finance roles continue to grow, especially for those who add data analysis skills.",
    keyExams: ["CA Foundation", "CA Intermediate", "CA Final (ICAI)"],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose the Commerce stream",
        description:
          "Commerce with Accountancy, Economics, and Mathematics (or Business Studies) builds the right foundation.",
        subjects: [
          "Accountancy",
          "Economics",
          "Business Studies",
          "Mathematics (recommended)",
        ],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Register for the CA Foundation course",
        description:
          "Students can register with the Institute of Chartered Accountants (ICAI) after 12th and begin preparing for the Foundation exam.",
        subjects: [
          "Accounting",
          "Business Laws",
          "Quantitative Aptitude",
          "Business Economics",
        ],
        exams: ["CA Foundation"],
      },
      {
        stage: "Intermediate Level",
        title: "Clear CA Intermediate and begin Articleship",
        description:
          "A 3-year practical training (articleship) under a practicing CA runs alongside the Intermediate and Final levels.",
        subjects: [
          "Advanced Accounting",
          "Auditing",
          "Taxation",
          "Cost Management",
        ],
        exams: ["CA Intermediate"],
      },
      {
        stage: "Final Level",
        title: "Clear CA Final to become a Chartered Accountant",
        description:
          "After completing articleship and clearing the Final exams, candidates become qualified Chartered Accountants.",
        subjects: [
          "Strategic Financial Management",
          "Advanced Auditing",
          "Direct and Indirect Tax Laws",
        ],
        exams: ["CA Final"],
      },
    ],
    resources: [
      {
        name: "ICAI Study Materials",
        url: "https://www.icai.org",
        type: "article",
      },
      {
        name: "Financial Accounting Fundamentals",
        url: "https://www.coursera.org",
        type: "course",
      },
    ],
    icon: "calculator",
    color: "#F59E0B",
    tier: "S",
  },
  {
    title: "Investment Banker / Financial Analyst",
    shortDescription:
      "Analyze markets and manage capital for corporations, investors, and institutions.",
    description:
      "Financial analysts and investment bankers evaluate investment opportunities, manage portfolios, and advise on mergers, acquisitions, and capital raising for businesses and institutions.",
    brainType: ["STRONG_LEFT", "MODERATE_LEFT"],
    matchPercentage: 86,
    category: "Business & Finance",
    relevantStreams: ["COMMERCE", "SCIENCE"],
    requiredSkills: [
      "Financial Modeling",
      "Valuation",
      "Excel",
      "Market Analysis",
      "Communication",
    ],
    averageSalary: "$65,000 - $200,000+ (varies widely by role and region)",
    growthRate:
      "Stable in core finance, with growth in fintech and quantitative roles",
    futureScope:
      "While some routine analysis is being automated, roles requiring judgment, client relationships, and complex deal-making remain strong. Growth in fintech, sustainable finance, and quantitative investing offer new directions for finance professionals.",
    keyExams: ["CUET", "CFA (post-graduation)", "CAT (for MBA route)"],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose the Commerce stream with Mathematics",
        description:
          "Mathematics is highly recommended for quantitative finance roles.",
        subjects: [
          "Accountancy",
          "Economics",
          "Mathematics",
          "Business Studies",
        ],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Pursue a B.Com, BBA, or Economics degree",
        description:
          "A bachelor's degree in commerce, business administration, or economics builds the analytical foundation.",
        subjects: [
          "Corporate Finance",
          "Economics",
          "Statistics",
          "Accounting",
        ],
        exams: ["CUET"],
      },
      {
        stage: "Undergraduate (Years 2-4)",
        title: "Build financial modeling skills and gain internships",
        description:
          "Internships at banks, financial firms, or startups provide exposure to real-world financial analysis.",
        subjects: [
          "Financial Modeling",
          "Valuation Techniques",
          "Capital Markets",
        ],
        exams: [],
      },
      {
        stage: "Postgraduate / Specialization",
        title: "Pursue an MBA in Finance or CFA certification",
        description:
          "An MBA from a top business school or the CFA charter significantly strengthens prospects for senior finance roles.",
        subjects: [
          "Advanced Corporate Finance",
          "Portfolio Management",
          "Investment Analysis",
        ],
        exams: ["CAT", "CFA Level 1-3"],
      },
    ],
    resources: [
      {
        name: "CFA Institute Curriculum Overview",
        url: "https://www.cfainstitute.org",
        type: "article",
      },
      {
        name: "Financial Modeling and Valuation",
        url: "https://www.coursera.org",
        type: "course",
      },
    ],
    icon: "trending-up",
    color: "#10B981",
    tier: "A",
  },
  {
    title: "Lawyer / Legal Professional",
    shortDescription:
      "Advise, represent, and advocate for clients across legal matters and disputes.",
    description:
      "Lawyers provide legal advice, draft contracts, represent clients in court, and ensure compliance with laws and regulations across corporate, criminal, civil, and other legal domains.",
    brainType: ["MODERATE_LEFT", "BALANCED", "MODERATE_RIGHT"],
    matchPercentage: 88,
    category: "Law & Public Service",
    relevantStreams: ["ARTS", "COMMERCE", "SCIENCE"],
    requiredSkills: [
      "Legal Research",
      "Argumentation",
      "Writing",
      "Negotiation",
      "Critical Thinking",
    ],
    averageSalary:
      "$55,000 - $180,000+ (varies widely by specialization and region)",
    growthRate:
      "Stable, with growing demand in corporate law, technology law, and intellectual property",
    futureScope:
      "While AI tools assist with research and document review, the need for human judgment, advocacy, and negotiation keeps legal professionals essential. Emerging areas like technology law, data privacy, and intellectual property are expanding fields.",
    keyExams: ["CLAT", "AILET", "State Law Entrance Exams"],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose any stream (Arts, Commerce, or Science)",
        description:
          "Law is accessible from any stream; Arts/Humanities with subjects like Political Science, History, and English builds strong foundational skills.",
        subjects: [
          "English",
          "Political Science (recommended)",
          "History (recommended)",
        ],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Pursue an integrated 5-year law degree (BA LLB / BBA LLB)",
        description:
          "Integrated programs combine an undergraduate degree with law, accessed through national or state law entrance exams.",
        subjects: [
          "Constitutional Law",
          "Contract Law",
          "Legal Methods",
          "Jurisprudence",
        ],
        exams: ["CLAT", "AILET"],
      },
      {
        stage: "Undergraduate (Years 2-5)",
        title: "Gain experience through moot courts and internships",
        description:
          "Participating in moot court competitions and interning at law firms or with practicing advocates builds practical advocacy skills.",
        subjects: ["Criminal Law", "Corporate Law", "Procedural Law"],
        exams: [],
      },
      {
        stage: "Postgraduate / Specialization (optional)",
        title: "Pursue LLM for specialization or academia",
        description:
          "A master's in law allows specialization in areas such as corporate law, intellectual property, or international law.",
        subjects: ["Specialized Legal Domains"],
        exams: ["CLAT PG"],
      },
    ],
    resources: [
      {
        name: "CLAT Preparation Resources",
        url: "https://consortiumofnlus.ac.in",
        type: "article",
      },
      {
        name: "Introduction to Indian Constitutional Law",
        url: "https://www.coursera.org",
        type: "course",
      },
    ],
    icon: "scale",
    color: "#7C3AED",
    tier: "A",
  },
  {
    title: "Civil Services Officer (IAS/IPS/IFS)",
    shortDescription:
      "Serve in administrative, police, or foreign service roles shaping public policy.",
    description:
      "Civil services officers work in administrative, police, or diplomatic roles, implementing government policy, managing public services, and serving communities at district, state, or national levels.",
    brainType: ["BALANCED", "MODERATE_LEFT", "MODERATE_RIGHT"],
    matchPercentage: 90,
    category: "Law & Public Service",
    relevantStreams: ["ARTS", "COMMERCE", "SCIENCE"],
    requiredSkills: [
      "General Knowledge",
      "Analytical Writing",
      "Public Administration",
      "Leadership",
      "Communication",
    ],
    averageSalary:
      "Government pay scale with significant benefits and job security",
    growthRate:
      "Highly competitive but consistently in demand for public administration roles",
    futureScope:
      "Civil services remain a respected and stable career path with opportunities to influence public policy at scale. Reforms in governance, digital administration, and policy-making continue to evolve the nature of these roles.",
    keyExams: [
      "UPSC Civil Services Examination",
      "State Public Service Commission Exams",
    ],
    roadmap: [
      {
        stage: "After 10th",
        title: "Choose any stream based on interest",
        description:
          "Civil services are open to graduates of any discipline; choose a stream aligned with personal interest and strengths.",
        subjects: ["Any combination based on interest"],
        exams: [],
      },
      {
        stage: "After 12th",
        title: "Pursue any bachelor's degree",
        description:
          "A bachelor's degree in any discipline is the minimum requirement; subjects like History, Political Science, Economics, Geography, or Public Administration are commonly chosen as optional subjects later.",
        subjects: ["Subject of choice for degree"],
        exams: [],
      },
      {
        stage: "Undergraduate / Graduate",
        title: "Begin UPSC preparation alongside or after graduation",
        description:
          "Preparation typically includes building general knowledge, current affairs awareness, and practicing for the prelims, mains, and interview stages.",
        subjects: [
          "General Studies",
          "Optional Subject",
          "Essay Writing",
          "Current Affairs",
        ],
        exams: ["UPSC Prelims"],
      },
      {
        stage: "Examination & Training",
        title: "Clear Prelims, Mains, and Interview; attend academy training",
        description:
          "Successful candidates undergo foundational and service-specific training at national academies before being posted to their roles.",
        subjects: ["Service-specific Training"],
        exams: ["UPSC Mains", "UPSC Interview"],
      },
    ],
    resources: [
      {
        name: "UPSC Syllabus and Notifications",
        url: "https://upsc.gov.in",
        type: "article",
      },
      {
        name: "Indian Polity by M. Laxmikanth",
        url: "https://www.mheducation.co.in",
        type: "book",
      },
    ],
    icon: "landmark",
    color: "#0369A1",
    tier: "S",
  },
];

module.exports = businessAndLawCareers;
