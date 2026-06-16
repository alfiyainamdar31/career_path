import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Brain, ShieldCheck, GraduationCap } from "lucide-react";

const ACADEMIC_LEVELS = [
  { value: "SSC_10TH", label: "Class 10 (SSC) - choosing a stream" },
  { value: "HSC_12TH", label: "Class 12 (HSC) - stream already chosen" },
  { value: "GRADUATE", label: "Undergraduate / Graduate" },
  { value: "OTHER", label: "Other / Exploring options" },
];

const STREAMS = [
  { value: "SCIENCE", label: "Science" },
  { value: "COMMERCE", label: "Commerce" },
  { value: "ARTS", label: "Arts / Humanities" },
  { value: "NOT_APPLICABLE", label: "Not applicable yet" },
];

const Register = () => {
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [currentStream, setCurrentStream] = useState("");
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const otpRefs = useRef([]);

  const {
    register,
    verifyRegistrationOTP,
    resendOTP,
    pendingVerification,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await register({
      name,
      email,
      password,
      academicLevel: academicLevel || null,
      currentStream: currentStream || null,
    });
    setLoading(false);
    if (result?.requiresVerification) setStep("otp");
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

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    text.split("").forEach((c, i) => {
      if (i < 6) next[i] = c;
    });
    setOtp(next);
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    setVerifying(true);
    const success = await verifyRegistrationOTP(code);
    setVerifying(false);
    if (success) navigate("/quiz");
  };

  const handleResend = async () => {
    setResending(true);
    await resendOTP();
    setResending(false);
  };

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981"][strength];

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
            "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "460px" }}
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
            {step === "form" ? "Create your account" : "Verify your email"}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            {step === "form"
              ? "Start discovering your ideal career path"
              : `We sent a 6-digit code to ${
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
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Alex Johnson"
                />
              </div>
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
                  minLength="6"
                  className="input-field"
                  placeholder="Min 6 characters"
                />
                {password.length > 0 && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: "3px",
                            borderRadius: "999px",
                            background:
                              i <= strength
                                ? strengthColor
                                : "var(--bg-surface-3)",
                            transition: "all 0.3s",
                          }}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: strengthColor,
                        fontWeight: 600,
                      }}
                    >
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <GraduationCap size={16} color="var(--accent-primary)" />
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                    }}
                  >
                    Tell us about your studies (optional)
                  </span>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label className="form-label">Academic level</label>
                  <select
                    value={academicLevel}
                    onChange={(e) => setAcademicLevel(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select your current level</option>
                    {ACADEMIC_LEVELS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                {(academicLevel === "HSC_12TH" ||
                  academicLevel === "GRADUATE") && (
                  <div>
                    <label className="form-label">
                      Current / chosen stream
                    </label>
                    <select
                      value={currentStream}
                      onChange={(e) => setCurrentStream(e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select your stream</option>
                      {STREAMS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
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
                onPaste={handleOtpPaste}
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
            <p
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
                fontSize: "0.88rem",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
