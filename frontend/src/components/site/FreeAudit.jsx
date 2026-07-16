import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";

// ---------- Loading steps ----------
const LOADING_STEPS = [
  { emoji: "🔍", label: "Finding your restaurant" },
  { emoji: "📖", label: "Reading your reviews" },
  { emoji: "⏰", label: "Checking your busy hours" },
  { emoji: "🏆", label: "Comparing to other restaurants nearby" },
  { emoji: "💰", label: "Finding money leaks" },
];

// ---------- Example chips (fictional, realistic) ----------
const EXAMPLES = [
  {
    name: "The Corner Bistro · Manhattan",
    key: "corner",
  },
  {
    name: "Sunset Diner · Los Angeles",
    key: "sunset",
  },
  {
    name: "Nonna's Kitchen · Brooklyn",
    key: "nonna",
  },
];

// Sample reports keyed to the example chips + a default for typed input
const REPORT_TEMPLATES = {
  corner: {
    name: "The Corner Bistro",
    location: "Manhattan, NY",
    healthScore: 62,
    kpis: [
      { label: "Rating", value: "4.3", suffix: "★", icon: Star },
      { label: "Unanswered reviews", value: "23", suffix: "%", icon: MessageSquare },
      { label: "Busiest day", value: "Fri", icon: TrendingUp },
      { label: "Slowest day", value: "Tue", icon: TrendingDown },
    ],
    peaks: [42, 38, 55, 68, 92, 78, 61], // Mon..Sun 0-100
    findings: [
      {
        tier: "URGENT",
        emoji: "🚨",
        color: "#F87171",
        bg: "rgba(220,38,38,0.10)",
        bd: "rgba(220,38,38,0.35)",
        title: "23% of your reviews go unanswered",
        body: "Every review you ignore costs you future customers. People check before they eat.",
        impact: "$410 / week",
      },
      {
        tier: "FIX THIS",
        emoji: "🔧",
        color: "#FF6B2B",
        bg: "rgba(232,80,10,0.12)",
        bd: "rgba(232,80,10,0.40)",
        title: "Tuesday lunch is 60% quieter than Friday",
        body: "Same food. Same staff. Half the people. A small Tuesday offer usually pays for itself.",
        impact: "$340 / week",
      },
      {
        tier: "OPPORTUNITY",
        emoji: "✨",
        color: "#22C55E",
        bg: "rgba(22,163,74,0.10)",
        bd: "rgba(22,163,74,0.30)",
        title: "Your rating slipped from 4.5 to 4.3 in 60 days",
        body: "Reach out to the last 8 unhappy customers with an apology + free item. That usually gets 3 stars back up.",
        impact: "$280 / week",
      },
      {
        tier: "OPPORTUNITY",
        emoji: "✨",
        color: "#22C55E",
        bg: "rgba(22,163,74,0.10)",
        bd: "rgba(22,163,74,0.30)",
        title: "4 similar spots nearby offer combo deals. You don't.",
        body: "You have the best-margin dish on this block — bundle it. Most owners see attach rate jump ~18%.",
        impact: "$190 / week",
      },
    ],
  },
  sunset: {
    name: "Sunset Diner",
    location: "Los Angeles, CA",
    healthScore: 58,
    kpis: [
      { label: "Rating", value: "4.1", suffix: "★", icon: Star },
      { label: "Unanswered reviews", value: "31", suffix: "%", icon: MessageSquare },
      { label: "Busiest day", value: "Sat", icon: TrendingUp },
      { label: "Slowest day", value: "Wed", icon: TrendingDown },
    ],
    peaks: [35, 48, 30, 55, 74, 96, 82],
    findings: [
      {
        tier: "URGENT",
        emoji: "🚨",
        color: "#F87171",
        bg: "rgba(220,38,38,0.10)",
        bd: "rgba(220,38,38,0.35)",
        title: "31% of your reviews get no reply",
        body: "The 12 newest 3-star reviews all mention the same issue. Fix it and you'll see the score jump.",
        impact: "$520 / week",
      },
      {
        tier: "FIX THIS",
        emoji: "🔧",
        color: "#FF6B2B",
        bg: "rgba(232,80,10,0.12)",
        bd: "rgba(232,80,10,0.40)",
        title: "Wednesday dinner is your quietest slot",
        body: "You're paying full staff for half the tables. A midweek promo pays for itself in one night.",
        impact: "$298 / week",
      },
      {
        tier: "OPPORTUNITY",
        emoji: "✨",
        color: "#22C55E",
        bg: "rgba(22,163,74,0.10)",
        bd: "rgba(22,163,74,0.30)",
        title: "Weekend brunch shows up in searches — but not on your menu",
        body: "63 nearby people searched for brunch this week. You don't have one. Easy add.",
        impact: "$430 / week",
      },
    ],
  },
  nonna: {
    name: "Nonna's Kitchen",
    location: "Brooklyn, NY",
    healthScore: 71,
    kpis: [
      { label: "Rating", value: "4.6", suffix: "★", icon: Star },
      { label: "Unanswered reviews", value: "14", suffix: "%", icon: MessageSquare },
      { label: "Busiest day", value: "Sun", icon: TrendingUp },
      { label: "Slowest day", value: "Mon", icon: TrendingDown },
    ],
    peaks: [28, 45, 58, 62, 80, 88, 95],
    findings: [
      {
        tier: "FIX THIS",
        emoji: "🔧",
        color: "#FF6B2B",
        bg: "rgba(232,80,10,0.12)",
        bd: "rgba(232,80,10,0.40)",
        title: "Monday is 68% quieter than Sunday",
        body: "Your Sunday regulars are your best customers. Send them a Monday-only offer — most will come back.",
        impact: "$360 / week",
      },
      {
        tier: "OPPORTUNITY",
        emoji: "✨",
        color: "#22C55E",
        bg: "rgba(22,163,74,0.10)",
        bd: "rgba(22,163,74,0.30)",
        title: "Your rating is 4.6 — top 15% in Brooklyn",
        body: "Your best customers love you but don't share. A simple 'tell a friend, get dessert' can double word-of-mouth.",
        impact: "$220 / week",
      },
      {
        tier: "OPPORTUNITY",
        emoji: "✨",
        color: "#22C55E",
        bg: "rgba(22,163,74,0.10)",
        bd: "rgba(22,163,74,0.30)",
        title: "Nobody knows about your Tuesday tasting menu",
        body: "It's on the menu but not on Google. Add photos and it'll fill the slow midweek slot.",
        impact: "$185 / week",
      },
    ],
  },
};

const buildReportFor = (query) => {
  // Realistic-but-fictional generator for a typed-in name
  return {
    name: query.replace(/https?:\/\/\S+/g, "").trim() || "Your Restaurant",
    location: "Nearby",
    healthScore: 64,
    kpis: [
      { label: "Rating", value: "4.2", suffix: "★", icon: Star },
      { label: "Unanswered reviews", value: "27", suffix: "%", icon: MessageSquare },
      { label: "Busiest day", value: "Sat", icon: TrendingUp },
      { label: "Slowest day", value: "Tue", icon: TrendingDown },
    ],
    peaks: [38, 44, 50, 60, 82, 91, 70],
    findings: [
      {
        tier: "URGENT",
        emoji: "🚨",
        color: "#F87171",
        bg: "rgba(220,38,38,0.10)",
        bd: "rgba(220,38,38,0.35)",
        title: "27% of your reviews are unanswered",
        body: "Answering reviews takes 5 minutes and lifts your rating within a month.",
        impact: "$380 / week",
      },
      {
        tier: "FIX THIS",
        emoji: "🔧",
        color: "#FF6B2B",
        bg: "rgba(232,80,10,0.12)",
        bd: "rgba(232,80,10,0.40)",
        title: "Tuesday is 55% quieter than Saturday",
        body: "You have too many staff on Tuesday for the customers you actually get.",
        impact: "$310 / week",
      },
      {
        tier: "OPPORTUNITY",
        emoji: "✨",
        color: "#22C55E",
        bg: "rgba(22,163,74,0.10)",
        bd: "rgba(22,163,74,0.30)",
        title: "3 spots on your street offer weekend deals — you don't",
        body: "A simple weekend deal on your best dish would even the field fast.",
        impact: "$240 / week",
      },
    ],
  };
};

// ---------- Small building blocks ----------
const HealthScoreDial = ({ value }) => {
  const size = 128;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 75 ? "#22C55E" : pct >= 50 ? "#FF6B2B" : "#F87171";
  const label = pct >= 75 ? "Good" : pct >= 50 ? "Needs work" : "At risk";
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
      data-testid="audit-health-dial"
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#1E1E1E"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: `rotate(-90deg)`, transformOrigin: "50% 50%" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="font-display text-cream"
          style={{ fontSize: 36, letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          {pct}
        </div>
        <div
          className="font-mono uppercase tracking-[0.2em]"
          style={{ fontSize: 9, color }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

const PeaksChart = ({ peaks }) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const max = Math.max(...peaks);
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
      data-testid="audit-peaks-chart"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
          When people actually show up
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">
          Last 30 days
        </div>
      </div>
      <div className="flex items-end justify-between gap-2" style={{ height: 96 }}>
        {peaks.map((v, i) => {
          const h = (v / max) * 100;
          const isPeak = v === max;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 justify-end"
              data-testid={`audit-peak-bar-${i}`}
            >
              <div
                className="w-full rounded-t-lg relative overflow-hidden"
                style={{ height: `${h}%`, minHeight: 6 }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: isPeak
                      ? "linear-gradient(180deg, #FF6B2B, #E8500A)"
                      : "linear-gradient(180deg, #333330, #1E1E1E)",
                    width: "100%",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
              </div>
              <div
                className="font-mono uppercase tracking-[0.2em]"
                style={{ fontSize: 9, color: isPeak ? "#FF6B2B" : "#6B6866" }}
              >
                {days[i]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ---------- Main component ----------
const FreeAudit = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | report
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState(null);
  const timeoutsRef = useRef([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const runLoading = (finalReport) => {
    clearTimers();
    setState("loading");
    setStepIndex(0);
    LOADING_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), i * 780);
      timeoutsRef.current.push(t);
    });
    const done = setTimeout(() => {
      setReport(finalReport);
      setState("report");
    }, LOADING_STEPS.length * 780 + 250);
    timeoutsRef.current.push(done);
  };

  const submit = (e) => {
    e?.preventDefault?.();
    const q = query.trim();
    if (!q) return;
    runLoading(buildReportFor(q));
  };

  const submitExample = (key, name) => {
    setQuery(name);
    runLoading(REPORT_TEMPLATES[key]);
  };

  const reset = () => {
    clearTimers();
    setState("idle");
    setReport(null);
    setQuery("");
  };

  const totalImpact = useMemo(() => {
    if (!report) return 0;
    return report.findings.reduce((sum, f) => {
      const m = /\$([\d,]+)/.exec(f.impact || "");
      return sum + (m ? parseInt(m[1].replace(/,/g, ""), 10) : 0);
    }, 0);
  }, [report]);

  return (
    <section
      id="audit"
      data-testid="free-audit-section"
      className="relative py-24 md:py-32"
    >
      {/* Ambient orange glow */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 -top-10 w-[900px] h-[420px] blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,80,10,0.22), transparent)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full font-mono uppercase tracking-[0.18em]"
            style={{
              background: "rgba(232,80,10,0.08)",
              border: "1px solid rgba(232,80,10,0.28)",
              color: "#FF6B2B",
              padding: "6px 14px",
              fontSize: 10.5,
            }}
          >
            Free Restaurant Audit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-cream mt-5 mx-auto"
            style={{
              fontSize: "clamp(30px, 5vw, 60px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            Find out what your restaurant is losing —{" "}
            <span className="text-orange">for free</span>.
          </motion.h2>
          <p
            className="mt-5 mx-auto text-muted-warm"
            style={{ maxWidth: 620, fontSize: 16, lineHeight: 1.55, fontWeight: 300 }}
          >
            No sign-up. No credit card. Just type your restaurant name and we&apos;ll
            show you exactly where money is slipping through the cracks.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={submit}
          data-testid="audit-form"
          className="mt-9 mx-auto flex flex-col sm:flex-row gap-3 max-w-[720px]"
        >
          <div
            className="flex-1 flex items-center gap-2 rounded-full px-5"
            style={{
              background: "#0d0d0d",
              border: "1px solid #1E1E1E",
              height: 56,
            }}
          >
            <Search size={16} className="text-muted-warm flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Restaurant name or Google Maps link"
              data-testid="audit-input"
              className="flex-1 bg-transparent outline-none text-cream placeholder:text-muted-warm"
              style={{ fontSize: 15, fontWeight: 500 }}
              disabled={state === "loading"}
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading" || !query.trim()}
            data-testid="audit-submit"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 font-semibold whitespace-nowrap"
            style={{
              background: "#E8500A",
              color: "#fff",
              fontSize: 15,
              height: 56,
              opacity: state === "loading" || !query.trim() ? 0.55 : 1,
              boxShadow: "0 20px 60px -20px rgba(232,80,10,0.6)",
              transition: "opacity .2s, transform .2s",
            }}
          >
            {state === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Working…
              </>
            ) : (
              <>
                Get Free Report <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Example chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2" data-testid="audit-examples">
          <span
            className="font-mono uppercase tracking-[0.18em] text-ghost mr-1 self-center"
            style={{ fontSize: 10 }}
          >
            Or try:
          </span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.key}
              type="button"
              onClick={() => submitExample(ex.key, ex.name)}
              disabled={state === "loading"}
              data-testid={`audit-example-${ex.key}`}
              className="rounded-full transition-colors"
              style={{
                background: "#0d0d0d",
                border: "1px solid #1E1E1E",
                color: "#6B6866",
                padding: "8px 14px",
                fontSize: 12.5,
              }}
              onMouseEnter={(e) => {
                if (state !== "loading") {
                  e.currentTarget.style.borderColor = "rgba(232,80,10,0.4)";
                  e.currentTarget.style.color = "#FF6B2B";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E1E1E";
                e.currentTarget.style.color = "#6B6866";
              }}
            >
              {ex.name}
            </button>
          ))}
        </div>

        {/* Loading panel */}
        <AnimatePresence>
          {state === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="mt-10 mx-auto max-w-[720px] rounded-2xl p-6 md:p-7"
              style={{ background: "#0d0d0d", border: "1px solid #1E1E1E" }}
              data-testid="audit-loading"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange mb-4">
                JHAX is looking at your restaurant…
              </div>
              <ul className="space-y-3">
                {LOADING_STEPS.map((s, i) => {
                  const isDone = i < stepIndex;
                  const isActive = i === stepIndex;
                  return (
                    <li
                      key={s.label}
                      className="flex items-center gap-3"
                      data-testid={`audit-step-${i}`}
                      style={{
                        opacity: isDone || isActive ? 1 : 0.35,
                        transition: "opacity .3s",
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isActive
                            ? "rgba(232,80,10,0.14)"
                            : isDone
                            ? "rgba(22,163,74,0.14)"
                            : "#0f0f0f",
                          border: `1px solid ${
                            isActive
                              ? "rgba(232,80,10,0.4)"
                              : isDone
                              ? "rgba(22,163,74,0.35)"
                              : "#1E1E1E"
                          }`,
                          fontSize: 15,
                        }}
                      >
                        {isDone ? (
                          <span style={{ color: "#22C55E", fontSize: 14 }}>✓</span>
                        ) : isActive ? (
                          <Loader2 size={14} className="animate-spin" color="#FF6B2B" />
                        ) : (
                          <span>{s.emoji}</span>
                        )}
                      </span>
                      <span
                        className="text-[14.5px]"
                        style={{
                          color: isActive ? "#F5F2ED" : isDone ? "#6B6866" : "#3a3835",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report */}
        <AnimatePresence>
          {state === "report" && report && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 rounded-[22px] relative overflow-hidden"
              style={{
                background: "#0c0c0c",
                border: "1px solid rgba(232,80,10,0.28)",
                boxShadow: "0 40px 120px -40px rgba(232,80,10,0.35)",
              }}
              data-testid="audit-report"
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #E8500A 30%, #FF6B2B 60%, transparent)",
                }}
              />
              <div className="p-6 md:p-8">
                {/* Head */}
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex items-center gap-5 flex-1 min-w-[260px]">
                    <HealthScoreDial value={report.healthScore} />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
                        Free audit · Restaurant health
                      </div>
                      <div
                        className="font-display text-cream mt-1"
                        style={{
                          fontSize: "clamp(24px, 3vw, 34px)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.05,
                        }}
                        data-testid="audit-report-name"
                      >
                        {report.name}
                      </div>
                      <div className="text-muted-warm text-[13px] mt-1">
                        {report.location} · From public info only
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ghost">
                      Estimated money lost
                    </div>
                    <div
                      className="font-display mt-1"
                      style={{
                        color: "#FF6B2B",
                        fontSize: "clamp(28px, 3.4vw, 40px)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                      data-testid="audit-total-impact"
                    >
                      ${totalImpact.toLocaleString("en-US")}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-warm mt-1">
                      Every week
                    </div>
                  </div>
                </div>

                {/* KPI pills */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {report.kpis.map((k) => {
                    const Icon = k.icon;
                    return (
                      <div
                        key={k.label}
                        className="rounded-xl p-4"
                        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
                        data-testid={`audit-kpi-${k.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={12} className="text-orange" />
                          <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ghost">
                            {k.label}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span
                            className="font-display text-cream"
                            style={{ fontSize: 26, letterSpacing: "-0.03em" }}
                          >
                            {k.value}
                          </span>
                          {k.suffix && (
                            <span
                              className="font-mono text-orange"
                              style={{ fontSize: 12 }}
                            >
                              {k.suffix}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Findings + Peaks */}
                <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr,1fr]">
                  <div className="space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
                      What JHAX found
                    </div>
                    {report.findings.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                        className="rounded-xl p-4 flex items-start gap-3"
                        style={{ background: "#0a0a0a", border: `1px solid ${f.bd}` }}
                        data-testid={`audit-finding-${i}`}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            background: f.bg,
                            border: `1px solid ${f.bd}`,
                            fontSize: 16,
                          }}
                        >
                          {f.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                            <span
                              className="font-mono text-[9.5px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full"
                              style={{
                                color: f.color,
                                background: f.bg,
                                border: `1px solid ${f.bd}`,
                              }}
                            >
                              {f.tier}
                            </span>
                            <span
                              className="font-mono text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap"
                              style={{
                                color: f.color,
                                background: f.bg,
                                border: `1px solid ${f.bd}`,
                              }}
                            >
                              ~{f.impact}
                            </span>
                          </div>
                          <div
                            className="text-cream text-[15px]"
                            style={{ fontWeight: 500, lineHeight: 1.25 }}
                          >
                            {f.title}
                          </div>
                          <div className="text-muted-warm text-[13px] mt-1 leading-snug">
                            {f.body}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <PeaksChart peaks={report.peaks} />
                </div>

                {/* Bottom CTA */}
                <div
                  className="mt-7 rounded-2xl p-5 md:p-6 flex flex-wrap items-center justify-between gap-4"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(232,80,10,0.08), rgba(232,80,10,0.02))",
                    border: "1px solid rgba(232,80,10,0.35)",
                  }}
                  data-testid="audit-cta"
                >
                  <div className="flex-1 min-w-[240px]">
                    <div
                      className="text-cream font-display"
                      style={{ fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.2 }}
                    >
                      This is only what we can see from the outside.
                    </div>
                    <div className="text-muted-warm text-[14px] mt-1.5">
                      Plug in your Square and JHAX shows you the money you&apos;re losing{" "}
                      <em style={{ fontStyle: "italic", color: "#F5F2ED" }}>inside</em> your
                      restaurant too — every regular, every shift, every dish.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={reset}
                      data-testid="audit-run-another"
                      className="rounded-full text-[13px]"
                      style={{
                        background: "#0a0a0a",
                        border: "1px solid #1E1E1E",
                        color: "#6B6866",
                        padding: "12px 18px",
                      }}
                    >
                      Run another
                    </button>
                    <a
                      href="#book-demo"
                      data-testid="audit-cta-book"
                      className="inline-flex items-center gap-2 rounded-full text-[14px] font-semibold"
                      style={{
                        background: "#E8500A",
                        color: "#fff",
                        padding: "12px 22px",
                        boxShadow: "0 16px 40px -14px rgba(232,80,10,0.6)",
                      }}
                    >
                      Connect your Square <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle helper strip */}
        {state === "idle" && (
          <div className="mt-8 flex items-center justify-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ghost">
            <span>Uses only public info</span>
            <span>·</span>
            <span>No sign-up needed</span>
            <span>·</span>
            <span>Takes ~4 seconds</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeAudit;
