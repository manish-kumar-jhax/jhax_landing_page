import React from "react";
import { motion } from "framer-motion";

const items = [
  { name: "Square POS", status: "live" },
  { name: "QuickBooks", status: "soon" },
  { name: "WhatsApp Business", status: "soon" },
  { name: "Toast", status: "soon" },
  { name: "Clover", status: "soon" },
];

const TrustStrip = () => {
  return (
    <section
      data-testid="trust-strip"
      className="relative py-8 border-y"
      style={{
        borderColor: "#151515",
        background: "linear-gradient(180deg, rgba(232,80,10,0.02), transparent)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-wrap items-center gap-x-10 gap-y-4">
        <div className="font-mono text-[11px] uppercase text-orange tracking-[0.24em]">
          Integrates With
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {items.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              data-testid={`integration-${it.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center gap-2 text-cream text-[15px]"
              style={{ fontWeight: 500 }}
            >
              <span>{it.name}</span>
              {it.status === "live" ? (
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(22,163,74,0.12)",
                    color: "#16A34A",
                    border: "1px solid rgba(22,163,74,0.35)",
                  }}
                >
                  ✓ LIVE
                </span>
              ) : (
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full text-muted-warm"
                  style={{ border: "1px solid #1E1E1E" }}
                >
                  soon
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-warm">
          <span
            className="w-1.5 h-1.5 rounded-full dot-pulse"
            style={{ background: "#16A34A" }}
          />
          1 restaurant live · Growing
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
