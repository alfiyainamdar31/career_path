import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, refreshUser } = useAuth();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for successful payment return
    const params = new URLSearchParams(window.location.search);
    if (params.get("session_id")) {
      refreshUser();
      window.history.replaceState({}, "", "/dashboard");
    }
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("/quiz/results");
      if (res.data.success) setResults(res.data.results);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const quizTaken = !!results?.dominance;

  const dominanceLabel = {
    STRONG_LEFT: "Strong Left Brain",
    MODERATE_LEFT: "Moderate Left",
    BALANCED: "Balanced Brain",
    MODERATE_RIGHT: "Moderate Right",
    STRONG_RIGHT: "Strong Right Brain",
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{
          padding: "2rem 2.5rem",
          marginBottom: "1.5rem",
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: "0.3rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Welcome back
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            {user?.name} 👋
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.88rem",
              marginTop: "0.35rem",
            }}
          >
            {quizTaken
              ? "Your brain profile is ready. Explore your career matches."
              : "Take the quiz to discover your ideal career path."}
          </p>
        </div>
        {user?.isPremium && (
          <div
            style={{
              background: "linear-gradient(135deg,#f59e0b,#ef4444)",
              color: "white",
              padding: "0.65rem 1.25rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            💎 Premium Member
          </div>
        )}
      </motion.div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Quiz card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass card-hover"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📝</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text-primary)",
              marginBottom: "0.4rem",
            }}
          >
            Brain Quiz
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              marginBottom: "1.25rem",
              lineHeight: 1.5,
            }}
          >
            {quizTaken
              ? "Quiz completed! View your results or retake."
              : "15 questions · ~3 minutes · Free"}
          </div>
          <Link
            to={quizTaken ? "/results" : "/quiz"}
            className="btn-primary"
            style={{
              textDecoration: "none",
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              fontSize: "0.85rem",
            }}
          >
            {quizTaken ? "View Results →" : "Start Quiz →"}
          </Link>
        </motion.div>

        {/* Brain Profile */}
        {quizTaken && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass card-hover"
            style={{ padding: "1.5rem" }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🧠</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
                marginBottom: "0.4rem",
              }}
            >
              Your Brain Type
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--accent-primary)",
                marginBottom: "0.75rem",
              }}
            >
              {dominanceLabel[results.dominance]}
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              {[
                {
                  label: "Left",
                  val: results.leftScore,
                  color: "var(--left-brain)",
                },
                {
                  label: "Right",
                  val: results.rightScore,
                  color: "var(--right-brain)",
                },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <span>{s.label}</span>
                    <span style={{ fontWeight: 600, color: s.color }}>
                      {s.val}%
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: "5px" }}>
                    <div
                      className="match-bar-fill"
                      style={{ width: `${s.val}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Premium */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass card-hover"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
            {user?.isPremium ? "💎" : "🔓"}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text-primary)",
              marginBottom: "0.4rem",
            }}
          >
            {user?.isPremium ? "Premium Access" : "Go Premium"}
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              marginBottom: "1.25rem",
              lineHeight: 1.5,
            }}
          >
            {user?.isPremium
              ? "Full access to all career matches, subject roadmap & resources."
              : "Unlock 10+ careers, skill gaps & a personalized study plan."}
          </div>
          {!user?.isPremium && quizTaken && (
            <Link
              to="/results"
              className="btn-premium"
              style={{
                textDecoration: "none",
                display: "inline-block",
                padding: "0.5rem 1.25rem",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              Upgrade — $9.99 →
            </Link>
          )}
        </motion.div>

        {/* 2FA Security */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass card-hover"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔐</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text-primary)",
              marginBottom: "0.4rem",
            }}
          >
            Security
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              marginBottom: "1.25rem",
              lineHeight: 1.5,
            }}
          >
            {user?.twoFactorEnabled
              ? "Two-factor authentication is active."
              : "Enable 2FA to secure your account."}
          </div>
          {user?.twoFactorEnabled ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#065f46",
                background: "#ecfdf5",
                padding: "0.4rem 0.85rem",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "1px solid #6ee7b7",
              }}
            >
              ✓ 2FA Enabled
            </span>
          ) : (
            <Link
              to="/2fa/setup"
              className="btn-secondary"
              style={{
                textDecoration: "none",
                display: "inline-block",
                padding: "0.5rem 1.25rem",
                fontSize: "0.85rem",
              }}
            >
              Enable 2FA →
            </Link>
          )}
        </motion.div>
      </div>

      {/* Career Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass"
        style={{ padding: "1.75rem 2rem" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "1.25rem",
          }}
        >
          💡 Career Development Tips
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              accent: "var(--left-brain)",
              title: "Update Your Skills",
              desc:
                "The job market evolves fast. Spend 30 minutes daily learning something new.",
            },
            {
              accent: "var(--right-brain)",
              title: "Network Actively",
              desc:
                "70% of jobs are found through networking. Engage on LinkedIn regularly.",
            },
            {
              accent: "var(--balanced)",
              title: "Build a Portfolio",
              desc:
                "Show projects, not just your resume. A personal website makes you stand out.",
            },
            {
              accent: "var(--emerald-500)",
              title: "Get Certified",
              desc:
                "Industry certifications can increase your salary by 20–30% on average.",
            },
          ].map((tip, i) => (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${tip.accent}`,
                paddingLeft: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.3rem",
                  fontSize: "0.9rem",
                }}
              >
                {tip.title}
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                }}
              >
                {tip.desc}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
