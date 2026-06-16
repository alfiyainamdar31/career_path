import React from "react";
import { Link } from "react-router-dom";
import { Brain, Mail, Globe, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "3rem",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Brain size={18} color="white" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "var(--text-primary)",
                }}
              >
                NeuroCareers
              </span>
            </div>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                maxWidth: "260px",
              }}
            >
              Brain-matched career guidance for 10th, 12th, and graduate
              students exploring their future.
            </p>
          </div>

          {/* Explore */}
          <div>
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
              Explore
            </div>
            <FooterLink to="/quiz">Brain Quiz</FooterLink>
            <FooterLink to="/careers">Career Explorer</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
          </div>

          {/* Account */}
          <div>
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
              Account
            </div>
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/register">Sign Up</FooterLink>
            <FooterLink to="/results">My Results</FooterLink>
          </div>

          {/* Connect */}
          <div>
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
              Connect
            </div>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[Mail, Globe, MessageCircle].map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: "34px",
                    height: "34px",
                    background: "var(--bg-surface-2)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} NeuroCareers. All rights reserved.
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Built for students, by students.
          </span>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      display: "block",
      color: "var(--text-secondary)",
      fontSize: "0.85rem",
      textDecoration: "none",
      marginBottom: "0.6rem",
      fontWeight: 500,
    }}
  >
    {children}
  </Link>
);

export default Footer;
