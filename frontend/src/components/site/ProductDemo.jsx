import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterHeader from "@/components/site/ChapterHeader";
import { Mic } from "lucide-react";

const tabs = ["Dashboard", "Ask Anything", "Customers", "Menu", "Marketing AI", "Labor"];

const kpis = [
  { label: "Total Revenue", value: "$398", delta: "-38.8%", down: true },
  { label: "Covers", value: "19", delta: "-26.9%", down: true },
  { label: "Avg Order Value", value: "$21", delta: "-4.1%", down: true },
  { label: "Health Score", value: "51/100", tag: "RED", accent: "#7C3AED" },
];

const healthBreakdown = [
  { l: "Revenue growth", v: 7 },
  { l: "Repeat customers", v: 100 },
  { l: "Labor efficiency", v: 82 },
];

const quickAsks = ["Why are sales down?", "Who are my VIPs?", "Am I overstaffed?"];

const ProductDemo = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <section
      id="product"
      data-testid="product-demo-section"
      className="relative py-28 md:py-40"
    >
      <ChapterHeader
        number="02"
        label="The Product"
        headline={
          <>
            Everything happening
            <br />
            in your restaurant.
            <br />
            <span className="text-orange">One screen.</span>
          </>
        }
      />

      <div className="relative max-w-[1280px] mx-auto mt-14 px-4 md:px-10">
        {/* Spotlight backdrop for the product "photography" */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-10 w-[1000px] h-[400px] blur-3xl opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.22), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[22px] overflow-hidden"
          style={{
            background: "#0c0c0c",
            border: "1px solid #1E1E1E",
            boxShadow:
              "0 60px 160px -40px rgba(232,80,10,0.25), 0 0 0 1px rgba(255,255,255,0.02)",
          }}
          data-testid="product-mockup"
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-3 px-5 py-3 border-b"
            style={{ borderColor: "#161616", background: "#0a0a0a" }}
          >
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#242424" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#242424" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#242424" }} />
            </div>
            <div className="font-mono text-[11px] text-ghost">jhax.ai · West Village</div>
            <div className="ml-auto flex items-center gap-2 font-mono text-[10px] text-muted-warm">
              <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: "#16A34A" }} />
              Square · Live
            </div>
          </div>

          {/* Tab row */}
          <div className="flex flex-wrap gap-2 px-5 py-3 border-b" style={{ borderColor: "#161616" }}>
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                data-testid={`product-tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActive(t)}
                className="font-mono text-[11px] px-3 py-1.5 rounded-full uppercase tracking-[0.14em] transition-colors"
                style={{
                  background: active === t ? "rgba(232,80,10,0.12)" : "transparent",
                  color: active === t ? "#FF6B2B" : "#6B6866",
                  border: `1px solid ${active === t ? "rgba(232,80,10,0.35)" : "#1E1E1E"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Content grid */}
          <div className="p-5 md:p-8 grid gap-5">
            {/* KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpis.map((k, i) => (
                <div
                  key={k.label}
                  className="rounded-xl p-4"
                  style={{
                    background: "#0f0f0f",
                    border: `1px solid ${k.accent ? "rgba(124,58,237,0.35)" : "#1E1E1E"}`,
                  }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ghost">
                    {k.label}
                  </div>
                  <div className="flex items-baseline gap-2 mt-2">
                    <div
                      className="font-display text-cream"
                      style={{ fontSize: 30, letterSpacing: "-0.03em" }}
                    >
                      {k.value}
                    </div>
                    {k.delta && (
                      <div
                        className="font-mono text-[11px]"
                        style={{ color: k.down ? "#DC2626" : "#16A34A" }}
                      >
                        {k.delta}
                      </div>
                    )}
                    {k.tag && (
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(124,58,237,0.12)",
                          color: "#A78BFA",
                          border: "1px solid rgba(124,58,237,0.35)",
                        }}
                      >
                        {k.tag}
                      </span>
                    )}
                  </div>

                  {k.label === "Health Score" && (
                    <div className="mt-3 space-y-1.5">
                      {healthBreakdown.map((b) => (
                        <div key={b.l} className="flex items-center gap-2">
                          <div className="font-mono text-[10px] text-muted-warm w-[110px]">
                            {b.l}
                          </div>
                          <div
                            className="flex-1 h-1 rounded-full overflow-hidden"
                            style={{ background: "#1a1a1a" }}
                          >
                            <div
                              className="h-full"
                              style={{
                                width: `${b.v}%`,
                                background:
                                  "linear-gradient(90deg, #7C3AED, #E8500A)",
                              }}
                            />
                          </div>
                          <div className="font-mono text-[10px] text-cream w-6 text-right">
                            {b.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ask Anything bar */}
            <div
              className="rounded-xl p-4 md:p-5 flex items-center gap-3"
              style={{
                background:
                  "linear-gradient(90deg, rgba(232,80,10,0.06), rgba(232,80,10,0.02))",
                border: "1px solid rgba(232,80,10,0.28)",
              }}
              data-testid="product-ask-bar"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(232,80,10,0.14)", border: "1px solid rgba(232,80,10,0.35)" }}
              >
                <Mic size={16} color="#FF6B2B" />
              </div>
              <div className="flex-1">
                <div className="text-cream text-[15px] md:text-[17px]" style={{ fontWeight: 500 }}>
                  How is my business today?
                </div>
                <div className="font-mono text-[10px] text-ghost uppercase tracking-[0.18em]">
                  Press mic to speak or type
                </div>
              </div>
              <button
                type="button"
                className="hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-medium"
                style={{ background: "#E8500A", color: "#fff" }}
              >
                Ask →
              </button>
            </div>

            {/* Quick asks */}
            <div className="flex flex-wrap gap-2">
              {quickAsks.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="px-3 py-1.5 rounded-full text-[12px] text-muted-warm hover:text-cream hover:border-jhax-glow transition-colors"
                  style={{ border: "1px solid #1E1E1E", background: "#0d0d0d" }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Simulated AI response */}
            <div
              className="rounded-xl p-5"
              style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange mb-2">
                AI COO · Live diagnosis
              </div>
              <div
                className="text-cream text-[18px] md:text-[22px] font-display"
                style={{ letterSpacing: "-0.02em" }}
              >
                Revenue is down 38.8% — not a traffic problem, a
                <span className="text-orange"> retention problem</span>.
              </div>
              <div className="text-muted-warm mt-2 text-[15px] leading-relaxed">
                63 of your best customers haven&apos;t returned in 30 days.
                Reactivating 20% recovers ~<span className="text-cream">$368</span> this
                week. One tap deploys the win-back campaign to WhatsApp + SMS.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clipped-frame corner tags */}
        <div className="mt-6 flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ghost px-2">
          <span>fig. 02 — live dashboard, west village · nov 24</span>
          <span>frame 001 / 003</span>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
