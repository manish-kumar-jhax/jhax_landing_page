import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, Utensils, Clock, Megaphone } from "lucide-react";

/**
 * Tabs = 5 categories. "Ask Anything" is the always-on hub label (default).
 * The other 4 tabs each map to a real operator question with a full AI response.
 * The typewriter cycles through those 4 questions on a 30s countdown, and the
 * active tab highlights in sync. Clicking a tab jumps to that question.
 */
const TABS = [
  { key: "ask", label: "Ask Anything", icon: MessageSquare },
  { key: "customers", label: "Customers", icon: Users },
  { key: "menu", label: "Menu", icon: Utensils },
  { key: "labor", label: "Labor", icon: Clock },
  { key: "marketing", label: "Marketing AI", icon: Megaphone },
];

// Only 4 real Q/A pairs — one per tab (excluding "Ask Anything" hub).
const ITEMS = [
  {
    tab: "customers",
    question: "Who are my top 20 customers this month?",
    headline: "Top 20 = 34% of your money",
    delta: "3 regulars slipping",
    body: (
      <>
        Sarah M. leads at <strong className="text-cream">$412</strong> across 7 visits.
        3 of your top 20 haven&apos;t been back in 21 days — reach out before
        they slip.
      </>
    ),
    stats: [
      { label: "Regulars", value: "20" },
      { label: "Share of money", value: "34%" },
      { label: "Not back", value: "3" },
    ],
    cta: "Send the message to those customers",
  },
  {
    tab: "menu",
    question: "What dish makes me the most money this week?",
    headline: "Wagyu Sliders: 68% margin",
    delta: "$1,412 earned",
    body: (
      <>
        Sold <strong className="text-cream">47 units</strong>, contributed{" "}
        <strong className="text-cream">$1,412</strong>. Only appears on 12% of
        orders — hardly anyone knows about it. Bundle into a deal to sell more.
      </>
    ),
    stats: [
      { label: "Margin", value: "68%" },
      { label: "Sold", value: "47" },
      { label: "Money", value: "$1,412" },
    ],
    cta: "Build a deal",
  },
  {
    tab: "labor",
    question: "Do I have too many staff on Tuesday lunch?",
    headline: "Tue 11–2 has too many staff",
    delta: "–$340 / week",
    body: (
      <>
        You have <strong className="text-cream">42% more staff</strong> than the
        Tuesday lunch actually needs. Trim 1 cook + 1 server saves{" "}
        <strong className="text-cream">$17,680/yr</strong> with zero impact on service.
      </>
    ),
    stats: [
      { label: "Overstaffed", value: "42%" },
      { label: "Every week", value: "$340" },
      { label: "Every year", value: "$17,680" },
    ],
    cta: "Fix the schedule",
  },
  {
    tab: "marketing",
    question: "Which offer brought back the most money?",
    headline: "WhatsApp offer — Nov 12",
    delta: "$2,214 back",
    body: (
      <>
        Brought back <strong className="text-cream">$2,214</strong> from{" "}
        <strong className="text-cream">47 people</strong> in 5 days. Cost $120.
        Winner — send it again next Tuesday to 63 people who stopped coming.
      </>
    ),
    stats: [
      { label: "Money back", value: "$2,214" },
      { label: "For every $1", value: "$18.40" },
      { label: "People", value: "47" },
    ],
    cta: "Send it again",
  },
];

const useTypewriter = (text, resetKey) => {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      if (i < text.length) {
        i += 1;
        setOut(text.slice(0, i));
        setTimeout(step, 38);
      } else {
        setDone(true);
      }
    };
    const t = setTimeout(step, 120);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [text, resetKey]);
  return { out, done };
};

const LiveDemoCard = () => {
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(30);
  const timerRef = useRef(null);

  const item = ITEMS[idx];
  const { out, done } = useTypewriter(item.question, idx);

  // 30-second countdown; on 0 → next question. Reset on manual tab jump.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setIdx((i) => (i + 1) % ITEMS.length);
          return 30;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const jumpToTab = (tabKey) => {
    if (tabKey === "ask") return; // hub tab
    const found = ITEMS.findIndex((it) => it.tab === tabKey);
    if (found >= 0) {
      setIdx(found);
      setRemaining(30);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="hero-live-demo-card"
      className="relative w-full rounded-[22px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #131313 0%, #0d0d0d 100%)",
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

      <div className="p-5 md:p-6">
        {/* Header — brand + countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-warm">
            <span
              className="w-1.5 h-1.5 rounded-full dot-pulse"
              style={{ background: "#E8500A" }}
            />
            <span className="text-orange">JHAX</span>
            <span className="text-ghost">·</span>
            <span>Watching a real restaurant · Live</span>
          </div>
          <div
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ghost"
            data-testid="hero-demo-countdown"
          >
            Auto-refresh ·{" "}
            <span
              className="text-orange"
              style={{ minWidth: 22, display: "inline-block", textAlign: "right" }}
            >
              {String(remaining).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="flex items-center gap-1.5 p-1.5 rounded-full mb-5 overflow-x-auto"
          style={{ background: "#0a0a0a", border: "1px solid #171717" }}
          data-testid="hero-demo-tabs"
          role="tablist"
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive =
              t.key === "ask"
                ? false
                : ITEMS[idx].tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => jumpToTab(t.key)}
                data-testid={`hero-demo-tab-${t.key}`}
                role="tab"
                aria-selected={isActive}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all"
                style={{
                  background: isActive ? "rgba(232,80,10,0.14)" : "transparent",
                  color: isActive
                    ? "#FF6B2B"
                    : t.key === "ask"
                    ? "#6B6866"
                    : "#8a8785",
                  border: `1px solid ${
                    isActive ? "rgba(232,80,10,0.4)" : "transparent"
                  }`,
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                  letterSpacing: "0.02em",
                }}
              >
                <Icon size={12} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Prompt line */}
        <div
          className="rounded-xl border border-jhax p-4 mb-4"
          style={{ background: "#0a0a0a" }}
        >
          <div className="font-mono text-[9.5px] uppercase text-ghost tracking-[0.18em] mb-2">
            You ask
          </div>
          <div
            className="text-cream text-[16px] md:text-[18px] leading-snug"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              minHeight: 30,
            }}
            data-testid="hero-demo-question"
          >
            &ldquo;{out}
            {!done && <span className="caret" />}
            {done && <span>&rdquo;</span>}
          </div>
        </div>

        {/* AI response */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl p-5"
            style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
            data-testid="hero-demo-response"
          >
            <div className="flex items-center justify-between mb-2 gap-3">
              <div className="font-mono text-[9.5px] uppercase text-orange tracking-[0.24em]">
                JHAX · Answer
              </div>
              <div
                className="font-mono text-[10px] px-2 py-0.5 rounded-full act-pulse"
                style={{
                  background: "rgba(232,80,10,0.14)",
                  color: "#FF6B2B",
                  border: "1px solid rgba(232,80,10,0.4)",
                }}
              >
                ACT
              </div>
            </div>

            <div
              className="text-cream font-display"
              style={{
                fontSize: "clamp(20px, 2.3vw, 26px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {item.headline}
            </div>
            <div
              className="font-mono text-[11px] mt-1"
              style={{ color: "#16A34A" }}
            >
              [{item.delta}]
            </div>

            <div className="text-muted-warm text-[14px] leading-relaxed mt-3">
              {item.body}
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {item.stats.map((s) => (
                <div
                  key={s.label}
                  className="px-3 py-1.5 rounded-full font-mono text-[10.5px]"
                  style={{
                    background: "#0f0f0f",
                    border: "1px solid #1E1E1E",
                  }}
                  data-testid={`hero-demo-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="text-ghost">{s.label}: </span>
                  <span className="text-cream">{s.value}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              data-testid="hero-demo-action-btn"
              className="mt-4 inline-flex items-center gap-2 rounded-full text-[13px] font-medium transition-transform"
              style={{
                background: "rgba(232,80,10,0.14)",
                border: "1px solid rgba(232,80,10,0.4)",
                color: "#FF6B2B",
                padding: "9px 16px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <span>⚡</span> {item.cta}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LiveDemoCard;
