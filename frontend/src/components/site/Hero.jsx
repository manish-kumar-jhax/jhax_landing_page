import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveDemoCard from "@/components/site/LiveDemoCard";

/**
 * Signature on-load moment:
 *  - Line-by-line masked reveal for the two headline lines
 *  - Staggered fade-up for badge, sub, CTA
 *  - Subtle parallax on the demo card as you scroll
 */
const line1 = "Stop guessing.";
const line2 = "Start running.";

const wordStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.25 },
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
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      id="top"
      ref={heroRef}
      data-testid="hero-section"
      className="relative pt-[120px] pb-24 md:pt-[160px] md:pb-32 px-6 md:px-10"
    >
      {/* Ambient orange glow (parallax) */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute left-1/2 top-40 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.18), transparent)",
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

      <div className="relative max-w-[1180px] mx-auto text-center">
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
            padding: "8px 16px",
          }}
          data-testid="hero-live-badge"
        >
          <span
            className="w-1.5 h-1.5 rounded-full dot-pulse"
            style={{ background: "#E8500A" }}
          />
          LIVE · Connected to Square POS · Restaurant AI COO
        </motion.div>

        {/* Headline — masked line reveal */}
        <motion.h1
          variants={wordStagger}
          initial="hidden"
          animate="visible"
          data-testid="hero-headline"
          className="hero-headline mt-8 text-cream"
          style={{
            fontSize: "clamp(52px, 10vw, 128px)",
          }}
        >
          <div className="mask-line block">
            <motion.span variants={wordItem} className="inline-block">
              {line1}
            </motion.span>
          </div>
          <div className="mask-line block">
            <motion.span
              variants={wordItem}
              className="inline-block"
              style={{ color: "#F5F2ED" }}
            >
              Start{" "}
              <span style={{ color: "#E8500A" }}>running</span>.
            </motion.span>
          </div>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          data-testid="hero-subheadline"
          className="mt-7 mx-auto text-muted-warm"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(17px, 1.6vw, 22px)",
            lineHeight: 1.55,
            maxWidth: 640,
          }}
        >
          JHAX watches your restaurant 24/7. It finds what&apos;s costing you money,
          tells you why, and fixes it — before your next service.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a
            href="#book-demo"
            data-testid="hero-cta-book-demo"
            className="inline-flex items-center gap-2"
            style={{
              background: "#E8500A",
              color: "#fff",
              padding: "18px 42px",
              borderRadius: 100,
              fontSize: 17,
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
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ghost">
            No credit card · No commitment · Takes 2 minutes
          </div>
          <a
            href="#problem"
            data-testid="hero-secondary-link"
            className="mt-2 text-muted-warm hover:text-cream transition-colors text-sm"
          >
            See how it works ↓
          </a>
        </motion.div>
      </div>

      {/* Live demo card with parallax */}
      <motion.div
        style={{ y: cardY, scale: cardScale }}
        className="relative max-w-[1180px] mx-auto mt-16 md:mt-24 px-0 md:px-4"
      >
        <LiveDemoCard />
      </motion.div>
    </section>
  );
};

export default Hero;
