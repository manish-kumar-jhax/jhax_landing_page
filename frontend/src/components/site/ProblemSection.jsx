import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { X, Check, TrendingUp } from "lucide-react";
import ChapterHeader from "@/components/site/ChapterHeader";

const PAIRS = [
  {
    cost: 486,
    pain: "Sales are down. You open 6 different apps trying to find out why — and still don't know an hour later.",
    fix: "Ask “why are sales down?” Get a root-cause answer in 60 seconds — with one action to take immediately.",
  },
  {
    cost: 340,
    pain: "Your accountant tells you labor was 12% too high. Three weeks after the fact. The money is already gone.",
    fix: "Every Monday at 7am, JHAX tells you which shifts are over-budget this week — before the week starts.",
  },
  {
    cost: 412,
    pain: "Your best customer hasn't been back in 45 days. You never noticed. They found somewhere else.",
    fix: "JHAX flags at-risk customers automatically and launches a win-back campaign before they're gone.",
  },
  {
    cost: 180,
    pain: "Building a promotion takes 2 hours across Instagram, WhatsApp, and your POS. By the time it's live, the slow period is over.",
    fix: "Campaign ready, banner designed, combo offer built — in under 2 minutes. All from one screen.",
  },
  {
    cost: 327,
    pain: "You ran a campaign last Tuesday. You have no idea if it worked. There's no way to know.",
    fix: "See exactly how many customers came back and how much revenue your last campaign recovered.",
  },
  {
    cost: 694,
    pain: "You're overstaffed on Tuesday lunch. Every week. Costing you $340. You just found out in this sentence.",
    fix: "JHAX catches overstaffing every week. Estimated saving: $300–800 per location.",
  },
];

const TOTAL = PAIRS.reduce((a, p) => a + p.cost, 0); // 2,439

const CounterBanner = ({ display }) => {
  const pct = Math.min((display / TOTAL) * 100, 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      data-testid="cost-counter-banner"
      className="relative rounded-2xl p-5 md:p-6 overflow-hidden mb-8"
      style={{
        background: "linear-gradient(90deg, #120806 0%, #0a0a0a 100%)",
        border: "1px solid rgba(220,38,38,0.25)",
        boxShadow: "0 20px 60px -30px rgba(220,38,38,0.35)",
      }}
    >
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-64 h-64 blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(220,38,38,0.35), transparent)",
        }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(220,38,38,0.12)",
              border: "1px solid rgba(220,38,38,0.35)",
            }}
          >
            <TrendingUp size={18} color="#F87171" style={{ transform: "scaleY(-1)" }} />
          </div>
          <div>
            <div
              className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: "#F87171" }}
            >
              What it&apos;s costing you — weekly
            </div>
            <div
              className="font-display mt-1 text-cream"
              style={{
                fontSize: "clamp(38px, 5.5vw, 64px)",
                letterSpacing: "-0.035em",
                lineHeight: 1,
              }}
              data-testid="cost-counter-value"
            >
              ${display.toLocaleString("en-US")}
              <span
                className="text-muted-warm font-mono ml-2"
                style={{ fontSize: 14, letterSpacing: "0.05em" }}
              >
                / week
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[360px]">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ghost mb-2">
            <span>Bleed detected</span>
            <span>${TOTAL.toLocaleString("en-US")} / week</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
          >
            <motion.div
              style={{
                width: `${pct}%`,
                height: "100%",
                background: "linear-gradient(90deg, #DC2626, #F87171)",
                boxShadow: "0 0 20px rgba(220,38,38,0.5)",
                transition: "width .6s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PairRow = ({ index, pair, onReveal }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  useEffect(() => {
    if (inView) onReveal(index, pair.cost);
  }, [inView, index, pair.cost, onReveal]);

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 gap-4 md:gap-6"
      data-testid={`pair-row-${index}`}
    >
      {/* Pain — slides in from left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #100a0a, #0a0a0a)",
          border: "1px solid #1E1414",
        }}
      >
        <div className="flex gap-3">
          <span
            className="flex-shrink-0 mt-1 w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.28)",
            }}
          >
            <X size={13} color="#F87171" />
          </span>
          <div className="flex-1">
            <p className="text-muted-warm text-[15px] leading-relaxed">
              {pair.pain}
            </p>
            <div
              className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-[0.16em]"
              style={{
                background: "rgba(220,38,38,0.1)",
                color: "#F87171",
                border: "1px solid rgba(220,38,38,0.3)",
              }}
              data-testid={`pain-cost-${index}`}
            >
              <span>–</span> ${pair.cost.toLocaleString("en-US")} / week
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fix — slides in from right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0f0d09, #0a0a0a)",
          border: "1px solid rgba(232,80,10,0.25)",
        }}
      >
        <div
          aria-hidden
          className="absolute -right-16 -top-16 w-40 h-40 blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.35), transparent)",
          }}
        />
        <div className="relative flex gap-3">
          <span
            className="flex-shrink-0 mt-1 w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: "rgba(232,80,10,0.14)",
              border: "1px solid rgba(232,80,10,0.35)",
            }}
          >
            <Check size={13} color="#FF6B2B" />
          </span>
          <div className="flex-1">
            <p className="text-cream text-[15px] leading-relaxed">
              {pair.fix}
            </p>
            <div
              className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-[0.16em]"
              style={{
                background: "rgba(22,163,74,0.1)",
                color: "#22C55E",
                border: "1px solid rgba(22,163,74,0.3)",
              }}
              data-testid={`fix-save-${index}`}
            >
              <span>+</span> Saves ${pair.cost.toLocaleString("en-US")} / week
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProblemSection = () => {
  const [revealed, setRevealed] = useState(new Set());
  const [display, setDisplay] = useState(0);

  const onReveal = (i, _cost) => {
    setRevealed((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  };

  // Compute target = sum of costs from revealed indices
  const target = Array.from(revealed).reduce(
    (sum, i) => sum + PAIRS[i].cost,
    0,
  );

  // Animate the display value toward target
  useEffect(() => {
    const controls = animate(display, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="01"
        label="The Problem"
        headline={
          <>
            Running a restaurant today
            <br />
            <span className="text-muted-warm">feels like this.</span>
          </>
        }
      />

      <div className="max-w-[1280px] mx-auto mt-14 px-6 md:px-10">
        <CounterBanner display={display} />

        {/* Column headers */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                background: "rgba(220,38,38,0.08)",
                color: "#F87171",
                border: "1px solid rgba(220,38,38,0.25)",
              }}
            >
              <X size={12} /> Without JHAX
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                background: "rgba(232,80,10,0.08)",
                color: "#FF6B2B",
                border: "1px solid rgba(232,80,10,0.35)",
              }}
            >
              <Check size={12} /> With JHAX
            </span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-5">
          {PAIRS.map((pair, i) => (
            <PairRow key={i} index={i} pair={pair} onReveal={onReveal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
