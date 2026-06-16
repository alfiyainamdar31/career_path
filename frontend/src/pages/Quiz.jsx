import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrainMeter from "../components/BrainMeter";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const params = user?.academicLevel ? { level: user.academicLevel } : {};
      const res = await axios.get("/quiz/questions", { params });
      setQuestions(res.data.questions);
      setAnswers(new Array(res.data.questions.length).fill(null));
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load questions");
      setLoading(false);
    }
  };

  const handleAnswer = (val) => {
    setSelectedAnswer(val);
    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = val;
      setAnswers(newAnswers);
      setSelectedAnswer(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 280);
  };

  const handleSubmit = async () => {
    const unanswered = answers.filter((a) => a === null).length;
    if (unanswered > 0) {
      toast.error(`${unanswered} question(s) unanswered`);
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post("/quiz/submit", { answers });
      if (res.data.success) {
        toast.success("Analysis complete");
        navigate("/results");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
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
        <p style={{ color: "var(--text-muted)" }}>Loading your assessment...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div
        className="glass"
        style={{
          padding: "3rem",
          textAlign: "center",
          maxWidth: "500px",
          margin: "2rem auto",
        }}
      >
        <p style={{ color: "var(--text-muted)" }}>
          No questions are available right now. Please try again later.
        </p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== null).length;
  const isLast = currentIndex === questions.length - 1;

  const categoryLabels = {
    problem_solving: "Problem Solving",
    communication: "Communication",
    work_style: "Work Style",
    personal: "Personal Insight",
    interest: "Interest",
    aptitude: "Aptitude",
  };

  const optionColors = [
    "var(--left-brain)",
    "var(--right-brain)",
    "var(--balanced)",
    "var(--emerald-500)",
  ];

  return (
    <div
      style={{ maxWidth: "680px", margin: "0 auto", padding: "1rem 0 3rem" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              Brain Dominance Assessment
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.82rem",
                marginTop: "0.1rem",
              }}
            >
              Answer instinctively. There are no wrong answers.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "var(--accent-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              {currentIndex + 1}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              of {questions.length}
            </div>
          </div>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.35rem",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
          }}
        >
          <span>
            {answeredCount}/{questions.length} answered
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      <BrainMeter answers={answers} currentIndex={currentIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="glass"
          style={{ padding: "2rem", marginBottom: "1rem" }}
        >
          <div
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--accent-primary)",
              background: "var(--bg-surface-2)",
              padding: "0.25rem 0.75rem",
              borderRadius: "999px",
              marginBottom: "1.25rem",
              textTransform: "uppercase",
            }}
          >
            {categoryLabels[currentQ.category] || currentQ.category}
          </div>

          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "1.75rem",
              lineHeight: 1.5,
            }}
          >
            {currentQ.text}
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
          >
            {currentQ.options.map((option, idx) => {
              const val = option.type === "L" ? 0 : option.type === "R" ? 1 : 2;
              const isSelected =
                answers[currentIndex] === val || selectedAnswer === val;
              const accentColor = optionColors[idx % optionColors.length];

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(val)}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    border: `1.5px solid ${
                      isSelected ? accentColor : "var(--border-subtle)"
                    }`,
                    background: isSelected
                      ? `${accentColor}12`
                      : "var(--bg-surface)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.85rem",
                    transition: "all 0.15s ease",
                    fontFamily: "var(--font-primary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = accentColor + "60";
                      e.currentTarget.style.background = accentColor + "08";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor =
                        "var(--border-subtle)";
                      e.currentTarget.style.background = "var(--bg-surface)";
                    }
                  }}
                >
                  <span
                    style={{
                      minWidth: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: isSelected
                        ? accentColor
                        : "var(--bg-surface-2)",
                      color: isSelected ? "white" : "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: "all 0.15s",
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span
                    style={{
                      color: isSelected
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                      fontSize: "0.92rem",
                      lineHeight: 1.5,
                      paddingTop: "0.15rem",
                      fontWeight: isSelected ? 500 : 400,
                    }}
                  >
                    {option.text}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{
            padding: "0.65rem 1.25rem",
            borderRadius: "999px",
            border: "1.5px solid var(--border-default)",
            background: "transparent",
            color:
              currentIndex === 0
                ? "var(--text-muted)"
                : "var(--text-secondary)",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            fontFamily: "var(--font-primary)",
            fontWeight: 500,
            fontSize: "0.88rem",
            opacity: currentIndex === 0 ? 0.4 : 1,
          }}
        >
          Previous
        </button>

        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={submitting || answeredCount !== questions.length}
            className="btn-premium"
            style={{
              flex: 1,
              borderRadius: "var(--radius-md)",
              opacity: answeredCount !== questions.length ? 0.5 : 1,
            }}
          >
            {submitting ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Loader2 size={18} className="spin-icon" />
                Analyzing your responses...
              </span>
            ) : (
              "Submit & See My Career Path"
            )}
          </button>
        ) : (
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {questions.length - currentIndex - 1} questions remaining
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          marginTop: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background:
                idx === currentIndex
                  ? "var(--accent-primary)"
                  : answers[idx] !== null
                  ? "var(--emerald-500)"
                  : "var(--bg-surface-3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
