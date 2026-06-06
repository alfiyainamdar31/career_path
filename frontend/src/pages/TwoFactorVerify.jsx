import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const TwoFactorVerify = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const refs = useRef([]);
  const { verify2FA, pendingTwoFAUser } = useAuth();
  const navigate = useNavigate();

  if (!pendingTwoFAUser) {
    navigate("/login");
    return null;
  }

  const handleChange = (val, idx) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    if (v && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...code];
    text.split("").forEach((c, i) => {
      if (i < 6) next[i] = c;
    });
    setCode(next);
    refs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;
    setLoading(true);
    const success = await verify2FA(fullCode);
    setLoading(false);
    if (success) navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Two-Factor Auth
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Enter the 6-digit code from your authenticator app
          </p>
        </div>

        <div className="glass-strong" style={{ padding: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
              onPaste={handlePaste}
            >
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={c}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="otp-input"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || code.join("").length !== 6}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.85rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              {loading ? "Verifying..." : "Verify Code →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
            }}
          >
            Open your authenticator app (Google Authenticator, Authy, etc.) to
            get your code
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TwoFactorVerify;
