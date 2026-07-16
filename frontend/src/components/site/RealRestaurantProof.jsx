import React from "react";
import { motion } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";
import { Plug, Armchair, Search, Mic } from "lucide-react";

const REAL_SCREENSHOT =
  "https://customer-assets-v7afamib.emergentagent.net/job_full-page-preview-2/artifacts/zp4txbfj_WhatsApp%20Image%202026-07-14%20at%205.20.02%20PM.jpeg";

const PROOFS = [
  {
    icon: Plug,
    title: "Square is live",
    body: (
      <>
        POS connected in real time. Every order, cover, tip and repeat-customer
        signal is read directly from Square — no exports, no spreadsheets. That
        is why the panel reads{" "}
        <span className="text-cream">19 orders · 14 unique customers</span>{" "}
        without a human touching a keyboard.
      </>
    ),
  },
  {
    icon: Armchair,
    title: "RevPASH $0.41",
    body: (
      <>
        Revenue per available seat per hour — the single hardest restaurant KPI
        to calculate. Most POS dashboards never show it. JHAX auto-computes it
        every 30 seconds from the same Square data.
      </>
    ),
  },
  {
    icon: Search,
    title: "Why $398 is down",
    body: (
      <>
        Revenue is <span className="text-cream">–38.8%</span> vs yesterday, but
        traffic held —{" "}
        <span className="text-cream">14 unique customers</span> and{" "}
        <span className="text-cream">68% repeat rate</span>. Not a traffic
        problem, a retention problem. JHAX has already flagged the 3 dormant
        VIPs to reactivate before dinner service.
      </>
    ),
  },
  {
    icon: Mic,
    title: "The orange mic button",
    body: (
      <>
        Voice-first AI COO. Press the dot, ask{" "}
        <em className="text-cream" style={{ fontStyle: "italic" }}>
          &ldquo;why is Tuesday slow?&rdquo;
        </em>
        , and get a 60-second, root-cause answer while walking the floor.
        Answers are read out loud so the operator&apos;s hands stay free.
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
            Not a mockup.
            <br />
            Not a demo account.
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

          {/* Landscape device frame — matches the actual light-theme dashboard aspect */}
          <div
            className="relative mx-auto"
            style={{
              width: "min(560px, 92vw)",
              aspectRatio: "16 / 9.5",
              borderRadius: 22,
              background:
                "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
              padding: 8,
              boxShadow:
                "0 40px 120px -30px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(232,80,10,0.22)",
            }}
          >
            {/* Screen chrome bar */}
            <div
              className="relative w-full flex items-center gap-2 px-3"
              style={{
                height: 22,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                background: "#0a0a0a",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: "#242424" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "#242424" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "#242424" }} />
              <span
                className="ml-3 font-mono uppercase"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  color: "#6B6866",
                }}
              >
                jhax.ai · west village · today
              </span>
            </div>

            {/* Screen */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: "calc(100% - 22px)",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                background: "#F5F2ED",
              }}
            >
              <img
                src={REAL_SCREENSHOT}
                alt="Real JHAX dashboard — light theme — Washington restaurant, Square live"
                data-testid="proof-screenshot"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                  background: "#F5F2ED",
                }}
              />
            </div>
          </div>
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
