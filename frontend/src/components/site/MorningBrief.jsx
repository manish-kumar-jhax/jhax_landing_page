import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronDown,
  Mic,
  ArrowRight,
} from "lucide-react";
import ChapterHeader from "@/components/site/ChapterHeader";

// ----- static content (owner + yesterday summary) -----
const OWNER_NAME = "Alex";

const CARDS = [
  {
    key: "urgent",
    tone: {
      label: "URGENT",
      color: "#F87171",
      bg: "rgba(220,38,38,0.10)",
      border: "rgba(220,38,38,0.35)",
    },
    icon: AlertTriangle,
    title: "Cash short by $87 at close",
    lines: [
      "Yesterday's till reconciliation is $87.42 below expected.",
      "Likely tied to a void at 21:14 — needs manager sign-off before service.",
    ],
    action: "Reconcile now",
    detail: [
      { l: "Expected", v: "$1,462.00" },
      { l: "Counted", v: "$1,374.58" },
      { l: "Delta", v: "–$87.42" },
      { l: "Suspected cause", v: "Void #4712 · 21:14" },
    ],
  },
  {
    key: "headsup",
    tone: {
      label: "HEADS UP",
      color: "#FF6B2B",
      bg: "rgba(232,80,10,0.12)",
      border: "rgba(232,80,10,0.4)",
    },
    icon: Clock,
    title: "Tuesday lunch is overstaffed",
    lines: [
      "3 cooks + 5 servers scheduled for Tue 11–14.",
      "Historical demand needs 2 + 4 — trim saves $142 without service impact.",
    ],
    action: "Adjust schedule",
    detail: [
      { l: "Scheduled", v: "3 cooks · 5 servers" },
      { l: "Recommended", v: "2 cooks · 4 servers" },
      { l: "Weekly save", v: "$142" },
      { l: "Risk", v: "Low · covers historic p90" },
    ],
  },
  {
    key: "opp",
    tone: {
      label: "OPPORTUNITY",
      color: "#22C55E",
      bg: "rgba(22,163,74,0.10)",
      border: "rgba(22,163,74,0.35)",
    },
    icon: Sparkles,
    title: "3 VIPs have been 21+ days away",
    lines: [
      "Quinn Reyes, Casey Lopez, Sam Nguyen — combined LTV $3,030.",
      "One-tap WhatsApp win-back typically recovers 30–40% at 18x ROI.",
    ],
    action: "Send win-back",
    detail: [
      { l: "Contacts", v: "3 VIPs" },
      { l: "Combined LTV", v: "$3,030" },
      { l: "Expected recovery", v: "$1,050" },
      { l: "Send via", v: "WhatsApp · SMS" },
    ],
  },
];

const SCORE_PILLS = [
  { l: "Health Score", v: "74", suffix: "/100", tone: "#22C55E" },
  { l: "Recoverable Today", v: "$412", tone: "#FF6B2B" },
  { l: "Actions Waiting", v: "4", tone: "#F5F2ED" },
];

const QUICK_ASKS = [
  "Why is Tuesday slow?",
  "Who tipped best yesterday?",
  "Can I close early Wednesday?",
];

// ----- helpers -----
const useClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
};

const formatTime = (d) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
const formatDay = (d) =>
  d.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

// ----- component -----
const MorningBrief = () => {
  const [open, setOpen] = useState(-1);
  const now = useClock();

  return (
    <section
      id="morning"
      data-testid="morning-brief-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="04"
        label="The Morning Ritual"
        headline={
          <>
            The first screen you see
            <br />
            <span className="text-orange">every morning.</span>
          </>
        }
        sub="Before service, before your first coffee gets cold — a 30-second read of yesterday, and three concrete moves for today."
      />

      <div className="relative max-w-[1180px] mx-auto mt-16 px-4 md:px-10">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-[900px] h-[380px] blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.22), transparent)",
          }}
        />

        {/* Device frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[22px] overflow-hidden"
          style={{
            background: "#0c0c0c",
            border: "1px solid #1E1E1E",
            boxShadow:
              "0 60px 160px -40px rgba(232,80,10,0.25), 0 0 0 1px rgba(255,255,255,0.02)",
          }}
          data-testid="morning-brief-device"
        >
          {/* Chrome */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-b"
            style={{ borderColor: "#161616", background: "#0a0a0a" }}
          >
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#242424" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#242424" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#242424" }} />
            </div>
            <div className="font-mono text-[11px] text-ghost">
              jhax.ai · morning brief
            </div>
            <div className="ml-auto flex items-center gap-2 font-mono text-[10px] text-muted-warm">
              <span
                className="w-1.5 h-1.5 rounded-full dot-pulse"
                style={{ background: "#16A34A" }}
              />
              Square · Live
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-8">
            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div
                  className="flex items-center gap-2 font-mono uppercase tracking-[0.2em] text-orange"
                  style={{ fontSize: 10.5 }}
                  data-testid="morning-brief-time"
                >
                  <Sun size={12} />
                  <span>{formatDay(now)}</span>
                  <span className="text-ghost">·</span>
                  <span
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      color: "#F5F2ED",
                    }}
                  >
                    {formatTime(now)}
                  </span>
                </div>
                <h3
                  className="font-display text-cream mt-2"
                  style={{
                    fontSize: "clamp(30px, 4vw, 46px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                  data-testid="morning-brief-greeting"
                >
                  Good morning, {OWNER_NAME} <span aria-hidden>☀️</span>
                </h3>
                <p
                  className="text-muted-warm mt-3 text-[15px] leading-relaxed"
                  style={{ maxWidth: 620 }}
                  data-testid="morning-brief-summary"
                >
                  Yesterday closed at{" "}
                  <span className="text-cream">$2,847</span> across{" "}
                  <span className="text-cream">86 covers</span>. Best cover:{" "}
                  <span className="text-cream">Sarah M.</span> tipped{" "}
                  <span className="text-cream">22%</span>{" "}
                  <span style={{ color: "#FFD166" }}>★</span>
                </p>
              </div>

              <div
                className="rounded-full font-mono uppercase tracking-[0.18em] text-ghost inline-flex items-center gap-2"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #1E1E1E",
                  padding: "6px 12px",
                  fontSize: 10,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full dot-pulse"
                  style={{ background: "#E8500A" }}
                />
                Auto-refresh · Daily 05:00
              </div>
            </div>

            {/* 3 ranked cards */}
            <div className="mt-8 grid gap-4">
              {CARDS.map((c, i) => {
                const Icon = c.icon;
                const isOpen = open === i;
                return (
                  <div
                    key={c.key}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "#0a0a0a",
                      border: `1px solid ${c.tone.border}`,
                    }}
                    data-testid={`brief-card-${c.key}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full text-left p-5 flex items-start gap-4"
                      data-testid={`brief-card-toggle-${c.key}`}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: c.tone.bg,
                          border: `1px solid ${c.tone.border}`,
                          color: c.tone.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.24em] px-2 py-0.5 rounded-full"
                            style={{
                              color: c.tone.color,
                              background: c.tone.bg,
                              border: `1px solid ${c.tone.border}`,
                            }}
                          >
                            {c.tone.label}
                          </span>
                          <span className="font-mono text-[10px] text-ghost uppercase tracking-[0.18em]">
                            Priority · 0{i + 1}
                          </span>
                        </div>
                        <div
                          className="text-cream font-display"
                          style={{
                            fontSize: "clamp(19px, 2.1vw, 24px)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                          }}
                        >
                          {c.title}
                        </div>
                        <div className="mt-2 space-y-1">
                          {c.lines.map((line, idx) => (
                            <div
                              key={idx}
                              className="text-muted-warm text-[14px] leading-relaxed"
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span
                          className="rounded-full text-[12px] font-medium inline-flex items-center gap-1.5"
                          style={{
                            background: c.tone.bg,
                            color: c.tone.color,
                            border: `1px solid ${c.tone.border}`,
                            padding: "8px 14px",
                          }}
                        >
                          {c.action} <ArrowRight size={12} />
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-muted-warm"
                          aria-hidden
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                          data-testid={`brief-card-detail-${c.key}`}
                        >
                          <div
                            className="px-5 pb-5 grid grid-cols-2 md:grid-cols-4 gap-3"
                            style={{
                              borderTop: `1px dashed ${c.tone.border}`,
                              paddingTop: 16,
                              marginTop: 4,
                            }}
                          >
                            {c.detail.map((d) => (
                              <div
                                key={d.l}
                                className="rounded-lg p-3"
                                style={{
                                  background: "#0f0f0f",
                                  border: "1px solid #171717",
                                }}
                              >
                                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">
                                  {d.l}
                                </div>
                                <div className="text-cream mt-1 text-[14px]" style={{ fontWeight: 500 }}>
                                  {d.v}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Score pills */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3" data-testid="brief-score-pills">
              {SCORE_PILLS.map((p) => (
                <div
                  key={p.l}
                  className="rounded-xl p-4 flex items-center justify-between"
                  style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ghost">
                      {p.l}
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1">
                      <span
                        className="font-display"
                        style={{
                          color: p.tone,
                          fontSize: 28,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {p.v}
                      </span>
                      {p.suffix && (
                        <span className="text-muted-warm font-mono text-[13px]">
                          {p.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="w-2 h-10 rounded-full"
                    style={{ background: p.tone, opacity: 0.5 }}
                  />
                </div>
              ))}
            </div>

            {/* Quick asks */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Mic size={14} color="#FF6B2B" />
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
                  Quick ask · Opens AI chat pre-filled
                </div>
              </div>
              <div className="flex flex-wrap gap-2" data-testid="brief-quick-asks">
                {QUICK_ASKS.map((q, idx) => (
                  <button
                    key={q}
                    type="button"
                    className="rounded-full text-[13px] text-muted-warm hover:text-cream transition-colors inline-flex items-center gap-2"
                    style={{
                      border: "1px solid #1E1E1E",
                      background: "#0d0d0d",
                      padding: "10px 16px",
                    }}
                    data-testid={`brief-quick-ask-${idx}`}
                  >
                    <span style={{ color: "#FF6B2B" }}>&ldquo;</span>
                    {q}
                    <span style={{ color: "#FF6B2B" }}>&rdquo;</span>
                    <ArrowRight size={12} className="text-ghost" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ghost">
              <span>
                Shown before 11:00 · Rotates into full dashboard at 11:00
              </span>
              <span>fig. 04 — morning brief, before service</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MorningBrief;
