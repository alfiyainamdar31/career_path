import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Brain,
  Compass,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav className="navbar">
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "68px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Brain size={19} color="white" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                }}
              >
                NeuroCareers
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Brain-Matched Guidance
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <NavLink to="/careers" active={isActive("/careers")} icon={Compass}>
              Careers
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  active={isActive("/dashboard")}
                  icon={LayoutDashboard}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/quiz"
                  active={isActive("/quiz")}
                  icon={ClipboardList}
                >
                  Take Quiz
                </NavLink>
                {user?.brainDominance && (
                  <NavLink
                    to="/results"
                    active={isActive("/results")}
                    icon={BarChart3}
                  >
                    My Results
                  </NavLink>
                )}
                <div
                  style={{
                    width: "1px",
                    height: "24px",
                    background: "var(--border-subtle)",
                    margin: "0 0.5rem",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  {user?.isPremium && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        background: "linear-gradient(135deg,#f59e0b,#ef4444)",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.25rem 0.65rem",
                        borderRadius: "999px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <Sparkles size={12} /> PREMIUM
                    </span>
                  )}
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {user?.name?.split(" ")[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      border: "1.5px solid var(--border-default)",
                      color: "var(--text-secondary)",
                      padding: "0.45rem 1rem",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-primary)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "var(--bg-surface-2)";
                      e.target.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "var(--text-secondary)";
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "var(--text-secondary)",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{
                    padding: "0.55rem 1.5rem",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active, icon: Icon }) => (
  <Link
    to={to}
    style={{
      textDecoration: "none",
      color: active ? "var(--accent-primary)" : "var(--text-secondary)",
      padding: "0.5rem 0.85rem",
      borderRadius: "999px",
      fontSize: "0.88rem",
      fontWeight: active ? 600 : 500,
      background: active ? "var(--bg-surface-2)" : "transparent",
      transition: "all 0.15s",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      gap: "0.4rem",
    }}
  >
    <Icon size={15} />
    {children}
  </Link>
);

export default Navbar;
