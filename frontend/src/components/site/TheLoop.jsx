import React from "react";
import { motion } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";

const stages = [
  { k: "DETECT", d: "Spots the problem before you do" },
  { k: "DIAGNOSE", d: "Tells you exactly why" },
  { k: "ACT", d: "Recommends the fix" },
  { k: "DEPLOY", d: "Executes it with one tap" },
  { k: "MEASURE", d: "Shows what it recovered" },
];

const TheLoop = () => {
  return (
    <section id="loop" data-testid="the-loop" className="relative py-28 md:py-40">
      <ChapterHeader
        number="05"
        label="Your Competitive Advantage"
        headline={
          <>
            The only restaurant AI
            <br />
            <span className="text-orange">that completes the full loop.</span>
          </>
        }
      />

      <div className="max-w-[1280px] mx-auto mt-16 px-6 md:px-10">
        <div
          className="relative rounded-2xl p-6 md:p-10 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)",
            border: "1px solid #1E1E1E",
          }}
        >
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[300px] blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(232,80,10,0.25), transparent)",
            }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-2 items-stretch">
            {stages.map((s, i) => (
              <React.Fragment key={s.k}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="rounded-xl p-4 md:p-5 flex flex-col justify-between min-h-[130px]"
                  style={{
                    background: i === 4 ? "rgba(232,80,10,0.08)" : "#0f0f0f",
                    border: `1px solid ${
                      i === 4 ? "rgba(232,80,10,0.4)" : "#1E1E1E"
                    }`,
                  }}
                  data-testid={`loop-stage-${s.k}`}
                >
                  <div
                    className="font-mono text-[10px] tracking-[0.24em]"
                    style={{ color: i === 4 ? "#FF6B2B" : "#6B6866" }}
                  >
                    0{i + 1}
                  </div>
                  <div
                    className="font-display mt-2"
                    style={{
                      color: i === 4 ? "#FF6B2B" : "#F5F2ED",
                      fontSize: 24,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.k}
                  </div>
                  <div className="mt-2 text-muted-warm text-[13px] leading-snug">
                    {s.d}
                  </div>
                </motion.div>
                {i < stages.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden md:hidden items-center justify-center text-orange"
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 rounded-xl p-5 md:p-6 relative"
            style={{
              background: "#0a0a0a",
              borderLeft: "3px solid #E8500A",
              border: "1px solid #1E1E1E",
              borderLeftWidth: 3,
              borderLeftColor: "#E8500A",
            }}
            data-testid="loop-callout"
          >
            <div className="font-mono text-[10px] uppercase text-orange tracking-[0.24em] mb-2">
              The moat
            </div>
            <p
              className="text-cream font-display"
              style={{ fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              <em style={{ fontStyle: "italic", color: "#6B6866" }}>
                Every competitor stops at
              </em>{" "}
              DIAGNOSE.
              <br />
              <em style={{ fontStyle: "italic", color: "#6B6866" }}>
                JHAX goes all the way to
              </em>{" "}
              <span className="text-orange">MEASURE.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TheLoop;
