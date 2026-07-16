import React from "react";
import { motion } from "framer-motion";

const stats = [
  { v: "$82.7B", l: "Size of the restaurant AI market by 2034" },
  { v: "60 sec", l: "Time to get a full answer about your restaurant" },
  { v: "$400+", l: "Found per restaurant every week on average" },
  { v: "1 app", l: "Replaces 6+ things restaurant owners use every day" },
];

const Stats = () => {
  return (
    <section
      data-testid="stats-strip"
      className="relative py-16 md:py-20"
      style={{
        background: "rgba(232,80,10,0.04)",
        borderTop: "1px solid rgba(232,80,10,0.28)",
        borderBottom: "1px solid rgba(232,80,10,0.28)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex flex-col"
            data-testid={`stat-${i}`}
          >
            <div
              className="font-display"
              style={{
                color: "#E8500A",
                fontSize: "clamp(44px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              {s.v}
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-warm">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
