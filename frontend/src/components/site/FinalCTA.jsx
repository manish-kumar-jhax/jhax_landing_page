import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FinalCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const validate = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async (e) => {
    e?.preventDefault();
    if (!validate(email)) {
      setStatus("error");
      setMessage("Please enter a valid email");
      return;
    }
    setStatus("loading");
    try {
      await axios.post(`${API}/leads`, { email, source: "final_cta" });
      setStatus("success");
      setMessage("We'll be in touch within 24 hours");
      setEmail("");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  const borderColor =
    status === "success"
      ? "#16A34A"
      : status === "error"
      ? "#DC2626"
      : "rgba(255,255,255,0.10)";

  return (
    <section
      id="book-demo"
      data-testid="final-cta"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] blur-3xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,80,10,0.22), transparent)",
        }}
      />

      <div className="relative max-w-[1000px] mx-auto text-center px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase mb-8"
          style={{
            background: "rgba(232,80,10,0.08)",
            border: "1px solid rgba(232,80,10,0.3)",
            color: "#FF6B2B",
            padding: "8px 16px",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: "#E8500A" }} />
          The last thing
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-cream"
          style={{
            fontSize: "clamp(48px, 8vw, 100px)",
            letterSpacing: "-0.045em",
            lineHeight: 0.93,
          }}
        >
          Your competitors
          <br />
          are already
          <br />
          <span className="text-orange">falling behind.</span>
        </motion.h2>

        <p
          className="mt-8 mx-auto text-muted-warm"
          style={{
            maxWidth: 620,
            fontSize: 18,
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Book a free 20-minute demo. We&apos;ll show JHAX live on a real restaurant —
          then show you what it would find in yours.
        </p>

        <form
          onSubmit={submit}
          data-testid="lead-form"
          className="mt-10 mx-auto flex flex-col sm:flex-row gap-3 max-w-[560px]"
        >
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={status === "success" ? "✓ We'll be in touch within 24 hours!" : "your@email.com"}
              data-testid="lead-email-input"
              className="w-full h-[56px] px-6 rounded-full bg-transparent text-cream placeholder:text-muted-warm outline-none transition-all"
              style={{
                border: `1px solid ${borderColor}`,
                background: "#0d0d0d",
                fontSize: 15,
                fontWeight: 500,
              }}
              onFocus={(e) => {
                if (status === "idle") e.currentTarget.style.borderColor = "#E8500A";
              }}
              onBlur={(e) => {
                if (status === "idle") e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              }}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            data-testid="lead-submit-btn"
            className="h-[56px] inline-flex items-center justify-center gap-2 rounded-full px-8 font-semibold whitespace-nowrap"
            style={{
              background: "#E8500A",
              color: "#fff",
              fontSize: 15,
              boxShadow: "0 20px 60px -20px rgba(232,80,10,0.6)",
              transition: "transform .2s ease, box-shadow .2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 28px 72px -20px rgba(232,80,10,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 60px -20px rgba(232,80,10,0.6)";
            }}
          >
            {status === "loading" ? "Booking…" : "Book My Demo"}
            <span aria-hidden>→</span>
          </button>
        </form>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.16em]"
            style={{ color: "#16A34A" }}
            data-testid="lead-success"
          >
            <Check size={14} /> {message}
          </motion.div>
        )}
        {status === "error" && (
          <div
            className="mt-4 text-[13px] font-mono uppercase tracking-[0.16em]"
            style={{ color: "#DC2626" }}
            data-testid="lead-error"
          >
            {message}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-warm">
          {["No credit card", "No commitment", "Live product demo", "Takes 2 minutes"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <span style={{ color: "#E8500A" }}>✓</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
