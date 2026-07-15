import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import ChapterHeader from "@/components/site/ChapterHeader";

const without = [
  "Sales are down. You open 6 different apps trying to find out why — and still don't know an hour later.",
  "Your accountant tells you labor was 12% too high. Three weeks after the fact. The money is already gone.",
  "Your best customer hasn't been back in 45 days. You never noticed. They found somewhere else.",
  "Building a promotion takes 2 hours across Instagram, WhatsApp, and your POS. By the time it's live, the slow period is over.",
  "You ran a campaign last Tuesday. You have no idea if it worked. There's no way to know.",
  "You're overstaffed on Tuesday lunch. Every week. Costing you $340. You just found out in this sentence.",
];

const withJhax = [
  "Ask “why are sales down?” Get a root-cause answer in 60 seconds — with one action to take immediately.",
  "Every Monday at 7am, JHAX tells you which shifts are over-budget this week — before the week starts.",
  "JHAX flags at-risk customers automatically and launches a win-back campaign before they're gone.",
  "Campaign ready, banner designed, combo offer built — in under 2 minutes. All from one screen.",
  "See exactly how many customers came back and how much revenue your last campaign recovered.",
  "JHAX catches overstaffing every week. Estimated saving: $300–800 per location.",
];

const ProblemSection = () => {
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="01"
        label="The Problem"
        headline={
          <>
            Running a restaurant today
            <br />
            <span className="text-muted-warm">feels like this.</span>
          </>
        }
      />

      <div className="max-w-[1280px] mx-auto mt-16 px-6 md:px-10 grid md:grid-cols-2 gap-6 md:gap-8">
        {/* WITHOUT */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "linear-gradient(180deg, #100a0a, #0a0a0a)",
            border: "1px solid #1E1414",
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                background: "rgba(220,38,38,0.08)",
                color: "#F87171",
                border: "1px solid rgba(220,38,38,0.25)",
              }}
            >
              <X size={12} /> Without JHAX
            </span>
          </div>
          <ul className="space-y-5">
            {without.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex gap-3"
                data-testid={`without-item-${i}`}
              >
                <span
                  className="flex-shrink-0 mt-1 w-5 h-5 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(220,38,38,0.1)",
                    border: "1px solid rgba(220,38,38,0.25)",
                  }}
                >
                  <X size={12} color="#F87171" />
                </span>
                <span className="text-muted-warm text-[15.5px] leading-relaxed">
                  {t}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* WITH JHAX */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0f0d09, #0a0a0a)",
            border: "1px solid rgba(232,80,10,0.3)",
            boxShadow: "0 30px 100px -40px rgba(232,80,10,0.35)",
          }}
        >
          <div
            aria-hidden
            className="absolute top-0 right-0 w-64 h-64 blur-3xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(232,80,10,0.35), transparent)",
            }}
          />
          <div className="relative flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                background: "rgba(232,80,10,0.08)",
                color: "#FF6B2B",
                border: "1px solid rgba(232,80,10,0.35)",
              }}
            >
              <Check size={12} /> With JHAX
            </span>
          </div>
          <ul className="relative space-y-5">
            {withJhax.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex gap-3"
                data-testid={`with-item-${i}`}
              >
                <span
                  className="flex-shrink-0 mt-1 w-5 h-5 rounded-md flex items-center justify-center"
                  style={{
                    background: "rgba(232,80,10,0.12)",
                    border: "1px solid rgba(232,80,10,0.35)",
                  }}
                >
                  <Check size={12} color="#FF6B2B" />
                </span>
                <span className="text-cream text-[15.5px] leading-relaxed">
                  {t}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
