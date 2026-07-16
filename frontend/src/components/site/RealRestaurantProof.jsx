import React from "react";
import { motion } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";
import { Plug, Armchair, Search, Mic } from "lucide-react";
import PhoneSimulator from "@/components/site/PhoneSwipeDemo";

const PROOFS = [
  {
    icon: Plug,
    title: "This is connected to Square right now",
    body: (
      <>
        <span className="text-cream">$398</span> isn&apos;t a demo figure — it&apos;s
        what this restaurant made today. JHAX reads it the moment a customer
        pays. No exports. No spreadsheets. No waiting.
      </>
    ),
  },
  {
    icon: Armchair,
    title: "$0.41 — the number Square never shows you",
    body: (
      <>
        It means this restaurant earns{" "}
        <span className="text-cream">41 cents</span> per empty seat per hour.
        The best restaurants make <span className="text-cream">80 cents</span>.
        JHAX tells you exactly how to close that gap.
      </>
    ),
  },
  {
    icon: Search,
    title: "$398 is down — JHAX already knows the reason",
    body: (
      <>
        It&apos;s not fewer people coming in. 63 regulars from last month just
        haven&apos;t been back yet. JHAX found this in{" "}
        <span className="text-cream">60 seconds</span> and has the fix ready.
      </>
    ),
  },
  {
    icon: Mic,
    title: "That orange button lets you talk to your restaurant",
    body: (
      <>
        Press it and ask anything. Get an answer out loud — while you&apos;re
        cooking, serving, or running between tables. No typing needed.
      </>
    ),
  },
];

const RealRestaurantProof = () => {
  return (
    <section
      id="proof"
      data-testid="proof-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="02"
        label="The Proof"
        headline={
          <>
            Not made up.
            <br />
            Not a practice account.
            <br />
            <span className="text-orange">A real restaurant. Today.</span>
          </>
        }
      />

      <div className="max-w-[1280px] mx-auto mt-16 px-6 md:px-10 grid lg:grid-cols-[minmax(0,560px),minmax(0,1fr)] gap-12 md:gap-16 items-center">
        {/* LEFT — phone frame with real screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
          data-testid="proof-phone"
        >
          {/* Orange glow behind phone */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              filter: "blur(60px)",
              background:
                "radial-gradient(closest-side, rgba(232,80,10,0.45), transparent 70%)",
              transform: "scale(1.15)",
            }}
          />

          {/* Floating LIVE · SQUARE badge (top right, offset from phone) */}
          <motion.div
            initial={{ opacity: 0, x: 12, y: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute z-20 inline-flex items-center gap-2 rounded-full whitespace-nowrap"
            style={{
              top: -16,
              right: -24,
              background: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(232,80,10,0.4)",
              padding: "8px 14px",
              boxShadow:
                "0 12px 40px -12px rgba(232,80,10,0.55), 0 0 0 1px rgba(232,80,10,0.18)",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#FF6B2B",
            }}
            data-testid="proof-live-badge"
          >
            <span
              className="w-1.5 h-1.5 rounded-full dot-pulse"
              style={{ background: "#E8500A" }}
            />
            LIVE · SQUARE
          </motion.div>

          {/* Pocket JHAX Simulator — swipeable phone with 3 real screens */}
          <PhoneSimulator />
        </motion.div>

        {/* RIGHT — 4 proof points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {PROOFS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-2xl p-5"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1E1E1E",
                }}
                data-testid={`proof-point-${i}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(232,80,10,0.14)",
                    border: "1px solid rgba(232,80,10,0.35)",
                    color: "#FF6B2B",
                  }}
                >
                  <Icon size={18} />
                </div>
                <h3
                  className="font-display text-cream mb-2"
                  style={{
                    fontSize: 20,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-muted-warm text-[14px] leading-relaxed">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-[1280px] mx-auto mt-14 px-6 md:px-10"
      >
        <div
          className="rounded-full flex flex-wrap items-center justify-between gap-y-2 gap-x-6 px-5 md:px-6 py-3"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(232,80,10,0.28)",
          }}
          data-testid="proof-bottom-strip"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-1.5 h-1.5 rounded-full dot-pulse flex-shrink-0"
              style={{ background: "#E8500A" }}
            />
            <span
              className="text-[12.5px] md:text-[13px] text-muted-warm"
              style={{ lineHeight: 1.5 }}
            >
              This screenshot was taken from a{" "}
              <span className="text-cream">real restaurant in Washington</span>{" "}
              running JHAX on Square. Numbers update every 30 seconds. Nothing
              is staged.
            </span>
          </div>
          <div
            className="font-mono text-[10.5px] uppercase tracking-[0.24em]"
            style={{ color: "#FF6B2B" }}
          >
            Captured · July 2026
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RealRestaurantProof;
