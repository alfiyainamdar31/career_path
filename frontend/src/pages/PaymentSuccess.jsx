import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser();
    toast.success("Premium unlocked! Welcome to the full experience. 🎉");
    const t = setTimeout(() => navigate("/results"), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="glass-strong"
        style={{
          maxWidth: "460px",
          width: "100%",
          padding: "3rem 2.5rem",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          style={{ fontSize: "4rem", marginBottom: "1.25rem" }}
        >
          🎉
        </motion.div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          Premium Unlocked!
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          You now have lifetime access to all career matches, subject roadmaps,
          skill gap analysis, and learning resources. Welcome to the full
          NeuroCareers experience!
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            marginBottom: "2rem",
          }}
        >
          {[
            "10+ Personalized Career Matches",
            "Complete Subject Roadmap",
            "Skill Gap Analysis",
            "Curated Learning Resources",
            "Cognitive Profile Deep Dive",
          ].map((item, i) => (
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
              <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>{" "}
              {item}
            </div>
          ))}
        </div>

        <Link
          to="/results"
          className="btn-primary"
          style={{
            textDecoration: "none",
            display: "inline-block",
            padding: "0.85rem 2.5rem",
            fontSize: "0.95rem",
          }}
        >
          See My Full Results →
        </Link>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            marginTop: "1rem",
          }}
        >
          Redirecting automatically in 4 seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
