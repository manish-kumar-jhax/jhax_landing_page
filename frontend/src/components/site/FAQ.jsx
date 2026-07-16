import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ChapterHeader from "@/components/site/ChapterHeader";

const faqs = [
  {
    q: "We already use Square. Do we have to switch?",
    a: "No — you keep Square exactly as it is. JHAX connects to your Square and makes it smarter. Think of Square as the cash register and JHAX as the business brain sitting on top. Setup takes about 15 minutes.",
  },
  {
    q: "Is this hard to use? I'm not a tech person.",
    a: "If you can send a WhatsApp message, you can use JHAX. Just type or say a question — like 'why is money down today?' — and JHAX answers in plain English. No charts to figure out. No reports to build. No tech knowledge needed.",
  },
  {
    q: "What if I only have one location?",
    a: "JHAX works just as well for one restaurant as it does for five. In fact, single-location owners usually see the biggest results fastest — because every answer goes directly into one place.",
  },
  {
    q: "How fast will I see results?",
    a: "Most restaurant owners get their first useful answer within 24 hours of connecting. Promotion results — how many people came back and how much they spent — show up within 48 hours of sending.",
  },
  {
    q: "Is my customer information safe?",
    a: "Yes. Your data is locked with bank-level security. We never sell it, never share it, and never use it for anything other than helping your specific restaurant. It's yours — always.",
  },
  {
    q: "How much does it cost?",
    a: "Plans start at $299 a month. Most restaurants make that back in the first week just from finding customers who haven't come back and fixing overstaffed shifts. Book a demo and we'll show you the math for your restaurant specifically.",
  },
  {
    q: "Can I cancel if I don't like it?",
    a: "Yes, anytime. No contracts. No penalty. One click and you're done. We're confident enough in what JHAX does that we don't need to lock you in.",
  },
  {
    q: "Still have a question?",
    a: "We'll answer it live on the demo call. Book a free 20-minute session and ask us anything — about the product, the price, how it works for your specific restaurant. No pressure.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" data-testid="faq-section" className="relative py-28 md:py-40">
      <ChapterHeader
        number="07"
        label="Common Questions"
        headline={
          <>
            Things people
            <br />
            <span className="text-orange">always ask us.</span>
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
