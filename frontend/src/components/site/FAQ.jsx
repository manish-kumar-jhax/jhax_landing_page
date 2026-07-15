import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ChapterHeader from "@/components/site/ChapterHeader";

const faqs = [
  {
    q: "We already use Square. Does JHAX replace it?",
    a: "No — JHAX connects to your Square account and makes it smarter. Your POS stays exactly as it is. JHAX sits on top and adds the AI intelligence layer your Square dashboard doesn't have.",
  },
  {
    q: "How long does setup take?",
    a: "Most restaurants are live in under 15 minutes. Connect your Square account, and JHAX starts reading your data immediately. No hardware. No IT person needed.",
  },
  {
    q: "What if I only have one location?",
    a: "JHAX is built for 1–15 location independent operators. Single-location owners see the biggest immediate impact — especially on customer win-back and labor cost savings.",
  },
  {
    q: "Do I need to know anything about AI or tech?",
    a: "If you can send a WhatsApp message, you can use JHAX. The entire interface is plain English questions and answers. No dashboards to configure. No reports to build.",
  },
  {
    q: "How fast will I see results?",
    a: "Most restaurant owners see their first actionable insight within 24 hours of connecting. Campaign ROI data shows within 48 hours of sending your first campaign.",
  },
  {
    q: "Is my customer data safe?",
    a: "Yes. JHAX uses bank-grade encryption. Your data is never sold, never shared, and never used to train general AI models. It stays yours.",
  },
  {
    q: "What does it cost?",
    a: "Plans start at $299/month. Most restaurants save more than that in recovered revenue in their first week. Book a demo and we'll show you the math for your specific restaurant.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts. No lock-in. Cancel with one click. We're confident enough in the product that we don't need to trap you.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" data-testid="faq-section" className="relative py-28 md:py-40">
      <ChapterHeader
        number="06"
        label="Common Questions"
        headline={
          <>
            Real questions.
            <br />
            <span className="text-orange">Straight answers.</span>
          </>
        }
      />

      <div className="max-w-[900px] mx-auto mt-14 px-6 md:px-10">
        <div className="divide-y" style={{ borderColor: "#1E1E1E" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="py-5"
                style={{ borderTop: i === 0 ? "1px solid #1E1E1E" : "none", borderBottom: "1px solid #1E1E1E" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-testid={`faq-toggle-${i}`}
                  className="w-full flex items-center justify-between text-left gap-6"
                >
                  <span
                    className="text-cream"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(17px, 1.6vw, 20px)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      background: isOpen ? "rgba(232,80,10,0.14)" : "#0f0f0f",
                      border: `1px solid ${isOpen ? "rgba(232,80,10,0.4)" : "#1E1E1E"}`,
                      color: isOpen ? "#FF6B2B" : "#6B6866",
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="mt-4 text-muted-warm leading-relaxed"
                        style={{ fontSize: 16, maxWidth: 720 }}
                        data-testid={`faq-answer-${i}`}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
