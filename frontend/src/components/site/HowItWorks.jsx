import React from "react";
import { motion } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";

const steps = [
  {
    n: "01",
    title: "JHAX connects to Square",
    body: "Link your Square POS in minutes. JHAX starts reading your live sales, customers, menu, and labor data immediately. No manual entry. No spreadsheets. No setup calls.",
  },
  {
    n: "02",
    title: "AI detects and diagnoses",
    body: "JHAX watches every metric 24/7. The moment something is wrong — sales drop, labor spikes, a VIP goes quiet — it tells you exactly what happened and precisely why. Before you even open your phone.",
  },
  {
    n: "03",
    title: "You approve. JHAX acts.",
    body: "One tap launches the fix. Campaign sent. Banner live. Combo pushed to your POS. Then JHAX shows you exactly how much revenue came back within 48 hours.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how"
      data-testid="how-it-works"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="03"
        label="How it works"
        headline={
          <>
            From problem detected
            <br />
            to fixed. <span className="text-orange">In minutes.</span>
          </>
        }
      />

      <div className="relative max-w-[1280px] mx-auto mt-16 px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative rounded-2xl p-7 md:p-8 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #0e0e0e 0%, #0a0a0a 100%)",
                border: "1px solid #1E1E1E",
              }}
              data-testid={`step-${s.n}`}
            >
              {/* Huge watermark step number */}
              <div
                aria-hidden
                className="absolute -right-4 -top-8 font-display pointer-events-none select-none"
                style={{
                  fontSize: 220,
                  lineHeight: 1,
                  color: "rgba(232,80,10,0.06)",
                  letterSpacing: "-0.06em",
                }}
              >
                {s.n}
              </div>

              <div className="relative">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-orange">
                  Step {s.n}
                </div>
                <h3
                  className="mt-4 font-display text-cream"
                  style={{
                    fontSize: "clamp(26px, 3vw, 34px)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.05,
                  }}
                >
                  {s.title}
                </h3>
                <p className="mt-4 text-muted-warm leading-relaxed text-[15px]">
                  {s.body}
                </p>
              </div>

              {/* Arrow connector */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full z-10"
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(232,80,10,0.4)",
                    color: "#E8500A",
                    fontSize: 14,
                  }}
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
