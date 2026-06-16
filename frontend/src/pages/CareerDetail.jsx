import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code,
  ChartScatter,
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
  Banknote,
  LineChart,
  GraduationCap,
  Map,
  FileCheck,
  Compass,
  BookMarked,
} from "lucide-react";

const ICON_MAP = {
  code: Code,
  "chart-dots": ChartScatter,
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

const tierClass = { S: "tier-s", A: "tier-a", B: "tier-b", C: "tier-c" };

const CareerDetail = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCareer();
  }, [id]);

  const fetchCareer = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/careers/${id}`);
      setCareer(res.data.career);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "4rem" }}
      >
        <div className="spinner" />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div
        className="glass"
        style={{
          padding: "3rem",
          textAlign: "center",
          maxWidth: "600px",
          margin: "2rem auto",
        }}
      >
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
          Career not found.
        </p>
        <Link
          to="/careers"
          className="btn-secondary"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          Back to Careers
        </Link>
      </div>
    );
  }

  const Icon = ICON_MAP[career.icon] || Briefcase;

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", paddingBottom: "3rem" }}>
      <Link
        to="/careers"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          color: "var(--text-muted)",
          textDecoration: "none",
          fontSize: "0.85rem",
          marginBottom: "1.5rem",
          fontWeight: 500,
        }}
      >
        <ArrowLeft size={16} /> Back to Careers
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ padding: "2rem", marginBottom: "1.5rem" }}
      >
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: `${career.color}15`,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={32} color={career.color} />
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.4rem",
                flexWrap: "wrap",
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                {career.title}
              </h1>
              <span className={`tier-badge ${tierClass[career.tier]}`}>
                {career.tier}-Tier
              </span>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                marginBottom: "0.85rem",
              }}
            >
              {career.description}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  background: "var(--bg-surface-2)",
                  padding: "0.25rem 0.7rem",
                  borderRadius: "999px",
                }}
              >
                {career.category}
              </span>
              {career.relevantStreams?.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent-primary)",
                    fontWeight: 600,
                    background: "var(--bg-surface-2)",
                    padding: "0.25rem 0.7rem",
                    borderRadius: "999px",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {s === "ANY" ? "Any Stream" : s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key facts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <FactCard
          icon={Banknote}
          label="Average Salary"
          value={career.averageSalary}
        />
        <FactCard
          icon={LineChart}
          label="Growth Outlook"
          value={career.growthRate}
        />
        <FactCard
          icon={GraduationCap}
          label="Key Exams"
          value={career.keyExams?.join(", ") || "Not specified"}
        />
      </div>

      {/* Future scope */}
      {career.futureScope && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass"
          style={{ padding: "1.5rem 1.75rem", marginBottom: "1.5rem" }}
        >
          <SectionHeading icon={Compass} title="Future Scope" />
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            {career.futureScope}
          </p>
        </motion.div>
      )}

      {/* Required skills */}
      {career.requiredSkills?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass"
          style={{ padding: "1.5rem 1.75rem", marginBottom: "1.5rem" }}
        >
          <SectionHeading icon={FileCheck} title="Core Skills" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {career.requiredSkills.map((s, i) => (
              <span key={i} className="skill-badge">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Roadmap */}
      {career.roadmap?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: "1.5rem" }}
        >
          <div style={{ marginBottom: "1.25rem" }}>
            <SectionHeading icon={Map} title="Roadmap to This Career" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {career.roadmap.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "1.25rem" }}>
                {/* Timeline marker */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: career.color,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < career.roadmap.length - 1 && (
                    <div
                      style={{
                        width: "2px",
                        flex: 1,
                        background: "var(--border-default)",
                        minHeight: "40px",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className="glass"
                  style={{
                    padding: "1.25rem 1.5rem",
                    marginBottom: "1rem",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: career.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {step.stage}
                  </div>
                  <h4
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                      marginBottom: "0.85rem",
                    }}
                  >
                    {step.description}
                  </p>

                  {step.subjects?.length > 0 && (
                    <div
                      style={{
                        marginBottom: step.exams?.length > 0 ? "0.6rem" : 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Subjects
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.4rem",
                        }}
                      >
                        {step.subjects.map((s, j) => (
                          <span key={j} className="skill-badge">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.exams?.length > 0 && (
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "0.4rem",
                        }}
                      >
                        Relevant Exams
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.4rem",
                        }}
                      >
                        {step.exams.map((e, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              color: "#92400e",
                              background: "#fef3c7",
                              border: "1px solid #fcd34d",
                              borderRadius: "999px",
                              padding: "0.2rem 0.7rem",
                            }}
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Resources */}
      {career.resources?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass"
          style={{ padding: "1.5rem 1.75rem" }}
        >
          <SectionHeading icon={BookMarked} title="Learning Resources" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {career.resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                {r.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const FactCard = ({ icon: Icon, label, value }) => (
  <div className="glass" style={{ padding: "1.25rem 1.5rem" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.4rem",
      }}
    >
      <Icon size={16} color="var(--accent-primary)" />
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
    <div
      style={{
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        lineHeight: 1.5,
      }}
    >
      {value}
    </div>
  </div>
);

const SectionHeading = ({ icon: Icon, title }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1rem",
    }}
  >
    <Icon size={18} color="var(--accent-primary)" />
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        margin: 0,
      }}
    >
      {title}
    </h3>
  </div>
);

export default CareerDetail;
