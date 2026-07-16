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
    title: "Ask it anything",
    body: "Type or say any question about your restaurant. Get a clear answer in plain English and one thing to do. Even works while you're cooking — just press the orange button and talk.",
    tag: "No one else does this",
    example: "Try: Why is money down today?",
  },
  {
    icon: Activity,
    bg: "#7C3AED",
    title: "Your restaurant's health score",
    body: "One number from 0 to 100 that tells you if your restaurant is doing well right now. Green means good. Red means fix something today. Simple as that.",
    tag: "Unique to JHAX",
    example: "Right now: 51/100 — 3 things to fix",
  },
  {
    icon: Target,
    bg: "#E8500A",
    title: "Find out why in 60 seconds",
    body: "Money dropped? Instead of spending an hour guessing, ask JHAX. It reads all your numbers and tells you the real reason — in plain English — in under a minute.",
    tag: "60 sec vs. 3 weeks",
    example: "Reason found: 63 regulars stopped coming",
  },
  {
    icon: Users,
    bg: "#0D9488",
    title: "Know your customers by name",
    body: "See who your best customers are, how much they've spent, and when they last came in. Get a warning the moment a good customer starts to drift away — before they're gone.",
    tag: "Square can't do this",
    example: "Quinn Reyes · $1,141 spent · Last visit: today",
  },
  {
    icon: Utensils,
    bg: "#E8500A",
    title: "Find out what's actually making money",
    body: "Not everything on your menu earns the same profit. JHAX shows you what's working — and automatically builds the perfect bundle deal from your best sellers.",
    tag: "Built by JHAX, priced to sell",
    example: "Wagyu Sliders · 68% margin · 47 sold this week",
  },
  {
    icon: LineChart,
    bg: "#16A34A",
    title: "See if your promotion worked",
    body: "After every offer, JHAX shows you exactly how many people came back and how much they spent. No more guessing if it was worth sending.",
    tag: "Answer → result",
    example: "WhatsApp offer · +$2,214 · 47 people came back",
  },
  {
    icon: Clock,
    bg: "#D97706",
    title: "Stop paying for empty shifts",
    body: "Every Monday morning, JHAX tells you which shifts have too many staff for the expected customers — before the week starts. Most restaurants save $300–800 every week just from this.",
    tag: "Saves $400+ every week",
    example: "Found: Tuesday lunch overstaffed · $340 saved",
  },
  {
    icon: Building2,
    bg: "#2563EB",
    title: "See all your restaurants at once",
    body: "Running more than one location? See them all side by side. Instantly know which one needs your attention today — and why.",
    tag: "Built for growth",
    example: "West Village · Downtown · Brooklyn — 3 live",
  },
  {
    icon: TrendingUp,
    bg: "#E8500A",
    title: "Know how much you'll make next month",
    body: "JHAX looks at your patterns and tells you where your money is heading — and gives you specific things to do right now to hit your target before it's too late.",
    tag: "See it coming",
    example: "Next month: +$4,820 with the plan",
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
