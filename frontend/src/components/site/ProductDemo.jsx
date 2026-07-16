import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";
import {
  Mic,
  MessageSquare,
  Users,
  Utensils,
  Megaphone,
  Clock,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "ask", label: "Ask Anything", icon: MessageSquare },
  { key: "customers", label: "Customers", icon: Users },
  { key: "menu", label: "Menu", icon: Utensils },
  { key: "marketing", label: "Marketing AI", icon: Megaphone },
  { key: "labor", label: "Labor", icon: Clock },
];

// ---------- DASHBOARD ----------
const DashboardTab = () => {
  const kpis = [
    { label: "Total Revenue", value: "$398", delta: "-38.8%", down: true },
    { label: "Covers", value: "19", delta: "-26.9%", down: true },
    { label: "Avg Order Value", value: "$21", delta: "-4.1%", down: true },
    {
      label: "Health Score",
      value: "51/100",
      tag: "RED",
      accent: "#7C3AED",
    },
  ];
  const health = [
    { l: "Revenue growth", v: 7 },
    { l: "Repeat customers", v: 100 },
    { l: "Labor efficiency", v: 82 },
  ];
  const quickAsks = [
    "Why are sales down?",
    "Who are my VIPs?",
    "Am I overstaffed?",
  ];
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl p-4"
            style={{
              background: "#0f0f0f",
              border: `1px solid ${k.accent ? "rgba(124,58,237,0.35)" : "#1E1E1E"}`,
            }}
            data-testid={`kpi-${k.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ghost">
              {k.label}
            </div>
            <div className="flex items-baseline gap-2 mt-2 flex-wrap">
              <div
                className="font-display text-cream"
                style={{ fontSize: 30, letterSpacing: "-0.03em" }}
              >
                {k.value}
              </div>
              {k.delta && (
                <div
                  className="font-mono text-[11px]"
                  style={{ color: k.down ? "#DC2626" : "#16A34A" }}
                >
                  {k.delta}
                </div>
              )}
              {k.tag && (
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    color: "#A78BFA",
                    border: "1px solid rgba(124,58,237,0.35)",
                  }}
                >
                  {k.tag}
                </span>
              )}
            </div>
            {k.label === "Health Score" && (
              <div className="mt-3 space-y-1.5">
                {health.map((b) => (
                  <div key={b.l} className="flex items-center gap-2">
                    <div className="font-mono text-[10px] text-muted-warm w-[110px]">
                      {b.l}
                    </div>
                    <div
                      className="flex-1 h-1 rounded-full overflow-hidden"
                      style={{ background: "#1a1a1a" }}
                    >
                      <div
                        className="h-full"
                        style={{
                          width: `${b.v}%`,
                          background: "linear-gradient(90deg, #7C3AED, #E8500A)",
                        }}
                      />
                    </div>
                    <div className="font-mono text-[10px] text-cream w-6 text-right">
                      {b.v}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-4 md:p-5 flex items-center gap-3"
        style={{
          background:
            "linear-gradient(90deg, rgba(232,80,10,0.06), rgba(232,80,10,0.02))",
          border: "1px solid rgba(232,80,10,0.28)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(232,80,10,0.14)",
            border: "1px solid rgba(232,80,10,0.35)",
          }}
        >
          <Mic size={16} color="#FF6B2B" />
        </div>
        <div className="flex-1">
          <div className="text-cream text-[15px] md:text-[17px]" style={{ fontWeight: 500 }}>
            How is my business today?
          </div>
          <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.18em]">
            Press mic to speak or type
          </div>
        </div>
        <button
          type="button"
          className="hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-medium"
          style={{ background: "#E8500A", color: "#fff" }}
        >
          Ask →
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickAsks.map((q) => (
          <button
            key={q}
            type="button"
            className="px-3 py-1.5 rounded-full text-[12px] text-muted-warm hover:text-cream transition-colors"
            style={{ border: "1px solid #1E1E1E", background: "#0d0d0d" }}
          >
            {q}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange mb-2">
          AI COO · Live diagnosis
        </div>
        <div
          className="text-cream text-[18px] md:text-[22px] font-display"
          style={{ letterSpacing: "-0.02em" }}
        >
          Revenue is down 38.8% — not a traffic problem, a
          <span className="text-orange"> retention problem</span>.
        </div>
        <div className="text-muted-warm mt-2 text-[15px] leading-relaxed">
          63 of your best customers haven&apos;t returned in 30 days.
          Reactivating 20% recovers ~
          <span className="text-cream">$368</span> this week. One tap deploys the
          win-back campaign to WhatsApp + SMS.
        </div>
      </div>
    </div>
  );
};

// ---------- ASK ANYTHING ----------
const askQuestions = [
  "Why are my sales down 38.8% today?",
  "Which of my 3 branches needs attention?",
  "Am I overstaffed this Tuesday lunch?",
  "Who are my top 20 customers this month?",
];
const AskAnythingTab = () => {
  const [q, setQ] = useState(0);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setText("");
    setDone(false);
    let i = 0;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      if (i < askQuestions[q].length) {
        i += 1;
        setText(askQuestions[q].slice(0, i));
        setTimeout(step, 40);
      } else {
        setDone(true);
        setTimeout(() => {
          if (!cancelled) setQ((v) => (v + 1) % askQuestions.length);
        }, 2400);
      }
    };
    const t = setTimeout(step, 120);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  return (
    <div className="grid gap-5">
      <div
        className="rounded-xl p-5"
        style={{
          background: "linear-gradient(90deg, rgba(232,80,10,0.05), transparent)",
          border: "1px solid rgba(232,80,10,0.28)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(232,80,10,0.14)",
              border: "1px solid rgba(232,80,10,0.35)",
            }}
          >
            <Mic size={16} color="#FF6B2B" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ghost">
            Operator asks
          </div>
        </div>
        <div
          className="text-cream text-[22px] md:text-[26px] font-display"
          style={{ letterSpacing: "-0.02em", minHeight: 36 }}
        >
          &ldquo;{text}
          {!done && <span className="caret" />}
          {done && <span>&rdquo;</span>}
        </div>
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
            AI COO · Decision
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
          style={{ fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Retention problem, not traffic.
        </div>
        <div
          className="font-mono text-[11px] mt-1"
          style={{ color: "#16A34A" }}
        >
          [+$368/wk recoverable]
        </div>
        <p className="text-muted-warm mt-3 text-[15px] leading-relaxed">
          63 of your best customers haven&apos;t returned in 30 days. Reactivating
          20% recovers ~<span className="text-cream">$368</span> this week. One
          tap deploys the win-back campaign to WhatsApp + SMS.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            ["At-risk", "63"],
            ["Est. recovery", "$368"],
            ["Response time", "60 sec"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="px-3 py-1.5 rounded-full font-mono text-[11px]"
              style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
            >
              <span className="text-ghost">{l}: </span>
              <span className="text-cream">{v}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-full text-[13px] font-medium"
          style={{
            background: "#E8500A",
            color: "#fff",
            padding: "10px 20px",
          }}
        >
          Launch Win-Back Campaign <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ---------- CUSTOMERS ----------
const CustomersTab = () => {
  const stats = [
    { l: "Total Customers", v: "100", c: "#F5F2ED" },
    { l: "VIPs", v: "37", c: "#16A34A" },
    { l: "At-Risk", v: "10", c: "#DC2626" },
    { l: "Repeat Rate", v: "68%", c: "#F5F2ED" },
  ];
  const vips = [
    { n: "Quinn Reyes", v: "$1,141", visits: "9 visits" },
    { n: "Casey Lopez", v: "$1,066", visits: "8 visits" },
    { n: "Sam Nguyen", v: "$823", visits: "7 visits" },
  ];
  const risks = [
    { n: "Morgan Singh", v: "$829", last: "31 days ago" },
    { n: "Logan Garcia", v: "$486", last: "24 days ago" },
    { n: "Elliot Nguyen", v: "$354", last: "22 days ago" },
  ];
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.l}
            className="rounded-xl p-4"
            style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ghost">
              {s.l}
            </div>
            <div
              className="font-display mt-2"
              style={{ fontSize: 30, letterSpacing: "-0.03em", color: s.c }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* VIPs */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
              Top VIPs
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">
              This month
            </div>
          </div>
          <ul className="space-y-3">
            {vips.map((v, i) => (
              <li
                key={v.n}
                className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: "#0f0f0f", border: "1px solid #171717" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px]"
                    style={{
                      background: "rgba(22,163,74,0.14)",
                      color: "#22C55E",
                      border: "1px solid rgba(22,163,74,0.3)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-cream text-[14.5px]" style={{ fontWeight: 500 }}>
                      {v.n}
                    </div>
                    <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.16em]">
                      {v.visits}
                    </div>
                  </div>
                </div>
                <div className="text-cream font-mono text-[13px]">{v.v}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* At-Risk */}
        <div
          className="rounded-xl p-5"
          style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: "#DC2626" }}>
              At-Risk
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">
              Haven&apos;t returned
            </div>
          </div>
          <ul className="space-y-3">
            {risks.map((v) => (
              <li
                key={v.n}
                className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: "#0f0f0f", border: "1px solid #171717" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(220,38,38,0.12)",
                      color: "#F87171",
                      border: "1px solid rgba(220,38,38,0.35)",
                      fontSize: 12,
                    }}
                  >
                    !
                  </div>
                  <div>
                    <div className="text-cream text-[14.5px]" style={{ fontWeight: 500 }}>
                      {v.n}
                    </div>
                    <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.16em]">
                      Last: {v.last}
                    </div>
                  </div>
                </div>
                <div className="text-muted-warm font-mono text-[13px]">{v.v}</div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full text-[13px] font-medium"
            style={{
              background: "#E8500A",
              color: "#fff",
              padding: "10px 20px",
            }}
          >
            Send Win-Back <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- MENU ----------
const MenuTab = () => {
  const profitable = [
    { n: "BLT Sandwich", v: "$1,083", m: "72%" },
    { n: "Caesar Salad", v: "$779", m: "68%" },
    { n: "Cheeseburger", v: "$751", m: "64%" },
  ];
  const under = [
    { n: "Iced Latte", v: "$452", m: "22%" },
    { n: "Chocolate Cake", v: "$539", m: "31%" },
  ];
  return (
    <div className="grid gap-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-5"
          style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange mb-4">
            Most Profitable
          </div>
          <ul className="space-y-3">
            {profitable.map((p, i) => (
              <li
                key={p.n}
                className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: "#0f0f0f", border: "1px solid #171717" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px]"
                    style={{
                      background: "rgba(22,163,74,0.14)",
                      color: "#22C55E",
                      border: "1px solid rgba(22,163,74,0.3)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-cream text-[14.5px]" style={{ fontWeight: 500 }}>
                      {p.n}
                    </div>
                    <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.16em]">
                      Margin {p.m}
                    </div>
                  </div>
                </div>
                <div className="text-cream font-mono text-[13px]">{p.v}</div>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-xl p-5"
          style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: "#DC2626", marginBottom: 16 }}>
            Underperforming
          </div>
          <ul className="space-y-3">
            {under.map((p) => (
              <li
                key={p.n}
                className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: "#0f0f0f", border: "1px solid #171717" }}
              >
                <div>
                  <div className="text-cream text-[14.5px]" style={{ fontWeight: 500 }}>
                    {p.n}
                  </div>
                  <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.16em]">
                    Margin {p.m}
                  </div>
                </div>
                <div className="text-muted-warm font-mono text-[13px]">{p.v}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Combo builder */}
      <div
        className="rounded-xl p-5 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(120deg, rgba(232,80,10,0.06), rgba(232,80,10,0.01))",
          border: "1px solid rgba(232,80,10,0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} color="#FF6B2B" />
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
            AI Combo Builder
          </div>
        </div>
        <div
          className="text-cream font-display"
          style={{ fontSize: 26, letterSpacing: "-0.02em" }}
        >
          Bistro Deal
        </div>
        <div className="text-muted-warm text-[15px] mt-1">
          Cheeseburger + Truffle Fries + Iced Latte
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div
            className="text-cream font-display"
            style={{ fontSize: 30, letterSpacing: "-0.03em" }}
          >
            $21.99
          </div>
          <div
            className="font-mono text-[11px] px-2 py-1 rounded-full"
            style={{
              background: "rgba(22,163,74,0.14)",
              color: "#22C55E",
              border: "1px solid rgba(22,163,74,0.3)",
            }}
          >
            Save 5.4%
          </div>
          <div className="font-mono text-[11px] text-ghost">
            Lifts attach rate ~+18%
          </div>
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-full text-[13px] font-medium"
          style={{
            background: "#E8500A",
            color: "#fff",
            padding: "10px 20px",
          }}
        >
          Generate Combo <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ---------- MARKETING AI ----------
const MarketingTab = () => {
  const goals = [
    "Reactivate inactive customers",
    "Fill Tuesday lunch",
    "Push high-margin combo",
    "Promote new menu item",
  ];
  const [goal, setGoal] = useState(0);
  return (
    <div className="grid gap-5">
      <div
        className="rounded-xl p-5"
        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange mb-3">
          Campaign Generator · Goal
        </div>
        <div className="flex flex-wrap gap-2">
          {goals.map((g, i) => (
            <button
              key={g}
              type="button"
              onClick={() => setGoal(i)}
              className="px-3 py-2 rounded-full text-[12.5px] transition-colors"
              style={{
                background: goal === i ? "rgba(232,80,10,0.14)" : "#0f0f0f",
                color: goal === i ? "#FF6B2B" : "#8a8785",
                border: `1px solid ${goal === i ? "rgba(232,80,10,0.4)" : "#1E1E1E"}`,
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Banner preview */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid #1E1E1E" }}
      >
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ borderColor: "#1E1E1E", background: "#0a0a0a" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ghost">
            Banner preview · Generated in 3s
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-warm">
            WhatsApp · SMS · IG
          </div>
        </div>
        <div
          className="relative p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, #1a0d05 0%, #E8500A 55%, #FF6B2B 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(#00000030 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />
          <div className="relative">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "#FFE3D0" }}
            >
              We miss you — come back this week
            </div>
            <div
              className="mt-2 font-display text-white"
              style={{ fontSize: "clamp(28px, 3.8vw, 44px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Your favorite table
              <br />
              is waiting.
            </div>
            <div
              className="mt-3 font-mono text-[12px]"
              style={{ color: "#FFE3D0" }}
            >
              20% off your next visit · Valid this week only
            </div>
          </div>
        </div>
      </div>

      {/* ROI card */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
            Campaign ROI
          </div>
          <div
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(22,163,74,0.14)",
              color: "#22C55E",
              border: "1px solid rgba(22,163,74,0.3)",
            }}
          >
            SUCCESS
          </div>
        </div>
        <div
          className="text-cream font-display"
          style={{ fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          Last campaign recovered
          <span className="text-orange"> $340 in 48 hours</span> — 8 customers returned.
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            ["Sent to", "127"],
            ["Opened", "89"],
            ["Redeemed", "8"],
            ["Recovered", "$340"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="px-3 py-1.5 rounded-full font-mono text-[11px]"
              style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
            >
              <span className="text-ghost">{l}: </span>
              <span className="text-cream">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- LABOR ----------
const LaborTab = () => {
  const metrics = [
    { l: "Labor Cost %", v: "38%", sub: "Target 30%", c: "#DC2626", bad: true },
    { l: "Overtime Hours", v: "14 hrs", sub: "This week", c: "#DC2626", bad: true },
    { l: "Revenue per Staff", v: "$43/hr", sub: "Above avg", c: "#22C55E", bad: false },
  ];
  const shifts = [
    { name: "Tue Lunch — Kitchen", staff: "3 cooks", need: "2", waste: "$142" },
    { name: "Wed Dinner — Front", staff: "5 servers", need: "4", waste: "$96" },
    { name: "Sat Lunch — Bar", staff: "2 bar", need: "1", waste: "$78" },
  ];
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div
            key={m.l}
            className="rounded-xl p-4"
            style={{
              background: "#0f0f0f",
              border: `1px solid ${m.bad ? "rgba(220,38,38,0.3)" : "rgba(22,163,74,0.28)"}`,
            }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ghost">
              {m.l}
            </div>
            <div className="flex items-baseline gap-2 mt-2 flex-wrap">
              <div
                className="font-display"
                style={{ fontSize: 30, letterSpacing: "-0.03em", color: m.c }}
              >
                {m.v}
              </div>
              <div className="font-mono text-[11px] text-muted-warm">{m.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
              Monday Morning Report
            </div>
            <div
              className="text-cream font-display mt-1"
              style={{ fontSize: 22, letterSpacing: "-0.02em" }}
            >
              3 overstaffed shifts this week
            </div>
          </div>
          <div
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(220,38,38,0.12)",
              color: "#F87171",
              border: "1px solid rgba(220,38,38,0.3)",
            }}
          >
            $316 waste
          </div>
        </div>
        <ul className="space-y-3">
          {shifts.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between rounded-lg px-3 py-3"
              style={{ background: "#0f0f0f", border: "1px solid #171717" }}
            >
              <div>
                <div className="text-cream text-[14.5px]" style={{ fontWeight: 500 }}>
                  {s.name}
                </div>
                <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.16em]">
                  {s.staff} scheduled · needs {s.need}
                </div>
              </div>
              <div className="font-mono text-[13px]" style={{ color: "#F87171" }}>
                {s.waste}
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-full text-[13px] font-medium"
          style={{
            background: "#E8500A",
            color: "#fff",
            padding: "10px 20px",
          }}
        >
          Adjust This Week&apos;s Schedule <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

// ---------- MAIN ----------
const ProductDemo = () => {
  const [active, setActive] = useState("dashboard");

  const renderTab = () => {
    switch (active) {
      case "dashboard":
        return <DashboardTab />;
      case "ask":
        return <AskAnythingTab />;
      case "customers":
        return <CustomersTab />;
      case "menu":
        return <MenuTab />;
      case "marketing":
        return <MarketingTab />;
      case "labor":
        return <LaborTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <section
      id="product"
      data-testid="product-demo-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="03"
        label="The Product"
        headline={
          <>
            Everything happening
            <br />
            in your restaurant.
            <br />
            <span className="text-orange">One screen.</span>
          </>
        }
      />

      <div className="relative max-w-[1280px] mx-auto mt-14 px-4 md:px-10">
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-10 w-[1000px] h-[400px] blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.22), transparent)",
          }}
        />

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
          data-testid="product-mockup"
        >
          {/* Window chrome */}
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
              jhax.ai · West Village
            </div>
            <div className="ml-auto flex items-center gap-2 font-mono text-[10px] text-muted-warm">
              <span
                className="w-1.5 h-1.5 rounded-full dot-pulse"
                style={{ background: "#16A34A" }}
              />
              Square · Live
            </div>
          </div>

          {/* Tab row */}
          <div
            className="flex flex-wrap gap-2 px-5 py-3 border-b"
            style={{ borderColor: "#161616" }}
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  data-testid={`product-tab-${t.key}`}
                  onClick={() => setActive(t.key)}
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 rounded-full uppercase tracking-[0.14em] transition-colors"
                  style={{
                    background: isActive ? "rgba(232,80,10,0.12)" : "transparent",
                    color: isActive ? "#FF6B2B" : "#6B6866",
                    border: `1px solid ${isActive ? "rgba(232,80,10,0.35)" : "#1E1E1E"}`,
                  }}
                >
                  <Icon size={12} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Content — fade cross-fade, consistent min-height so no jump */}
          <div className="p-5 md:p-8" style={{ minHeight: 640 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                data-testid={`product-panel-${active}`}
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ghost px-2">
          <span>fig. 02 — live dashboard, west village · nov 24</span>
          <span>frame 001 / 003</span>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
