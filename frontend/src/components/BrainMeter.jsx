import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BrainMeter = ({ answers, currentIndex }) => {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  useEffect(() => {
    let left = 0,
      right = 0;
    answers.forEach((answer) => {
      if (answer !== null) {
        if (answer === 0) left += 2;
        else if (answer === 1) right += 2;
        else if (answer === 2) {
          left += 1;
          right += 1;
        }
      }
    });
    setLeftScore(left);
    setRightScore(right);
  }, [answers]);

  const total = leftScore + rightScore;
  const leftPercent = total === 0 ? 50 : Math.round((leftScore / total) * 100);
  const rightPercent = total === 0 ? 50 : 100 - leftPercent;

  const getDominanceLabel = () => {
    if (total === 0) return "Awaiting answers...";
    if (leftPercent > 65) return "Strong Left Brain";
    if (rightPercent > 65) return "Strong Right Brain";
    if (leftPercent > 55) return "Moderate Left Brain";
    if (rightPercent > 55) return "Moderate Right Brain";
    return "Balanced Brain";
  };

  return (
    <div
      className="glass"
      style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.75rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              marginBottom: "0.2rem",
            }}
          >
            Live Brain Meter
          </div>
          <div
            style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {getDominanceLabel()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--left-brain)",
              }}
            />
            <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
              Left {leftPercent}%
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--right-brain)",
              }}
            />
            <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
              Right {rightPercent}%
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: "12px",
          background: "var(--bg-surface-3)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: "50%" }}
          animate={{ width: `${leftPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            background: "var(--left-brain)",
            borderRadius: "999px",
          }}
        />
        <motion.div
          initial={{ width: "50%" }}
          animate={{ width: `${rightPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            background: "var(--right-brain)",
            borderRadius: "999px",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.4rem",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            color: "var(--left-brain)",
            fontWeight: 600,
          }}
        >
          🧠 Logical · Analytical
        </span>
        <span
          style={{
            fontSize: "0.72rem",
            color: "var(--right-brain)",
            fontWeight: 600,
          }}
        >
          Creative · Intuitive 🎨
        </span>
      </div>
    </div>
  );
};

export default BrainMeter;
