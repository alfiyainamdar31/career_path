import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  ClipboardList,
  Brain,
  Target,
  ShieldCheck,
  BarChart3,
  GraduationCap,
  BookOpen,
  Compass,
} from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "5rem 1rem 4rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="section-tag"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Sparkles size={13} /> Career Guidance for Every Student
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            Your Brain Knows
            <br />
            <span className="gradient-text">Which Career Fits</span>
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            From 10th grade stream selection to 12th grade career planning, take
            our brain dominance quiz and get a personalized roadmap of careers,
            subjects, and exams matched to how you think.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {isAuthenticated ? (
              <Link
                to="/quiz"
                className="btn-primary"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "1rem",
                }}
              >
                Start Brain Assessment
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "1rem",
                  }}
                >
                  Start Free — No Card Needed
                </Link>
                <Link
                  to="/careers"
                  className="btn-secondary"
                  style={{
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "1rem",
                  }}
                >
                  Browse Careers
                </Link>
              </>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              marginTop: "4rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "15", label: "Questions", color: "var(--left-brain)" },
              {
                num: "~3 min",
                label: "To complete",
                color: "var(--right-brain)",
              },
              { num: "14+", label: "Career paths", color: "var(--balanced)" },
              { num: "Free", label: "To start", color: "var(--emerald-500)" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 800,
                    color: s.color,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginTop: "0.2rem",
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section style={{ padding: "3rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-tag">How It Works</div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginTop: "0.5rem",
            }}
          >
            Three steps to your ideal career
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              step: "01",
              icon: ClipboardList,
              title: "Take the Quiz",
              desc:
                "Answer questions tailored to your academic level, whether you're choosing a 10th stream or planning after 12th.",
              color: "var(--left-brain)",
            },
            {
              step: "02",
              icon: Brain,
              title: "Discover Your Profile",
              desc:
                "Get your brain dominance type and see how it aligns with your current or future stream.",
              color: "var(--right-brain)",
            },
            {
              step: "03",
              icon: Target,
              title: "Get Your Roadmap",
              desc:
                "Receive ranked careers with subjects to study, exams to prepare for, and realistic future scope.",
              color: "var(--balanced)",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass card-hover"
              style={{
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: item.color,
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                  opacity: 0.6,
                }}
              >
                STEP {item.step}
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: `${item.color}15`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <item.icon size={24} color={item.color} />
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  marginBottom: "0.6rem",
                  color: "var(--text-primary)",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${item.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature highlights */}
      <section style={{ padding: "3rem 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              icon: ShieldCheck,
              title: "Verified Accounts",
              desc: "Email verification keeps your career data secure",
            },
            {
              icon: BarChart3,
              title: "Real Analytics",
              desc:
                "Visual charts of your brain balance with detailed explanations",
            },
            {
              icon: GraduationCap,
              title: "Subject Guidance",
              desc: "Know exactly which subjects to study for each career path",
            },
            {
              icon: Compass,
              title: "Career Explorer",
              desc: "Search and filter every profession with full roadmaps",
            },
          ].map((f, i) => (
            <div key={i} className="glass" style={{ padding: "1.5rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--bg-surface-2)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <f.icon size={20} color="var(--accent-primary)" />
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  marginBottom: "0.4rem",
                  color: "var(--text-primary)",
                }}
              >
                {f.title}
              </div>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            padding: "3.5rem 2rem",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-subtle)",
            textAlign: "center",
            margin: "2rem 0 4rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "var(--text-primary)",
            }}
          >
            Ready to find your perfect career?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            Join students who discovered their ideal career path with a clear,
            actionable roadmap.
          </p>
          <Link
            to="/register"
            className="btn-primary"
            style={{
              textDecoration: "none",
              display: "inline-block",
              fontSize: "1rem",
              padding: "0.875rem 2.5rem",
            }}
          >
            Start Your Brain Assessment — Free
          </Link>
        </motion.section>
      )}
    </div>
  );
};

export default Home;
