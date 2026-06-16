// Quiz question bank.
// "applicableLevels" controls which academic groups see a question:
//   SSC_10TH  - students who have not yet chosen a stream
//   HSC_12TH  - students who have already chosen Science/Commerce/Arts
//   GRADUATE  - students in or past undergraduate study
//   OTHER     - anyone else exploring career options
//
// Categories: problem_solving, communication, work_style, personal,
// interest, aptitude

const questions = [
  // ---- Shared brain-dominance questions (all levels) ----
  {
    text: "When facing a complex problem, you typically:",
    options: [
      { text: "Break it down into smaller logical steps", type: "L" },
      { text: "Look for patterns and big-picture connections", type: "R" },
      { text: "Discuss with others to get multiple perspectives", type: "B" },
      { text: "Trust your gut feeling on the first solution", type: "R" },
    ],
    category: "problem_solving",
    applicableLevels: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
    order: 1,
  },
  {
    text: "Your ideal work or study environment is:",
    options: [
      { text: "Structured, quiet, with clear deadlines", type: "L" },
      { text: "Dynamic, collaborative, open workspace", type: "R" },
      { text: "Flexible, creative, visually inspiring", type: "R" },
      { text: "Organized, process-driven, analytical", type: "L" },
    ],
    category: "work_style",
    applicableLevels: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
    order: 2,
  },
  {
    text: "When learning something new, you prefer:",
    options: [
      { text: "Reading the textbook or notes first", type: "L" },
      { text: "Exploring by trial and error", type: "R" },
      { text: "Watching video tutorials or demonstrations", type: "R" },
      { text: "Taking a structured course with assignments", type: "L" },
    ],
    category: "problem_solving",
    applicableLevels: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
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
    applicableLevels: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
    order: 4,
  },
  {
    text: "In a group discussion or debate, you prefer to:",
    options: [
      { text: "Use facts and data to prove your point", type: "L" },
      { text: "Use stories and analogies to explain", type: "R" },
      { text: "Point out flaws in others' reasoning", type: "L" },
      { text: "Appeal to emotions and shared experiences", type: "R" },
    ],
    category: "communication",
    applicableLevels: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
    order: 5,
  },
  {
    text: "Your notes or class work tend to be:",
    options: [
      { text: "Bulleted lists and outlines", type: "L" },
      { text: "Mind maps with colors and drawings", type: "R" },
      { text: "Dense paragraphs of written text", type: "L" },
      { text: "Sketches and visual diagrams", type: "R" },
    ],
    category: "personal",
    applicableLevels: ["SSC_10TH", "HSC_12TH", "GRADUATE", "OTHER"],
    order: 6,
  },

  // ---- Interest / aptitude questions, more relevant pre-stream (10th) ----
  {
    text: "Which school subject do you enjoy or perform best in?",
    options: [
      { text: "Mathematics and Science", type: "L" },
      { text: "Art, Music, or Craft", type: "R" },
      { text: "Languages, History, or Social Studies", type: "B" },
      { text: "Computer Studies or Information Technology", type: "L" },
    ],
    category: "interest",
    applicableLevels: ["SSC_10TH", "OTHER"],
    order: 7,
  },
  {
    text: "If given a free afternoon, you would most likely:",
    options: [
      {
        text: "Solve puzzles, play strategy games, or code something",
        type: "L",
      },
      { text: "Draw, write stories, or make music", type: "R" },
      { text: "Read about people, places, or current events", type: "B" },
      { text: "Take things apart to see how they work", type: "L" },
    ],
    category: "interest",
    applicableLevels: ["SSC_10TH", "OTHER"],
    order: 8,
  },
  {
    text: "When working on a school project, you usually:",
    options: [
      { text: "Plan it out with a checklist and timeline", type: "L" },
      { text: "Focus on making it look creative and unique", type: "R" },
      { text: "Coordinate with teammates and divide tasks", type: "B" },
      { text: "Research deeply into the topic details", type: "L" },
    ],
    category: "work_style",
    applicableLevels: ["SSC_10TH", "OTHER"],
    order: 9,
  },
  {
    text: "Which statement best describes you?",
    options: [
      { text: "I like experiments, numbers, and logical proofs", type: "L" },
      { text: "I like designing, performing, or expressing ideas", type: "R" },
      { text: "I like helping people and understanding society", type: "B" },
      {
        text: "I like building, fixing, or creating physical things",
        type: "L",
      },
    ],
    category: "aptitude",
    applicableLevels: ["SSC_10TH", "OTHER"],
    order: 10,
  },

  // ---- Stream-aware questions, more relevant post-12th ----
  {
    text: "Which type of college subject excites you most?",
    options: [
      { text: "Calculus, Physics, or core Engineering subjects", type: "L" },
      { text: "Design, Fine Arts, Literature, or Film Studies", type: "R" },
      { text: "Economics, Accounting, or Business Management", type: "B" },
      { text: "Biology, Chemistry, or applied lab sciences", type: "L" },
    ],
    category: "interest",
    applicableLevels: ["HSC_12TH", "GRADUATE"],
    order: 11,
  },
  {
    text: "When thinking about your future career, what matters most?",
    options: [
      { text: "Solving technical or scientific challenges", type: "L" },
      { text: "Creative freedom and self-expression", type: "R" },
      { text: "Working with and helping people directly", type: "B" },
      { text: "Financial growth and business strategy", type: "L" },
    ],
    category: "aptitude",
    applicableLevels: ["HSC_12TH", "GRADUATE", "OTHER"],
    order: 12,
  },
  {
    text: "Which kind of entrance exam preparation sounds most appealing?",
    options: [
      { text: "Engineering or technical entrance exams (e.g. JEE)", type: "L" },
      { text: "Design or creative aptitude exams (e.g. NID, NIFT)", type: "R" },
      { text: "Management or law entrance exams (e.g. CLAT, CUET)", type: "B" },
      { text: "Medical or life-science entrance exams (e.g. NEET)", type: "L" },
    ],
    category: "aptitude",
    applicableLevels: ["HSC_12TH", "GRADUATE"],
    order: 13,
  },
  {
    text: "In a team project at college, you naturally take the role of:",
    options: [
      { text: "The planner who organizes timelines and logic", type: "L" },
      { text: "The creative who designs the visuals or pitch", type: "R" },
      { text: "The communicator who presents and negotiates", type: "B" },
      { text: "The researcher who digs into technical detail", type: "L" },
    ],
    category: "work_style",
    applicableLevels: ["HSC_12TH", "GRADUATE", "OTHER"],
    order: 14,
  },
  {
    text: "Which long-term work style appeals to you most?",
    options: [
      { text: "Deep specialist work in a technical domain", type: "L" },
      { text: "Varied, creative work with new projects often", type: "R" },
      { text: "People-facing work: teaching, consulting, leading", type: "B" },
      { text: "Research-driven work with continuous learning", type: "L" },
    ],
    category: "personal",
    applicableLevels: ["HSC_12TH", "GRADUATE", "OTHER"],
    order: 15,
  },
];

module.exports = questions;
