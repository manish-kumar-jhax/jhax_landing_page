import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";

const STAGES = [
  { k: "DETECT", d: "Spots the problem before you do" },
  { k: "DIAGNOSE", d: "Tells you exactly why" },
  { k: "ACT", d: "Recommends the fix" },
  { k: "DEPLOY", d: "Executes it with one tap" },
  { k: "MEASURE", d: "Shows what it recovered" },
];

const STEP_MS = 1400;
const PAUSE_MS = 2000;
const ANIM_MS = STAGES.length * STEP_MS;
const CYCLE_MS = ANIM_MS + PAUSE_MS;

// DIAGNOSE is index 1 → competitor bar caps right after DIAGNOSE completes
// = 2/5 of the loop = 40%
const COMPETITOR_CAP = 40;

const TheLoop = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    let last = 0;
    const loop = (now) => {
      const t = (now - start) % CYCLE_MS;
      // Throttle re-renders to ~33ms (~30fps) to keep it smooth but light
      if (t - last > 30 || t < last) {
        setTick(t);
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const inAnimation = tick < ANIM_MS;
  const stepIdx = inAnimation ? Math.floor(tick / STEP_MS) : STAGES.length;
  const stepProg = inAnimation ? (tick % STEP_MS) / STEP_MS : 0;
  const totalProgress = inAnimation
    ? (stepIdx + stepProg) / STAGES.length
    : 1;
  const jhaxWidth = totalProgress * 100;
  const competitorWidth = Math.min(totalProgress * 100, COMPETITOR_CAP);

  return (
    <section id="loop" data-testid="the-loop" className="relative py-28 md:py-40">
      <ChapterHeader
        number="06"
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
            background: "linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)",
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

          {/* Step cards */}
          <div className="relative grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-3">
            {STAGES.map((s, i) => {
              const isActive = inAnimation && i === stepIdx;
              const isCompleted = i < stepIdx || !inAnimation;
              const isFuture = !isActive && !isCompleted;
              const cardBg = isActive
                ? "rgba(232,80,10,0.08)"
                : isCompleted
                ? "#0f0f0f"
                : "#0c0c0c";
              const cardBorder = isActive
                ? "rgba(232,80,10,0.55)"
                : isCompleted
                ? "rgba(245,242,237,0.18)"
                : "#1E1E1E";
              const labelColor = isActive
                ? "#FF6B2B"
                : isCompleted
                ? "#F5F2ED"
                : "#3a3835";
              const numColor = isActive
                ? "#FF6B2B"
                : isCompleted
                ? "#8a8785"
                : "#3a3835";
              const descColor = isActive || isCompleted ? "#6B6866" : "#3a3835";
              const barFillPct = isActive
                ? stepProg * 100
                : isCompleted
                ? 100
                : 0;

              return (
                <div
                  key={s.k}
                  className="relative rounded-xl p-4 md:p-5 flex flex-col justify-between min-h-[150px] overflow-hidden transition-colors"
                  style={{
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    boxShadow: isActive
                      ? "0 20px 60px -30px rgba(232,80,10,0.55)"
                      : "none",
                    transition: "background .3s, border-color .3s, box-shadow .3s",
                  }}
                  data-testid={`loop-stage-${s.k}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div>
                    <div
                      className="font-mono text-[10px] tracking-[0.24em]"
                      style={{ color: numColor, transition: "color .3s" }}
                    >
                      0{i + 1}
                    </div>
                    <div
                      className="font-display mt-2"
                      style={{
                        color: labelColor,
                        fontSize: 24,
                        letterSpacing: "-0.02em",
                        transition: "color .3s",
                      }}
                    >
                      {s.k}
                    </div>
                    <div
                      className="mt-2 text-[13px] leading-snug"
                      style={{ color: descColor, transition: "color .3s" }}
                    >
                      {s.d}
                    </div>
                  </div>

                  {/* Progress bar at bottom */}
                  <div
                    className="absolute left-0 right-0 bottom-0 h-[3px]"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                    data-testid={`loop-bar-${s.k}`}
                  >
                    <div
                      style={{
                        width: `${barFillPct}%`,
                        height: "100%",
                        background: isCompleted
                          ? "rgba(245,242,237,0.6)"
                          : "linear-gradient(90deg, #E8500A, #FF6B2B)",
                        transition: isActive ? "none" : "width .3s, background .3s",
                      }}
                    />
                  </div>

                  {/* Active glow accent */}
                  {isActive && (
                    <div
                      aria-hidden
                      className="absolute -inset-px rounded-xl pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 40px rgba(232,80,10,0.08)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Competitor comparison bars */}
          <div className="relative mt-10 space-y-5" data-testid="loop-comparison">
            {/* Square / Toast */}
            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-[180px] flex items-center gap-2">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-warm"
                >
                  Square / Toast
                </span>
              </div>
              <div
                className="relative flex-1 h-3 rounded-full overflow-hidden"
                style={{
                  background: "#0f0f0f",
                  border: "1px solid #1E1E1E",
                }}
              >
                <div
                  data-testid="competitor-bar-fill"
                  style={{
                    width: `${competitorWidth}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #3a3835 0%, #6B6866 100%)",
                    transition: "width 30ms linear",
                  }}
                />
                {/* Cap marker at 40% (DIAGNOSE boundary) */}
                <div
                  aria-hidden
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${COMPETITOR_CAP}%`,
                    width: 2,
                    background: "rgba(245,242,237,0.15)",
                  }}
                />
              </div>
              <span
                className="font-mono text-[10px] px-2 py-1 rounded-full whitespace-nowrap uppercase tracking-[0.16em]"
                style={{
                  background: "rgba(220,38,38,0.1)",
                  color: "#F87171",
                  border: "1px solid rgba(220,38,38,0.3)",
                }}
                data-testid="competitor-badge"
              >
                Stops here
              </span>
            </div>

            {/* JHAX */}
            <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
              <div className="w-full md:w-[180px] flex items-center gap-2">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: "#FF6B2B" }}
                >
                  JHAX.ai
                </span>
              </div>
              <div
                className="relative flex-1 h-3 rounded-full overflow-hidden"
                style={{
                  background: "#0f0f0f",
                  border: "1px solid rgba(232,80,10,0.28)",
                }}
              >
                <div
                  data-testid="jhax-bar-fill"
                  style={{
                    width: `${jhaxWidth}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #E8500A 0%, #FF6B2B 100%)",
                    boxShadow: "0 0 20px rgba(232,80,10,0.5)",
                    transition: "width 30ms linear",
                  }}
                />
              </div>
              <span
                className="font-mono text-[10px] px-2 py-1 rounded-full whitespace-nowrap uppercase tracking-[0.16em]"
                style={{
                  background: "rgba(232,80,10,0.14)",
                  color: "#FF6B2B",
                  border: "1px solid rgba(232,80,10,0.4)",
                }}
                data-testid="jhax-badge"
              >
                Full loop
              </span>
            </div>
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
              style={{
                fontSize: "clamp(22px, 3vw, 32px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
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
