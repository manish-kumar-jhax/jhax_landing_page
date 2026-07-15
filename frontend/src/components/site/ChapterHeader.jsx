import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable numbered section header — "01 / THE PROBLEM"
 * Editorial, monospace chapter number + label.
 */
const ChapterHeader = ({ number, label, headline, sub, align = "left" }) => {
  const isCenter = align === "center";
  return (
    <div
      className={`max-w-[1180px] mx-auto px-6 md:px-10 ${
        isCenter ? "text-center" : "text-left"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
      >
        <span
          className="font-mono text-[11px] tracking-[0.24em] text-orange"
          data-testid={`chapter-num-${number}`}
        >
          {number}
        </span>
        <span
          className="h-px flex-1 max-w-[80px]"
          style={{ background: "linear-gradient(90deg, #E8500A, transparent)" }}
        />
        <span className="font-mono text-[11px] tracking-[0.24em] text-muted-warm uppercase">
          {label}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.08 }}
        className="mt-6 font-display text-cream"
        style={{
          fontSize: "clamp(38px, 6vw, 78px)",
          letterSpacing: "-0.035em",
          lineHeight: 0.95,
        }}
      >
        {headline}
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-5 text-muted-warm ${isCenter ? "mx-auto" : ""}`}
          style={{
            maxWidth: 620,
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.55,
          }}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
};

export default ChapterHeader;
