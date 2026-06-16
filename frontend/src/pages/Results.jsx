import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  RotateCcw,
  Trophy,
  Sparkles,
  Banknote,
  LineChart,
  GraduationCap,
  Map,
  BookMarked,
  Code,
  ScatterChart,
  Settings,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Pill,
  Calculator,
  TrendingUp,
  Scale,
  Landmark,
  Palette,
  Brush,
  Mic,
  BookOpen,
  Brain,
  Rocket,
  Briefcase,
  Compass,
  BarChart3,
} from "lucide-react";

const ICON_MAP = {
  code: Code,
  "chart-dots": ScatterChart,
  settings: Settings,
  "shield-lock": ShieldCheck,
  stethoscope: Stethoscope,
  microscope: Microscope,
  pill: Pill,
  calculator: Calculator,
  "trending-up": TrendingUp,
  scale: Scale,
  landmark: Landmark,
  palette: Palette,
  brush: Brush,
  microphone: Mic,
  "book-open": BookOpen,
  brain: Brain,
  rocket: Rocket,
};

const dominanceConfig = {
  STRONG_LEFT: { label: "Strong Left Brain", color: "var(--left-brain)" },
  MODERATE_LEFT: { label: "Moderate Left Brain", color: "#818cf8" },
  BALANCED: { label: "Balanced Brain", color: "var(--balanced)" },
  MODERATE_RIGHT: { label: "Moderate Right Brain", color: "#fb923c" },
  STRONG_RIGHT: { label: "Strong Right Brain", color: "var(--right-brain)" },
};

const dominanceMessages = {
  STRONG_LEFT:
    "You're a logical powerhouse. You thrive on structure, data, and systematic problem-solving. Engineering, finance, and data science are natural fits.",
  MODERATE_LEFT:
    "You lean analytical but retain creative flexibility. You're built for roles that blend logic with communication, such as product development or analysis.",
  BALANCED:
    "You're a hybrid thinker who can move between analytical and creative modes. Management, design, and consulting roles suit you well.",
  MODERATE_RIGHT:
    "You think creatively but appreciate structure. Marketing, content strategy, and people-centric roles let you use your natural strengths.",
  STRONG_RIGHT:
    "You're a creative visionary. Your brain excels at big-picture thinking, aesthetics, and innovation. Design, art direction, and media suit you well.",
};

const tierClass = { S: "tier-s", A: "tier-a", B: "tier-b", C: "tier-c" };

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
      toast.error("Please take the quiz first");
      navigate("/quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (plan) => {
    setProcessingPayment(true);
    try {
      const res = await axios.post("/payment/create-checkout-session", {
        plan,
      });
      if (res.data.url) window.location.href = res.data.url;
    } catch (error) {
      toast.error("Payment setup failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleShare = () => {
    const text = `My brain profile is ${results?.dominance?.replace(
      /_/g,
      " ",
    )}. I used NeuroCareers to discover my ideal career path.`;
    if (navigator.share) {
      navigator.share({
        title: "My Brain Career Results",
        text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
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

  const tabs = [
    { id: "careers", label: "Career Matches" },
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
        <div
          style={{
            width: "64px",
            height: "64px",
            background: `${config.color}15`,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          <Brain size={32} color={config.color} />
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
            style={{
              padding: "0.5rem 1.25rem",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Share2 size={15} /> Share Results
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="btn-secondary"
            style={{
              padding: "0.5rem 1.25rem",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <RotateCcw size={15} /> Retake Quiz
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
          <span>Left: Logical · Analytical · Structured</span>
          <span>Creative · Intuitive · Visual: Right</span>
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
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Compass size={20} color="var(--accent-primary)" /> Your Career
                Priority List
              </h2>
              {!results.isPremium && (
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                >
                  Showing {results.careers?.length || 0} of{" "}
                  {results.totalMatches || results.careers?.length} matches
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
                  key={career.careerId}
                  career={career}
                  rank={i + 1}
                />
              ))}
            </div>

            {!results.isPremium && (
              <PremiumUpgrade
                onUpgrade={handleUpgrade}
                processing={processingPayment}
              />
            )}
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

const CareerCard = ({ career, rank }) => {
  const [expanded, setExpanded] = useState(rank <= 2);
  const Icon = ICON_MAP[career.icon] || Briefcase;

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
              flexShrink: 0,
            }}
          >
            <Icon size={22} color={career.color || "var(--accent-primary)"} />
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
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Trophy size={11} /> Best Match
                </span>
              )}
              <span
                className={`tier-badge ${tierClass[career.tier] || "tier-b"}`}
              >
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
              {career.shortDescription || career.description}
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
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: "#ecfdf5",
                      color: "#065f46",
                      border: "1px solid #6ee7b7",
                      borderRadius: "999px",
                      padding: "0.3rem 0.85rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    <Banknote size={13} /> {career.averageSalary}
                  </span>
                )}
                {career.growthRate && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: "#eff6ff",
                      color: "#1e40af",
                      border: "1px solid #93c5fd",
                      borderRadius: "999px",
                      padding: "0.3rem 0.85rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    <LineChart size={13} /> {career.growthRate}
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
                    Core skills
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

              <Link
                to={`/careers/${career.careerId}`}
                onClick={(e) => e.stopPropagation()}
                className="resource-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Map size={13} /> View Full Roadmap
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <BarChart3 size={20} color="var(--accent-primary)" /> Your Cognitive
        Profile
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
                  }}
                />
              </div>
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
    <div
      style={{
        width: "56px",
        height: "56px",
        background: "linear-gradient(135deg,#f59e0b,#ef4444)",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1rem",
      }}
    >
      <Sparkles size={28} color="white" />
    </div>
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
      Upgrade to see every career match, full roadmaps, and curated resources.
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
        {
          icon: Compass,
          title: "All Career Matches",
          desc: "Full ranked list",
        },
        {
          icon: BookMarked,
          title: "Learning Resources",
          desc: "Curated courses & books",
        },
        { icon: Map, title: "Full Roadmaps", desc: "Step-by-step plans" },
        {
          icon: GraduationCap,
          title: "Exam Guidance",
          desc: "Know what to prepare for",
        },
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
          <f.icon
            size={20}
            color="#92400e"
            style={{ marginBottom: "0.4rem" }}
          />
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

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.85rem",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onUpgrade("PREMIUM_MONTHLY")}
        disabled={processing}
        className="btn-secondary"
        style={{ fontSize: "0.9rem", padding: "0.85rem 1.75rem" }}
      >
        Monthly Plan
      </button>
      <button
        onClick={() => onUpgrade("PREMIUM_LIFETIME")}
        disabled={processing}
        className="btn-premium"
        style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}
      >
        {processing ? "Redirecting..." : "Get Lifetime Access"}
      </button>
    </div>
    <p style={{ fontSize: "0.78rem", color: "#b45309", marginTop: "1rem" }}>
      Secure payment via Stripe · Cancel monthly plan anytime
    </p>
  </motion.div>
);

export default Results;
