import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "Why are my sales down today?",
  "Which branch needs attention?",
  "Am I overstaffed this week?",
  "Who are my top customers?",
  "What should I do today?",
  "Forecast my revenue next month.",
];

const responses = [
  {
    id: 0,
    headline: "Sales –39%: $398",
    sub: "+$368/wk potential",
    body: (
      <>
        Traffic isn&apos;t the cause — repeat customers are up.
        <br />
        Problem: <strong className="text-cream">63 customers</strong> from last
        month haven&apos;t returned. Reactivating 20% recovers ~
        <strong className="text-cream">$368 this week</strong>.
      </>
    ),
    metrics: [
      { label: "Revenue", value: "$398.12" },
      { label: "Orders", value: "19" },
    ],
    cta: "Launch Reactivation Campaign",
  },
  {
    id: 1,
    headline: "West Village needs attention",
    sub: "Labor 12% over budget",
    body: (
      <>
        Tuesday & Wednesday lunch are overstaffed by{" "}
        <strong className="text-cream">1.5 FTE</strong>. Cost:{" "}
        <strong className="text-cream">$412 this week</strong>. Reducing to
        forecasted demand saves the loss without hurting service.
      </>
    ),
    metrics: [
      { label: "Locations", value: "3" },
      { label: "Delta", value: "–$412" },
    ],
    cta: "Adjust Shift Plan",
  },
  {
    id: 2,
    headline: "You are overstaffed Tue lunch",
    sub: "Weekly cost: $340",
    body: (
      <>
        Historical demand for Tue 11–2 is{" "}
        <strong className="text-cream">42% below</strong> your current schedule.
        JHAX suggests trimming one cook & one server, keeping tips protected.
      </>
    ),
    metrics: [
      { label: "Savings/wk", value: "$340" },
      { label: "Risk", value: "Low" },
    ],
    cta: "Send New Schedule",
  },
];

const useTypewriter = (list, index) => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reset on index change
    setText("");
    setDone(false);
    const current = list[index] || "";
    let cancelled = false;
    let i = 0;
    const step = () => {
      if (cancelled) return;
      if (i < current.length) {
        i += 1;
        setText(current.slice(0, i));
        setTimeout(step, 45);
      } else {
        setDone(true);
      }
    };
    const initial = setTimeout(step, 120);
    return () => {
      cancelled = true;
      clearTimeout(initial);
    };
  }, [index, list]);

  return { text, done };
};

const useCountdown = (seconds, onZero) => {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          onZero?.();
          return seconds;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [seconds, onZero]);
  return remaining;
};

const LiveDemoCard = () => {
  const [index, setIndex] = useState(0);
  const remaining = useCountdown(30, () =>
    setIndex((i) => (i + 1) % questions.length),
  );
  const { text, done } = useTypewriter(questions, index);
  const response = responses[index % responses.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
      data-testid="hero-live-demo-card"
      className="relative w-full max-w-[880px] mx-auto rounded-[22px] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #131313 0%, #0d0d0d 100%)",
        border: "1px solid #1E1E1E",
        boxShadow:
          "0 30px 120px -40px rgba(232,80,10,0.35), 0 0 0 1px rgba(232,80,10,0.12)",
      }}
    >
      {/* Top orange accent */}
      <div
        aria-hidden
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #E8500A 30%, #FF6B2B 60%, transparent)",
        }}
      />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-warm">
            <span
              className="w-1.5 h-1.5 rounded-full dot-pulse"
              style={{ background: "#E8500A" }}
            />
            <span className="text-orange">JHAX AI COO</span>
            <span className="text-ghost">·</span>
            <span>LIVE</span>
            <span className="text-ghost">·</span>
            <span>Reading Square data…</span>
          </div>
          <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.18em]" data-testid="hero-demo-countdown">
            Auto-refresh · <span className="text-orange" style={{ minWidth: 22, display: "inline-block", textAlign: "right" }}>{String(remaining).padStart(2, "0")}s</span>
          </div>
        </div>

        {/* Prompt line */}
        <div className="rounded-xl border border-jhax p-4 mb-5" style={{ background: "#0a0a0a" }}>
          <div className="font-mono text-[10px] uppercase text-ghost tracking-[0.18em] mb-2">
            You ask
          </div>
          <div
            className="text-cream text-[18px] md:text-[22px] leading-snug"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, letterSpacing: "-0.01em", minHeight: 34 }}
            data-testid="hero-demo-question"
          >
            &ldquo;{text}
            {!done && <span className="caret" />}
            {done && <span>&rdquo;</span>}
          </div>
        </div>

        {/* Response */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-5 items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={response.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="rounded-xl border border-jhax p-5"
              style={{ background: "#0a0a0a" }}
              data-testid="hero-demo-response"
            >
              <div className="font-mono text-[10px] uppercase text-orange tracking-[0.24em] mb-2">
                AI COO · DECISION
              </div>
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <div
                  className="text-cream text-[22px] md:text-[26px] font-display"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {response.headline}
                </div>
                <div className="font-mono text-[12px]" style={{ color: "#16A34A" }}>
                  [{response.sub}]
                </div>
              </div>
              <div className="text-muted-warm text-[15px] leading-relaxed">
                {response.body}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {response.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-3 py-1.5 rounded-full border border-jhax font-mono text-[11px]"
                    style={{ background: "#0f0f0f" }}
                  >
                    <span className="text-ghost">{m.label}: </span>
                    <span className="text-cream">{m.value}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                data-testid="hero-demo-action-btn"
                className="mt-5 inline-flex items-center gap-2 rounded-full text-[13px] font-medium"
                style={{
                  background: "rgba(232,80,10,0.12)",
                  border: "1px solid rgba(232,80,10,0.35)",
                  color: "#FF6B2B",
                  padding: "10px 18px",
                }}
              >
                <span>⚡</span> {response.cta}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Right rail — mini live stats */}
          <div className="hidden md:flex flex-col gap-3 w-[220px]">
            {[
              { l: "Health Score", v: "51", tag: "RED", color: "#7C3AED" },
              { l: "Today's revenue", v: "$398", tag: "-38.8%", color: "#DC2626" },
              { l: "At-risk VIPs", v: "12", tag: "ACT", color: "#E8500A" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-jhax p-3 flex items-center justify-between"
                style={{ background: "#0a0a0a" }}
              >
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ghost">
                    {s.l}
                  </div>
                  <div className="text-cream text-lg font-display" style={{ letterSpacing: "-0.02em" }}>
                    {s.v}
                  </div>
                </div>
                <div
                  className={`font-mono text-[10px] px-2 py-1 rounded-full ${s.tag === "ACT" ? "act-pulse" : ""}`}
                  style={{
                    background: `${s.color}18`,
                    color: s.color,
                    border: `1px solid ${s.color}44`,
                  }}
                >
                  {s.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveDemoCard;
