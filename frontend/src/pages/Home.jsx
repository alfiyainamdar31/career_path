import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

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
        {/* Decorative background */}
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
          <div className="section-tag">🧠 AI-Powered Career Guidance</div>

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
              maxWidth: "580px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Take our scientifically-designed brain dominance quiz and receive a
            personalized, ranked list of career paths matched to how your mind
            works.
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
                Start Brain Assessment →
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
                  to="/login"
                  className="btn-secondary"
                  style={{
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "1rem",
                  }}
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Stats strip */}
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
              { num: "10+", label: "Career paths", color: "var(--balanced)" },
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
              icon: "📝",
              title: "Take the Quiz",
              desc:
                "Answer 15 instinct-driven questions about how you think, learn, and work. No right or wrong answers.",
              color: "var(--left-brain)",
            },
            {
              step: "02",
              icon: "🧠",
              title: "Discover Your Profile",
              desc:
                "Get your brain dominance type — left, right, or balanced — with a detailed cognitive breakdown.",
              color: "var(--right-brain)",
            },
            {
              step: "03",
              icon: "🎯",
              title: "Get Your Career List",
              desc:
                "Receive a ranked, personalized list of careers, required subjects, skill gaps, and learning resources.",
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
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                {item.icon}
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
              icon: "🔐",
              title: "Two-Factor Auth",
              desc:
                "Your career data is secured with optional TOTP authentication",
            },
            {
              icon: "📊",
              title: "Real Analytics",
              desc:
                "Visual charts of your brain balance with detailed explanations",
            },
            {
              icon: "🎓",
              title: "Subject Guidance",
              desc: "Know exactly which subjects to study for each career path",
            },
            {
              icon: "📚",
              title: "Learning Resources",
              desc: "Curated courses, books & videos for your target career",
            },
          ].map((f, i) => (
            <div key={i} className="glass" style={{ padding: "1.5rem" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
                {f.icon}
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
            Join thousands of students and professionals who discovered their
            ideal career path.
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
