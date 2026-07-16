import React, { useState } from "react";
import { motion } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";
import {
  MessageSquare,
  Activity,
  Target,
  Users,
  Utensils,
  LineChart,
  Clock,
  Building2,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    bg: "#E8500A",
    title: "Ask Anything — AI COO Chat",
    body: "Get a clear answer to any business question in plain English — and one action to take. Voice-enabled for when your hands are full.",
    tag: "No one else does this",
    example: "Try: Why are sales down?",
  },
  {
    icon: Activity,
    bg: "#7C3AED",
    title: "Business Health Score",
    body: "One number (0–100) tells you exactly how healthy your restaurant is right now. See what's dragging your score and precisely what to fix.",
    tag: "Unique to JHAX",
    example: "Currently: 51/100 — 3 fixes identified",
  },
  {
    icon: Target,
    bg: "#E8500A",
    title: "Root Cause Analysis",
    body: "Sales dropped? Know exactly why in 60 seconds — not 3 weeks later. JHAX separates traffic problems from customer problems from menu problems automatically.",
    tag: "60 sec vs. 3 weeks",
    example: "Diagnosed: 63 VIPs not returning · retention issue",
  },
  {
    icon: Users,
    bg: "#0D9488",
    title: "Customer Intelligence",
    body: "Know your VIPs by name. See who's at risk of leaving before they leave. Get alerted the moment your best customers go quiet.",
    tag: "Square can't do this",
    example: "Quinn Reyes · $1,141 LTV · Last visit: today",
  },
  {
    icon: Utensils,
    bg: "#E8500A",
    title: "Menu Intelligence",
    body: "See what's actually making money — not just what looks busy. Build the perfect combo offer from your best-sellers in one click.",
    tag: "Built by AI, priced to sell",
    example: "Wagyu Sliders · 68% margin · 47 units this week",
  },
  {
    icon: LineChart,
    bg: "#16A34A",
    title: "Campaign ROI Tracking",
    body: "See exactly how much revenue each campaign recovered, down to the customer. No more guessing if marketing worked.",
    tag: "Insight → result",
    example: "WhatsApp win-back · +$2,214 · 18.4x ROI",
  },
  {
    icon: Clock,
    bg: "#D97706",
    title: "Labor Cost Intelligence",
    body: "Every Monday, JHAX tells you which shifts are eating your profit — before the week starts. Average saving: $300–800/week per location.",
    tag: "Saves $400+/week",
    example: "Found: Tuesday lunch overstaffed · $340 saved",
  },
  {
    icon: Building2,
    bg: "#2563EB",
    title: "Multi-Location Command",
    body: "Running more than one location? See every branch side by side. Know instantly which manager needs your attention today.",
    tag: "Built for growth",
    example: "West Village · Downtown · Brooklyn — 3 live",
  },
  {
    icon: TrendingUp,
    bg: "#E8500A",
    title: "Revenue Forecasting",
    body: "See where revenue is heading next month — and get specific actions to hit your target before it's too late to change course.",
    tag: "Predict, don't react",
    example: "Next month projection: +$4,820 with plan",
  },
];

const OptimizedWithUnderline = () => (
  <span className="relative inline-block text-orange">
    Optimized.
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0"
      style={{
        bottom: "-0.08em",
        height: "0.08em",
        background:
          "linear-gradient(90deg, #E8500A, #FF6B2B 60%, rgba(232,80,10,0))",
        transformOrigin: "left center",
        borderRadius: 999,
      }}
    />
  </span>
);

const Features = () => {
  const [hovered, setHovered] = useState(-1);
  return (
    <section
      id="features"
      data-testid="features-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="05"
        label="What JHAX Does"
        headline={
          <>
            Every part of your business.
            <br />
            <span className="text-muted-warm">Watched. Fixed.</span>{" "}
            <OptimizedWithUnderline />
          </>
        }
      />

      <div className="max-w-[1280px] mx-auto mt-16 px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {features.map((f, i) => {
          const Icon = f.icon;
          const isHovered = hovered === i;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
              className="group rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "#0d0d0d",
                border: `1px solid ${isHovered ? "rgba(232,80,10,0.4)" : "#1E1E1E"}`,
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                transition:
                  "border-color .25s ease, transform .25s ease, box-shadow .25s ease",
                boxShadow: isHovered
                  ? "0 24px 60px -30px rgba(232,80,10,0.35)"
                  : "none",
              }}
              data-testid={`feature-card-${i}`}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${f.bg}22`,
                    border: `1px solid ${f.bg}55`,
                    color: f.bg,
                  }}
                >
                  <Icon size={20} />
                </div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1 rounded-full"
                  style={{
                    color: "#FF6B2B",
                    background: "rgba(232,80,10,0.08)",
                    border: "1px solid rgba(232,80,10,0.28)",
                  }}
                >
                  {f.tag}
                </span>
              </div>
              <h3
                className="font-display text-cream mb-3"
                style={{
                  fontSize: 22,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.05,
                }}
              >
                {f.title}
              </h3>
              <p className="text-muted-warm leading-relaxed text-[14.5px]">
                {f.body}
              </p>

              {/* Hover reveal example */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? "auto" : 0,
                  y: isHovered ? 0 : -4,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
                data-testid={`feature-example-${i}`}
              >
                <div
                  className="mt-3 pt-3 flex items-center gap-2"
                  style={{ borderTop: "1px dashed rgba(232,80,10,0.28)" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full dot-pulse flex-shrink-0"
                    style={{ background: "#E8500A" }}
                  />
                  <span
                    className="font-mono text-[12px] leading-snug"
                    style={{ color: "#FF6B2B", letterSpacing: "0.005em" }}
                  >
                    {f.example}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
