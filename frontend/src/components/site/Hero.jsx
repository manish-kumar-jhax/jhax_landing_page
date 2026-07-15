import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveDemoCard from "@/components/site/LiveDemoCard";

/**
 * Signature on-load moment:
 *  - Line-by-line masked reveal for the two headline lines
 *  - Staggered fade-up for badge, sub, CTA
 *  - Live Demo Card sits inline (right column desktop / below on mobile)
 *    so it is visible above the fold without scrolling.
 */
const wordStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const wordItem = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="top"
      ref={heroRef}
      data-testid="hero-section"
      className="relative pt-[104px] pb-16 md:pt-[112px] md:pb-24 px-6 md:px-10 min-h-screen"
    >
      {/* Ambient orange glow (parallax) */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute right-[-10%] top-20 w-[900px] h-[900px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.20), transparent)",
          }}
        />
      </motion.div>

      {/* Faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
        }}
      />

      <div className="relative max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr),minmax(0,600px)] gap-10 lg:gap-14 items-center">
        {/* Left column — copy */}
        <div className="text-left">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full font-mono text-[11px] tracking-[0.14em] uppercase"
            style={{
              background: "rgba(232,80,10,0.08)",
              border: "1px solid rgba(232,80,10,0.25)",
              color: "#FF6B2B",
              padding: "8px 14px",
            }}
            data-testid="hero-live-badge"
          >
            <span
              className="w-1.5 h-1.5 rounded-full dot-pulse"
              style={{ background: "#E8500A" }}
            />
            LIVE · Connected to Square POS
          </motion.div>

          {/* Headline — masked line reveal */}
          <motion.h1
            variants={wordStagger}
            initial="hidden"
            animate="visible"
            data-testid="hero-headline"
            className="hero-headline mt-5 text-cream"
            style={{
              fontSize: "clamp(48px, 7.5vw, 96px)",
            }}
          >
            <div className="mask-line block">
              <motion.span variants={wordItem} className="inline-block">
                Stop guessing.
              </motion.span>
            </div>
            <div className="mask-line block">
              <motion.span variants={wordItem} className="inline-block">
                Start <span style={{ color: "#E8500A" }}>running</span>.
              </motion.span>
            </div>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            data-testid="hero-subheadline"
            className="mt-5 text-muted-warm"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.4vw, 20px)",
              lineHeight: 1.55,
              maxWidth: 560,
            }}
          >
            JHAX watches your restaurant 24/7. It finds what&apos;s costing you money,
            tells you why, and fixes it — before your next service.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <a
              href="#book-demo"
              data-testid="hero-cta-book-demo"
              className="inline-flex items-center gap-2"
              style={{
                background: "#E8500A",
                color: "#fff",
                padding: "16px 34px",
                borderRadius: 100,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                boxShadow: "0 20px 60px -20px rgba(232,80,10,0.6)",
                transition: "transform .2s ease, box-shadow .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 28px 72px -20px rgba(232,80,10,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 60px -20px rgba(232,80,10,0.6)";
              }}
            >
              Book My Free Demo <span aria-hidden>→</span>
            </a>
            <a
              href="#problem"
              data-testid="hero-secondary-link"
              className="text-muted-warm hover:text-cream transition-colors text-sm"
            >
              See how it works ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ghost"
          >
            No credit card · No commitment · Takes 2 minutes
          </motion.div>
        </div>

        {/* Right column — Live Demo Card */}
        <motion.div style={{ y: cardY }} className="relative">
          <LiveDemoCard />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
