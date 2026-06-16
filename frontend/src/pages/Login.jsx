import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Brain, ShieldCheck } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "otp"

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const otpRefs = useRef([]);

  const {
    login,
    verifyRegistrationOTP,
    resendOTP,
    pendingVerification,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result?.success) {
      if (result.requiresVerification) {
        setStep("otp");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleOtpChange = (val, idx) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      otpRefs.current[idx - 1]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    setVerifying(true);
    const success = await verifyRegistrationOTP(code);
    setVerifying(false);
    if (success) navigate("/dashboard");
  };

  const handleResend = async () => {
    setResending(true);
    await resendOTP();
    setResending(false);
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
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background:
            "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: "14px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {step === "form" ? (
              <Brain size={26} color="white" />
            ) : (
              <ShieldCheck size={26} color="white" />
            )}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.3rem",
            }}
          >
            {step === "form" ? "Welcome back" : "Verify your email"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {step === "form"
              ? "Sign in to your NeuroCareers account"
              : `Enter the code sent to ${
                  pendingVerification?.email || "your email"
                }`}
          </p>
        </div>

        <div className="glass-strong" style={{ padding: "2rem" }}>
          {step === "form" ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.95rem",
                }}
              >
                {loading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      className="spinner"
                      style={{
                        width: "18px",
                        height: "18px",
                        borderWidth: "2px",
                      }}
                    />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {otp.map((c, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={c}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="otp-input"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={verifying || otp.join("").length !== 6}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {verifying ? "Verifying..." : "Verify & Continue"}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                style={{
                  width: "100%",
                  marginTop: "0.85rem",
                  background: "transparent",
                  border: "none",
                  color: "var(--accent-primary)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {resending ? "Sending..." : "Resend code"}
              </button>
            </form>
          )}

          {step === "form" && (
            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.88rem",
                  textAlign: "center",
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: "var(--accent-primary)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Create one free
                </Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
