import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Search,
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
  SlidersHorizontal,
  X,
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

const STREAM_OPTIONS = [
  { value: "", label: "Any stream" },
  { value: "SCIENCE", label: "Science" },
  { value: "COMMERCE", label: "Commerce" },
  { value: "ARTS", label: "Arts / Humanities" },
];

const TIER_OPTIONS = [
  { value: "", label: "Any tier" },
  { value: "S", label: "S-Tier" },
  { value: "A", label: "A-Tier" },
  { value: "B", label: "B-Tier" },
  { value: "C", label: "C-Tier" },
];

const tierClass = { S: "tier-s", A: "tier-a", B: "tier-b", C: "tier-c" };

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [stream, setStream] = useState("");
  const [tier, setTier] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCareers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (query) params.q = query;
      if (category) params.category = category;
      if (stream) params.stream = stream;
      if (tier) params.tier = tier;

      const res = await axios.get("/careers", { params });
      setCareers(res.data.careers);
    } catch (error) {
      setCareers([]);
    } finally {
      setLoading(false);
    }
  }, [query, category, stream, tier]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/careers/categories");
      setCategories(res.data.categories);
    } catch (error) {
      setCategories([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchCareers, 300);
    return () => clearTimeout(timer);
  }, [fetchCareers]);

  const activeFilterCount = [category, stream, tier].filter(Boolean).length;

  const clearFilters = () => {
    setCategory("");
    setStream("");
    setTier("");
  };

  return (
    <div
      style={{ maxWidth: "1100px", margin: "0 auto", paddingBottom: "3rem" }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", padding: "2rem 0 1.5rem" }}>
        <div className="section-tag">Career Explorer</div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0.5rem 0 0.75rem",
          }}
        >
          Browse every career path
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            maxWidth: "560px",
            margin: "0 auto",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          Search and filter careers by category, stream, or tier. Click any
          career to see its full roadmap, subjects, exams, and future scope.
        </p>
      </div>

      {/* Search bar */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, position: "relative", minWidth: "240px" }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, skills, or keywords..."
            className="input-field"
            style={{ paddingLeft: "2.75rem" }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            fontSize: "0.88rem",
          }}
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span
              style={{
                background: "var(--accent-primary)",
                color: "white",
                borderRadius: "999px",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass"
          style={{
            padding: "1.25rem 1.5rem",
            marginBottom: "1.5rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Relevant stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="input-field"
              >
                {STREAM_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="input-field"
              >
                {TIER_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              style={{
                marginTop: "1rem",
                background: "transparent",
                border: "none",
                color: "var(--accent-primary)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontFamily: "var(--font-primary)",
              }}
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </motion.div>
      )}

      {/* Results */}
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
        >
          <div className="spinner" />
        </div>
      ) : careers.length === 0 ? (
        <div
          className="glass"
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          No careers match your search. Try different keywords or filters.
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: "0.82rem",
              color: "var(--text-muted)",
              marginBottom: "1rem",
            }}
          >
            {careers.length} career{careers.length !== 1 ? "s" : ""} found
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {careers.map((career, i) => {
              const Icon = ICON_MAP[career.icon] || Briefcase;
              return (
                <motion.div
                  key={career._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4) }}
                >
                  <Link
                    to={`/careers/${career._id}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      className="glass card-hover"
                      style={{ padding: "1.5rem", height: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.85rem",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            background: `${career.color}15`,
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon size={22} color={career.color} />
                        </div>
                        <span
                          className={`tier-badge ${tierClass[career.tier]}`}
                        >
                          {career.tier}-Tier
                        </span>
                      </div>
                      <h3
                        style={{
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "var(--text-primary)",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {career.title}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                          marginBottom: "0.85rem",
                        }}
                      >
                        {career.shortDescription}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            fontWeight: 500,
                            background: "var(--bg-surface-2)",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "999px",
                          }}
                        >
                          {career.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--accent-primary)",
                            fontWeight: 600,
                          }}
                        >
                          {career.matchPercentage}% match
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Careers;
