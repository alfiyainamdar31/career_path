import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Subject recommendations by brain type
const SUBJECT_RECOMMENDATIONS = {
  STRONG_LEFT: {
    label: "Left Brain Dominant",
    subjects: [
      {
        name: "Mathematics",
        reason: "Algebra, Calculus, Statistics",
        icon: "📐",
        priority: "Essential",
      },
      {
        name: "Physics",
        reason: "Mechanics, Thermodynamics, Optics",
        icon: "⚛️",
        priority: "Essential",
      },
      {
        name: "Computer Science",
        reason: "Algorithms, Data Structures",
        icon: "💻",
        priority: "Essential",
      },
      {
        name: "Chemistry",
        reason: "Analytical and Physical Chemistry",
        icon: "🧪",
        priority: "Recommended",
      },
      {
        name: "Economics",
        reason: "Micro & Macroeconomics, Econometrics",
        icon: "📊",
        priority: "Recommended",
      },
      {
        name: "Logic & Philosophy",
        reason: "Formal Logic, Critical Thinking",
        icon: "🔍",
        priority: "Optional",
      },
    ],
    streams: ["Science (PCM)", "Engineering", "Commerce with Maths"],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Data Analytics Certificate",
      "CFA Level 1",
    ],
  },
  MODERATE_LEFT: {
    label: "Moderate Left Brain",
    subjects: [
      {
        name: "Mathematics",
        reason: "Statistics, Applied Math",
        icon: "📐",
        priority: "Essential",
      },
      {
        name: "Computer Science",
        reason: "Programming, Web Development",
        icon: "💻",
        priority: "Essential",
      },
      {
        name: "Business Studies",
        reason: "Management, Finance",
        icon: "💼",
        priority: "Recommended",
      },
      {
        name: "Physics",
        reason: "Applied Physics",
        icon: "⚛️",
        priority: "Recommended",
      },
      {
        name: "Psychology",
        reason: "Cognitive Psychology, Research Methods",
        icon: "🧠",
        priority: "Optional",
      },
      {
        name: "English",
        reason: "Technical Writing, Communication",
        icon: "📝",
        priority: "Recommended",
      },
    ],
    streams: ["Science (PCM)", "Commerce with Maths", "BBA/BCA"],
    certifications: [
      "Google Project Management Certificate",
      "Scrum Master (PSM I)",
      "Python for Everybody",
    ],
  },
  BALANCED: {
    label: "Balanced Brain",
    subjects: [
      {
        name: "Business Studies",
        reason: "Strategy, Operations, Marketing",
        icon: "💼",
        priority: "Essential",
      },
      {
        name: "Psychology",
        reason: "Behavioral Science, UX Research",
        icon: "🧠",
        priority: "Essential",
      },
      {
        name: "Design",
        reason: "Visual Communication, UX/UI",
        icon: "🎨",
        priority: "Recommended",
      },
      {
        name: "Computer Science",
        reason: "Programming basics, Digital Tools",
        icon: "💻",
        priority: "Recommended",
      },
      {
        name: "Economics",
        reason: "Business Economics",
        icon: "📊",
        priority: "Recommended",
      },
      {
        name: "Communication",
        reason: "Public Speaking, Writing",
        icon: "💬",
        priority: "Optional",
      },
    ],
    streams: [
      "Commerce (with/without Maths)",
      "Humanities",
      "BBA",
      "Mass Communication",
    ],
    certifications: [
      "Google UX Design Certificate",
      "Product Management (Product School)",
      "HubSpot Marketing",
    ],
  },
  MODERATE_RIGHT: {
    label: "Moderate Right Brain",
    subjects: [
      {
        name: "Design & Visual Arts",
        reason: "Graphic Design, Typography",
        icon: "🎨",
        priority: "Essential",
      },
      {
        name: "Psychology",
        reason: "Consumer Behavior, Social Psychology",
        icon: "🧠",
        priority: "Essential",
      },
      {
        name: "English Literature",
        reason: "Creative Writing, Storytelling",
        icon: "📚",
        priority: "Essential",
      },
      {
        name: "Marketing",
        reason: "Brand Strategy, Digital Marketing",
        icon: "📣",
        priority: "Recommended",
      },
      {
        name: "Media Studies",
        reason: "Film, Journalism, Content Creation",
        icon: "🎬",
        priority: "Recommended",
      },
      {
        name: "Sociology",
        reason: "Social trends, Cultural Analysis",
        icon: "🌐",
        priority: "Optional",
      },
    ],
    streams: [
      "Humanities/Arts",
      "Mass Communication",
      "Fine Arts",
      "BA Psychology",
    ],
    certifications: [
      "Adobe Certified Professional",
      "Google Digital Marketing Certificate",
      "Coursera UX Design",
    ],
  },
  STRONG_RIGHT: {
    label: "Strong Right Brain",
    subjects: [
      {
        name: "Fine Arts & Design",
        reason: "Illustration, Concept Art, Branding",
        icon: "🎨",
        priority: "Essential",
      },
      {
        name: "English Literature",
        reason: "Narrative, Creative Writing",
        icon: "📚",
        priority: "Essential",
      },
      {
        name: "Media & Film Studies",
        reason: "Cinematography, Storytelling",
        icon: "🎬",
        priority: "Essential",
      },
      {
        name: "Music",
        reason: "Theory, Composition, Production",
        icon: "🎵",
        priority: "Recommended",
      },
      {
        name: "Architecture",
        reason: "Spatial Design, Aesthetics",
        icon: "🏛️",
        priority: "Recommended",
      },
      {
        name: "Philosophy",
        reason: "Ethics, Aesthetics, Critical Thought",
        icon: "💭",
        priority: "Optional",
      },
    ],
    streams: [
      "Fine Arts",
      "Architecture",
      "Mass Communication",
      "Humanities/Liberal Arts",
    ],
    certifications: [
      "Adobe Creative Suite Certification",
      "Motion Design (School of Motion)",
      "Film Direction Diploma",
    ],
  },
};

const priorityColors = {
  Essential: { bg: "#ecfdf5", text: "#065f46", border: "#6ee7b7" },
  Recommended: { bg: "#eff6ff", text: "#1e40af", border: "#93c5fd" },
  Optional: { bg: "#f5f3ff", text: "#4c1d95", border: "#c4b5fd" },
};

const dominanceConfig = {
  STRONG_LEFT: {
    label: "Strong Left Brain",
    color: "var(--left-brain)",
    emoji: "🔬",
  },
  MODERATE_LEFT: {
    label: "Moderate Left Brain",
    color: "#818cf8",
    emoji: "🧮",
  },
  BALANCED: { label: "Balanced Brain", color: "var(--balanced)", emoji: "⚖️" },
  MODERATE_RIGHT: {
    label: "Moderate Right Brain",
    color: "#fb923c",
    emoji: "🎭",
  },
  STRONG_RIGHT: {
    label: "Strong Right Brain",
    color: "var(--right-brain)",
    emoji: "🎨",
  },
};

const dominanceMessages = {
  STRONG_LEFT:
    "You're a logical powerhouse. You thrive on structure, data, and systematic problem-solving. Engineering, finance, and data science are your natural habitats.",
  MODERATE_LEFT:
    "You lean analytical but retain creative flexibility. You're built for roles that blend logic with communication — product management, development, and consulting.",
  BALANCED:
    "You're a rare hybrid thinker who can move between analytical and creative modes. Product management, UX design, and consulting are natural fits.",
  MODERATE_RIGHT:
    "You think creatively but appreciate structure. Marketing, content strategy, and people-centric roles let you use your natural strengths.",
  STRONG_RIGHT:
    "You're a creative visionary. Your brain excels at big-picture thinking, aesthetics, and innovation. Design, art direction, and media are your calling.",
};

const Results = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState("careers");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("/quiz/results");
      setResults(res.data.results);
    } catch (error) {
      toast.error("Failed to load results. Please take the quiz first.");
      navigate("/quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    setProcessingPayment(true);
    try {
      const res = await axios.post("/payment/create-checkout-session");
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
      }
    } catch (error) {
      toast.error("Payment setup failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleShare = () => {
    const text = `My brain is ${results?.dominance?.replace(
      /_/g,
      " ",
    )}! I used NeuroCareers to discover my ideal career path. 🧠`;
    if (navigator.share) {
      navigator.share({
        title: "My Brain Career Results",
        text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          gap: "1rem",
        }}
      >
        <div className="spinner" />
        <p style={{ color: "var(--text-muted)" }}>Loading your results...</p>
      </div>
    );
  }

  const config = dominanceConfig[results.dominance] || dominanceConfig.BALANCED;
  const subjectData =
    SUBJECT_RECOMMENDATIONS[results.dominance] ||
    SUBJECT_RECOMMENDATIONS.BALANCED;

  const tabs = [
    { id: "careers", label: "Career Matches" },
    { id: "subjects", label: "Subject Roadmap" },
    { id: "analysis", label: "Brain Analysis" },
  ];

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", paddingBottom: "4rem" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", padding: "2.5rem 0 2rem" }}
      >
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
          {config.emoji}
        </div>
        <div
          className="section-tag"
          style={{ borderColor: `${config.color}30`, color: config.color }}
        >
          Brain Dominance Result
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: config.color,
            margin: "0.75rem 0 1rem",
          }}
        >
          {config.label}
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto 1.5rem",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          {dominanceMessages[results.dominance]}
        </p>

        {/* Score pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #93c5fd",
              borderRadius: "999px",
              padding: "0.5rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--left-brain)",
              }}
            />
            <span
              style={{ color: "#1e40af", fontWeight: 600, fontSize: "0.88rem" }}
            >
              Left Brain: {results.leftScore}%
            </span>
          </div>
          <div
            style={{
              background: "#fff7ed",
              border: "1px solid #fcd34d",
              borderRadius: "999px",
              padding: "0.5rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--right-brain)",
              }}
            />
            <span
              style={{ color: "#92400e", fontWeight: 600, fontSize: "0.88rem" }}
            >
              Right Brain: {results.rightScore}%
            </span>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}
        >
          <button
            onClick={handleShare}
            className="btn-secondary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
          >
            📤 Share Results
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="btn-secondary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
          >
            🔄 Retake Quiz
          </button>
        </div>
      </motion.div>

      {/* Brain bar visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass"
        style={{ padding: "1.25rem 1.5rem", marginBottom: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            height: "20px",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${results.leftScore}%`,
              background: "var(--left-brain)",
              transition: "width 1s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "8px",
            }}
          >
            {results.leftScore > 20 && (
              <span
                style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}
              >
                {results.leftScore}%
              </span>
            )}
          </div>
          <div
            style={{
              width: `${results.rightScore}%`,
              background: "var(--right-brain)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "8px",
            }}
          >
            {results.rightScore > 20 && (
              <span
                style={{ color: "white", fontSize: "0.7rem", fontWeight: 700 }}
              >
                {results.rightScore}%
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <span>🧠 Left: Logical · Analytical · Structured</span>
          <span>Creative · Intuitive · Visual: Right 🎨</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.35rem",
          marginBottom: "1.5rem",
          padding: "0.35rem",
          background: "var(--bg-surface-2)",
          borderRadius: "var(--radius-md)",
          width: "fit-content",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background:
                activeTab === tab.id ? "var(--bg-surface)" : "transparent",
              color:
                activeTab === tab.id
                  ? "var(--accent-primary)"
                  : "var(--text-muted)",
              fontWeight: activeTab === tab.id ? 600 : 500,
              fontSize: "0.88rem",
              cursor: "pointer",
              fontFamily: "var(--font-primary)",
              boxShadow: activeTab === tab.id ? "var(--shadow-sm)" : "none",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "careers" && (
          <motion.div
            key="careers"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                marginBottom: "1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                🎯 Your Career Priority List
              </h2>
              {!results.isPremium && (
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                >
                  Showing {results.careers?.length || 0} of 10+ matches
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {(results.careers || []).map((career, i) => (
                <CareerCard
                  key={career.careerId?._id || i}
                  career={career}
                  rank={i + 1}
                  isPremium={results.isPremium}
                />
              ))}
            </div>

            {/* Premium Unlock */}
            {!results.isPremium && (
              <PremiumUpgrade
                onUpgrade={handleUpgrade}
                processing={processingPayment}
              />
            )}
          </motion.div>
        )}

        {activeTab === "subjects" && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <SubjectRoadmap
              data={subjectData}
              isPremium={results.isPremium}
              onUpgrade={handleUpgrade}
              processing={processingPayment}
            />
          </motion.div>
        )}

        {activeTab === "analysis" && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <BrainAnalysis results={results} config={config} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CareerCard = ({ career, rank, isPremium }) => {
  const [expanded, setExpanded] = useState(rank <= 2);
  const tierClass =
    { S: "tier-s", A: "tier-a", B: "tier-b", C: "tier-c" }[career.tier] ||
    "tier-b";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.06 }}
      className="glass card-hover"
      style={{ padding: "1.5rem", cursor: "pointer" }}
      onClick={() => setExpanded(!expanded)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            flex: 1,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: career.color
                ? `${career.color}15`
                : "var(--bg-surface-2)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            {career.icon || "💼"}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: "0.25rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "var(--text-muted)",
                  minWidth: "20px",
                }}
              >
                #{rank}
              </span>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                {career.title}
              </h3>
              {rank === 1 && (
                <span
                  style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.55rem",
                    borderRadius: "999px",
                    border: "1px solid #fcd34d",
                  }}
                >
                  🏆 Best Match
                </span>
              )}
              <span className={`tier-badge ${tierClass}`}>
                {career.tier || "B"}-Tier
              </span>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.85rem",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {career.description}
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: career.color || "var(--accent-primary)",
              fontFamily: "var(--font-display)",
            }}
          >
            {career.matchScore}%
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            match
          </div>
          <div
            className="match-bar"
            style={{ width: "60px", marginLeft: "auto" }}
          >
            <div
              className="match-bar-fill"
              style={{ width: `${career.matchScore}%` }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingTop: "1.25rem",
                marginTop: "1.25rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                {career.averageSalary && (
                  <span
                    style={{
                      background: "#ecfdf5",
                      color: "#065f46",
                      border: "1px solid #6ee7b7",
                      borderRadius: "999px",
                      padding: "0.3rem 0.85rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    💰 {career.averageSalary}
                  </span>
                )}
                {career.growthRate && (
                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#1e40af",
                      border: "1px solid #93c5fd",
                      borderRadius: "999px",
                      padding: "0.3rem 0.85rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    📈 {career.growthRate}
                  </span>
                )}
              </div>

              {career.requiredSkills?.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Skills to develop
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {career.requiredSkills.map((s, i) => (
                      <span key={i} className="skill-badge">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {career.resources?.length > 0 && isPremium && (
                <div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Learning resources
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {career.resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {r.type === "course"
                          ? "📖"
                          : r.type === "book"
                          ? "📚"
                          : "🎥"}{" "}
                        {r.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SubjectRoadmap = ({ data, isPremium, onUpgrade, processing }) => (
  <div>
    <div style={{ marginBottom: "1.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        🎓 Recommended Subject Roadmap
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
        Based on your <strong>{data.label}</strong> profile, here's what to
        study:
      </p>
    </div>

    {/* Recommended streams */}
    <div
      className="glass"
      style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "0.75rem",
        }}
      >
        Recommended Academic Streams
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {data.streams.map((s, i) => (
          <span
            key={i}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "1.5px solid var(--accent-primary)",
              color: "var(--accent-primary)",
              fontSize: "0.85rem",
              fontWeight: 600,
              background: "var(--bg-surface-2)",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>

    {/* Subject list */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      {data.subjects.map((subj, i) => {
        const pc = priorityColors[subj.priority];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass"
            style={{
              padding: "1.1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}
            >
              <span style={{ fontSize: "1.4rem" }}>{subj.icon}</span>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontSize: "0.95rem",
                  }}
                >
                  {subj.name}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                  {subj.reason}
                </div>
              </div>
            </div>
            <span
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                background: pc.bg,
                color: pc.text,
                border: `1px solid ${pc.border}`,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {subj.priority}
            </span>
          </motion.div>
        );
      })}
    </div>

    {/* Certifications */}
    <div
      className="glass"
      style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "0.85rem",
        }}
      >
        🏅 Industry Certifications to Target
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {data.certifications.map((cert, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "0.88rem",
              color: "var(--text-secondary)",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent-primary)",
                flexShrink: 0,
              }}
            />
            {cert}
          </div>
        ))}
      </div>
    </div>

    {!isPremium && (
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔓</div>
        <div
          style={{
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Unlock Full Subject Roadmap
        </div>
        <div
          style={{
            color: "var(--text-muted)",
            fontSize: "0.88rem",
            marginBottom: "1.25rem",
          }}
        >
          Get a detailed week-by-week study plan, textbook recommendations, and
          a personalized learning timeline with Premium.
        </div>
        <button
          onClick={onUpgrade}
          disabled={processing}
          className="btn-premium"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          {processing ? "Processing..." : "Upgrade to Premium — $9.99 once"}
        </button>
      </div>
    )}
  </div>
);

const BrainAnalysis = ({ results, config }) => {
  const traits = {
    STRONG_LEFT: [
      { label: "Analytical Thinking", score: 95 },
      { label: "Logical Reasoning", score: 92 },
      { label: "Mathematical Aptitude", score: 88 },
      { label: "Sequential Processing", score: 90 },
      { label: "Creative Thinking", score: 45 },
      { label: "Emotional Intuition", score: 40 },
    ],
    MODERATE_LEFT: [
      { label: "Analytical Thinking", score: 78 },
      { label: "Logical Reasoning", score: 74 },
      { label: "Mathematical Aptitude", score: 70 },
      { label: "Creative Thinking", score: 60 },
      { label: "Communication", score: 72 },
      { label: "Adaptability", score: 68 },
    ],
    BALANCED: [
      { label: "Analytical Thinking", score: 72 },
      { label: "Creative Thinking", score: 74 },
      { label: "Communication", score: 80 },
      { label: "Problem Solving", score: 76 },
      { label: "Emotional Intelligence", score: 75 },
      { label: "Strategic Thinking", score: 78 },
    ],
    MODERATE_RIGHT: [
      { label: "Creative Thinking", score: 78 },
      { label: "Intuitive Reasoning", score: 76 },
      { label: "Visual Thinking", score: 80 },
      { label: "Analytical Thinking", score: 60 },
      { label: "Communication", score: 82 },
      { label: "Empathy & Social", score: 78 },
    ],
    STRONG_RIGHT: [
      { label: "Creative Thinking", score: 96 },
      { label: "Visual Thinking", score: 94 },
      { label: "Intuitive Reasoning", score: 90 },
      { label: "Emotional Intelligence", score: 88 },
      { label: "Innovation", score: 92 },
      { label: "Analytical Thinking", score: 42 },
    ],
  };

  const myTraits = traits[results.dominance] || traits.BALANCED;

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "1.5rem",
        }}
      >
        🧠 Your Cognitive Profile
      </h2>

      <div
        className="glass"
        style={{ padding: "1.5rem", marginBottom: "1.5rem" }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "1.25rem",
          }}
        >
          Cognitive Strength Map
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {myTraits.map((trait, i) => (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {trait.label}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color:
                      trait.score >= 75 ? config.color : "var(--text-muted)",
                  }}
                >
                  {trait.score}%
                </span>
              </div>
              <div className="progress-track" style={{ height: "8px" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trait.score}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    height: "100%",
                    borderRadius: "999px",
                    background:
                      trait.score >= 75 ? config.color : "var(--bg-surface-3)",
                    backgroundImage:
                      trait.score >= 75
                        ? `linear-gradient(90deg, ${config.color}aa, ${config.color})`
                        : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal work environment */}
      <div className="glass" style={{ padding: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "1rem",
          }}
        >
          Your Ideal Work Environment
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {[
            results.dominance.includes("LEFT")
              ? "Structured & Deadline-Driven"
              : "Flexible & Open",
            results.dominance === "BALANCED"
              ? "Collaborative Teams"
              : results.dominance.includes("LEFT")
              ? "Independent Work"
              : "Creative Studios",
            results.dominance.includes("LEFT")
              ? "Data-Rich Environments"
              : "Visually Inspiring Spaces",
            "Growth-Oriented Culture",
          ].map((env, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-surface-2)",
                borderRadius: "var(--radius-sm)",
                padding: "0.65rem 0.85rem",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: config.color,
                  flexShrink: 0,
                }}
              />
              {env}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PremiumUpgrade = ({ onUpgrade, processing }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      background: "linear-gradient(135deg, #fffbeb, #fff7ed)",
      border: "2px solid #fcd34d",
      borderRadius: "var(--radius-xl)",
      padding: "2.5rem",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>💎</div>
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#92400e",
        marginBottom: "0.75rem",
      }}
    >
      Unlock Your Complete Career Roadmap
    </h3>
    <p
      style={{
        color: "#b45309",
        fontSize: "0.92rem",
        maxWidth: "480px",
        margin: "0 auto 2rem",
        lineHeight: 1.7,
      }}
    >
      You're seeing 3 of 10+ career matches. Upgrade once for lifetime access to
      everything.
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
        maxWidth: "600px",
        margin: "0 auto 2rem",
      }}
    >
      {[
        { icon: "🎯", title: "10+ Career Matches", desc: "Full ranked list" },
        {
          icon: "📚",
          title: "Learning Resources",
          desc: "Curated courses & books",
        },
        { icon: "🗺️", title: "Study Roadmap", desc: "Week-by-week plan" },
        { icon: "📊", title: "Skill Gap Analysis", desc: "Know what to learn" },
      ].map((f, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.7)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            border: "1px solid #fde68a",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>
            {f.icon}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#92400e",
              marginBottom: "0.2rem",
            }}
          >
            {f.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#b45309" }}>{f.desc}</div>
        </div>
      ))}
    </div>

    <button
      onClick={onUpgrade}
      disabled={processing}
      className="btn-premium"
      style={{ fontSize: "1rem", padding: "1rem 3rem" }}
    >
      {processing ? (
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            className="spinner"
            style={{ width: "18px", height: "18px", borderWidth: "2px" }}
          />
          Redirecting to payment...
        </span>
      ) : (
        "Unlock Premium — $9.99 (One-time)"
      )}
    </button>
    <p style={{ fontSize: "0.78rem", color: "#b45309", marginTop: "0.75rem" }}>
      ✓ Secure payment via Stripe &nbsp;·&nbsp; ✓ Lifetime access &nbsp;·&nbsp;
      ✓ 30-day money-back guarantee
    </p>
  </motion.div>
);

export default Results;
