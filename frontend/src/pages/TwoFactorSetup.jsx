import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const TwoFactorSetup = () => {
  const [step, setStep] = useState(1); // 1 = show QR, 2 = verify code
  const [setupData, setSetupData] = useState(null);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const refs = useRef([]);
  const { setup2FA, enable2FA, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadSetup();
  }, []);

  const loadSetup = async () => {
    setLoading(true);
    const data = await setup2FA();
    if (data) setSetupData(data);
    setLoading(false);
  };

  const handleChange = (val, idx) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    if (v && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0)
      refs.current[idx - 1]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 6) return;
    setVerifying(true);
    const success = await enable2FA(fullCode);
    setVerifying(false);
    if (success) navigate("/dashboard");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

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
        style={{ width: "100%", maxWidth: "460px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔐</div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Enable Two-Factor Auth
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Protect your account with an authenticator app
          </p>
        </div>

        <div className="glass-strong" style={{ padding: "2rem" }}>
          {step === 1 ? (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                {["Install Authenticator", "Scan QR Code", "Enter Code"].map(
                  (s, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background:
                            i === 1
                              ? "var(--accent-primary)"
                              : "var(--bg-surface-3)",
                          color: i === 1 ? "white" : "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          margin: "0 auto 0.25rem",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--text-muted)",
                          fontWeight: 500,
                        }}
                      >
                        {s}
                      </div>
                    </div>
                  ),
                )}
              </div>

              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1.25rem",
                  textAlign: "center",
                }}
              >
                Scan this QR code with <strong>Google Authenticator</strong>,{" "}
                <strong>Authy</strong>, or any TOTP app:
              </p>

              {setupData?.qrCode && (
                <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
                  <img
                    src={setupData.qrCode}
                    alt="2FA QR Code"
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "1px solid var(--border-default)",
                      borderRadius: "var(--radius-md)",
                      padding: "8px",
                      background: "white",
                    }}
                  />
                </div>
              )}

              {setupData?.secret && (
                <div
                  style={{
                    background: "var(--bg-surface-2)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.75rem 1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.25rem",
                      fontWeight: 600,
                    }}
                  >
                    Manual entry key:
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      color: "var(--accent-primary)",
                      letterSpacing: "0.1em",
                      wordBreak: "break-all",
                    }}
                  >
                    {setupData.secret}
                  </div>
                </div>
              )}

              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                }}
                onClick={() => setStep(2)}
              >
                I've Scanned the QR Code →
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerify}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1.5rem",
                }}
              >
                Enter the 6-digit code from your authenticator app to confirm
                setup:
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
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
                disabled={verifying || code.join("").length !== 6}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {verifying ? "Verifying..." : "Enable 2FA →"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  width: "100%",
                  marginTop: "0.75rem",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-primary)",
                }}
              >
                ← Back to QR Code
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TwoFactorSetup;
