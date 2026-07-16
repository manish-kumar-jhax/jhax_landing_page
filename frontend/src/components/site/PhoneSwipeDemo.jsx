import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  BarChart3,
  MessageCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  Mic,
  ArrowRight,
  Send,
} from "lucide-react";

const SCREENS = ["morning", "dashboard", "ask"];
const AUTO_MS = 4200;

// ---------- individual screens (all fixed-width, tall-scroll safe) ----------

const MorningScreen = () => (
  <div
    className="h-full overflow-hidden flex flex-col"
    style={{ background: "#0a0a0a", color: "#F5F2ED" }}
    data-testid="phone-screen-morning"
  >
    <div className="px-5 pt-6 pb-3">
      <div
        className="flex items-center gap-2 font-mono uppercase tracking-[0.2em]"
        style={{ fontSize: 9.5, color: "#FF6B2B" }}
      >
        <Sun size={11} /> Morning brief · Thu · 07:42
      </div>
      <div
        className="font-display mt-2"
        style={{ fontSize: 26, letterSpacing: "-0.03em", lineHeight: 1.05 }}
      >
        Good morning, Alex <span aria-hidden>☀️</span>
      </div>
      <div className="mt-2 text-[12.5px] leading-snug" style={{ color: "#6B6866" }}>
        Yesterday your restaurant made{" "}
        <span style={{ color: "#F5F2ED" }}>$2,847</span>. Here are{" "}
        <span style={{ color: "#F5F2ED" }}>3 things</span> that need your
        attention today.
      </div>
    </div>

    <div className="px-4 space-y-2.5 flex-1 overflow-hidden">
      {[
        {
          i: AlertTriangle,
          tag: "ACT TODAY",
          color: "#F87171",
          bg: "rgba(220,38,38,0.10)",
          bd: "rgba(220,38,38,0.35)",
          title: "63 of your regulars haven't been back this month",
          body: "Reach out to bring them back before they leave",
        },
        {
          i: Clock,
          tag: "HEADS UP",
          color: "#FF6B2B",
          bg: "rgba(232,80,10,0.12)",
          bd: "rgba(232,80,10,0.4)",
          title: "Today is Tuesday — your slowest day",
          body: "Here's how to make more money tonight",
        },
        {
          i: Sparkles,
          tag: "OPPORTUNITY",
          color: "#22C55E",
          bg: "rgba(22,163,74,0.10)",
          bd: "rgba(22,163,74,0.35)",
          title: "Your best money-maker is never in your promotions",
          body: "BLT Sandwich · 72% margin · $1,083 this month",
        },
      ].map((c) => {
        const Icon = c.i;
        return (
          <div
            key={c.tag}
            className="rounded-xl p-3 flex items-start gap-3"
            style={{ background: "#0f0f0f", border: `1px solid ${c.bd}` }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: c.bg, border: `1px solid ${c.bd}`, color: c.color }}
            >
              <Icon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-mono uppercase tracking-[0.2em]"
                style={{ fontSize: 8.5, color: c.color }}
              >
                {c.tag}
              </div>
              <div className="text-[13px] mt-0.5" style={{ fontWeight: 600 }}>
                {c.title}
              </div>
              <div className="text-[11.5px] mt-0.5" style={{ color: "#6B6866" }}>
                {c.body}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="px-4 pt-3 pb-4 grid grid-cols-3 gap-2">
      {[
        { l: "Health", v: "74", c: "#22C55E" },
        { l: "Recover", v: "$412", c: "#FF6B2B" },
        { l: "To Do", v: "4", c: "#F5F2ED" },
      ].map((p) => (
        <div
          key={p.l}
          className="rounded-lg py-2 px-2.5 text-center"
          style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
        >
          <div
            className="font-mono uppercase tracking-[0.16em]"
            style={{ fontSize: 8.5, color: "#6B6866" }}
          >
            {p.l}
          </div>
          <div
            className="font-display mt-0.5"
            style={{ color: p.c, fontSize: 18, letterSpacing: "-0.03em" }}
          >
            {p.v}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DashboardScreen = () => {
  // Light theme, matches real product screenshot
  const KPIS = [
    { l: "Total Money", v: "$398", d: "-38.8%", down: true },
    { l: "Tables served", v: "19", d: "-26.9%", down: true, sub: "19 orders today" },
    { l: "Each spend", v: "$21", sub: "on average" },
    { l: "Come back", v: "68%", sub: "returning" },
    { l: "Table Turn", v: "1.19×", sub: "turns/day" },
    { l: "RevPASH", v: "$0.41", sub: "seat · hour" },
    { l: "Tips", v: "$0", sub: "customer" },
    { l: "People", v: "14", sub: "today" },
  ];
  return (
    <div
      className="relative h-full overflow-hidden flex flex-col"
      style={{ background: "#F5F2ED", color: "#0a0a0a" }}
      data-testid="phone-screen-dashboard"
    >
      <div className="px-4 pt-6 pb-3">
        <div
          className="flex items-center justify-between font-mono uppercase tracking-[0.2em]"
          style={{ fontSize: 9, color: "#6B6866" }}
        >
          <span>Today · West Village</span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full dot-pulse"
              style={{ background: "#16A34A" }}
            />
            <span style={{ color: "#16A34A" }}>Square · Live</span>
          </span>
        </div>
        <div
          className="mt-1"
          style={{
            fontFamily: "Bricolage Grotesque, serif",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.03em",
          }}
        >
          Live dashboard
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3">
        <div className="grid grid-cols-2 gap-2">
          {KPIS.map((k) => (
            <div
              key={k.l}
              className="rounded-xl p-2.5"
              style={{
                background: "#ffffff",
                border: "1px solid #eae5df",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
              }}
            >
              <div
                className="font-mono uppercase tracking-[0.15em]"
                style={{ fontSize: 8.5, color: "#8a8785" }}
              >
                {k.l}
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <div
                  style={{
                    fontFamily: "Bricolage Grotesque, serif",
                    fontWeight: 800,
                    fontSize: 22,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {k.v}
                </div>
                {k.d && (
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: k.down ? "#DC2626" : "#16A34A",
                    }}
                  >
                    {k.d}
                  </div>
                )}
              </div>
              {k.sub && (
                <div
                  className="mt-0.5"
                  style={{ fontSize: 10.5, color: "#8a8785" }}
                >
                  {k.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating orange mic */}
      <div className="relative">
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full dot-pulse"
          style={{
            width: 56,
            height: 56,
            bottom: 10,
            background: "#E8500A",
            boxShadow:
              "0 12px 28px -8px rgba(232,80,10,0.55), 0 0 0 6px rgba(232,80,10,0.08)",
            color: "#fff",
          }}
          aria-label="Ask JHAX"
          data-testid="phone-dashboard-mic"
        >
          <Mic size={22} />
        </div>
      </div>
      <div style={{ height: 76 }} />
    </div>
  );
};

const AskScreen = () => (
  <div
    className="h-full overflow-hidden flex flex-col"
    style={{ background: "#0a0a0a", color: "#F5F2ED" }}
    data-testid="phone-screen-ask"
  >
    <div className="px-5 pt-6 pb-3">
      <div
        className="flex items-center gap-2 font-mono uppercase tracking-[0.2em]"
        style={{ fontSize: 9.5, color: "#FF6B2B" }}
      >
        <MessageCircle size={11} /> Ask JHAX anything
      </div>
      <div
        className="font-display mt-2"
        style={{ fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1.05 }}
      >
        What&apos;s on your mind?
      </div>
    </div>

    <div className="flex-1 px-4 space-y-2.5 overflow-hidden">
      {/* User bubble */}
      <div className="flex justify-end">
        <div
          className="rounded-2xl px-3 py-2 max-w-[80%]"
          style={{
            background: "rgba(232,80,10,0.14)",
            border: "1px solid rgba(232,80,10,0.35)",
            color: "#FF6B2B",
            borderBottomRightRadius: 6,
            fontSize: 13,
          }}
        >
          Why is money down today?
        </div>
      </div>
      {/* AI bubble */}
      <div className="flex justify-start">
        <div
          className="rounded-2xl px-3 py-2.5 max-w-[85%]"
          style={{
            background: "#0f0f0f",
            border: "1px solid #1E1E1E",
            borderBottomLeftRadius: 6,
          }}
        >
          <div
            className="font-mono uppercase tracking-[0.2em] mb-1"
            style={{ fontSize: 8.5, color: "#FF6B2B" }}
          >
            JHAX · 60 sec answer
          </div>
          <div className="text-[13px] leading-snug" style={{ color: "#F5F2ED" }}>
            It&apos;s about your regulars{" "}
            <span style={{ color: "#FF6B2B" }}>not coming back</span>.
          </div>
          <div className="text-[11.5px] mt-1.5" style={{ color: "#6B6866" }}>
            63 regulars haven&apos;t been back in 30 days. Bring back 20% of
            them and you get <span style={{ color: "#F5F2ED" }}>$368</span> this week.
          </div>
          <div className="mt-2 flex gap-1.5 flex-wrap">
            <span
              className="rounded-full font-mono"
              style={{
                fontSize: 9,
                padding: "3px 8px",
                background: "#0a0a0a",
                border: "1px solid #1E1E1E",
                color: "#6B6866",
              }}
            >
              People 63
            </span>
            <span
              className="rounded-full font-mono"
              style={{
                fontSize: 9,
                padding: "3px 8px",
                background: "#0a0a0a",
                border: "1px solid #1E1E1E",
                color: "#6B6866",
              }}
            >
              Bring back $368
            </span>
          </div>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 rounded-full"
            style={{
              background: "#E8500A",
              color: "#fff",
              fontSize: 11,
              padding: "5px 10px",
              fontWeight: 500,
            }}
          >
            Send the message <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* Quick chips */}
      <div className="mt-1 space-y-1.5">
        <div
          className="font-mono uppercase tracking-[0.18em]"
          style={{ fontSize: 8.5, color: "#6B6866" }}
        >
          Try one
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Who tipped best?", "Too many staff this week?", "Best money-making dish?"].map(
            (q) => (
              <span
                key={q}
                className="rounded-full"
                style={{
                  fontSize: 11,
                  padding: "5px 10px",
                  background: "#0f0f0f",
                  border: "1px solid #1E1E1E",
                  color: "#6B6866",
                }}
              >
                {q}
              </span>
            ),
          )}
        </div>
      </div>
    </div>

    {/* Input row */}
    <div className="px-3 pb-4 pt-2">
      <div
        className="flex items-center gap-2 rounded-full pl-3 pr-1 py-1"
        style={{ background: "#0f0f0f", border: "1px solid #1E1E1E" }}
      >
        <input
          type="text"
          placeholder="Ask JHAX anything…"
          readOnly
          data-testid="phone-ask-input"
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize: 12.5, color: "#F5F2ED" }}
        />
        <button
          type="button"
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(232,80,10,0.14)", border: "1px solid rgba(232,80,10,0.35)", color: "#FF6B2B" }}
          aria-label="Voice"
        >
          <Mic size={13} />
        </button>
        <button
          type="button"
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "#E8500A", color: "#fff" }}
          aria-label="Send"
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  </div>
);

// ---------- main component ----------

const PhoneSimulator = () => {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dx, setDx] = useState(0);
  const [autoOn, setAutoOn] = useState(true);
  const startX = useRef(0);
  const startY = useRef(0);
  const captured = useRef(false);
  const trackRef = useRef(null);
  const widthRef = useRef(0);

  const clamp = (n) => Math.max(0, Math.min(SCREENS.length - 1, n));

  const goTo = useCallback((i) => {
    setIndex(clamp(i));
    setDx(0);
  }, []);

  // Auto-advance until user interacts
  useEffect(() => {
    if (!autoOn) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SCREENS.length);
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [autoOn]);

  // Measure current track width on resize
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        widthRef.current = trackRef.current.getBoundingClientRect().width;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Pointer events — works for touch, pen, mouse
  const onPointerDown = (e) => {
    // Do not preventDefault — allow clicks on child elements (tabs) to fire.
    // Pointer capture is only acquired once we detect a real horizontal drag.
    setDragging(true);
    captured.current = false;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;
    if (!captured.current) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        captured.current = true;
        setAutoOn(false);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      } else if (Math.abs(deltaY) > 10) {
        setDragging(false);
        return;
      } else {
        return;
      }
    }
    setDx(deltaX);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    // If we never captured a real drag, this was a click — do nothing.
    if (!captured.current) {
      setDx(0);
      return;
    }
    const threshold = Math.max(60, widthRef.current * 0.18);
    if (Math.abs(dx) > threshold) {
      goTo(dx < 0 ? index + 1 : index - 1);
    } else {
      setDx(0);
    }
  };

  // Track total width = N × 100%, so moving one screen = 100/N% of the track.
  const translatePct = -(index * (100 / SCREENS.length));
  const dragPx = dragging ? dx : 0;
  const trackStyle = {
    transform: `translate3d(calc(${translatePct}% + ${dragPx}px), 0, 0)`,
    transition: dragging ? "none" : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <div
      id="phone-swipe"
      data-testid="phone-swipe-section"
      className="relative flex flex-col items-center"
    >
      {/* Orange glow */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            filter: "blur(60px)",
            background:
              "radial-gradient(closest-side, rgba(232,80,10,0.45), transparent 70%)",
            transform: "scale(1.15)",
          }}
        />

        {/* Phone shell */}
        <div
          className="relative select-none"
          style={{
            width: "min(320px, 88vw)",
            aspectRatio: "9 / 19",
            borderRadius: 44,
            background:
              "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
            padding: 10,
            boxShadow:
              "0 40px 120px -30px rgba(0,0,0,0.7), inset 0 0 0 1.5px rgba(232,80,10,0.22), inset 0 0 0 3px #0a0a0a",
            touchAction: "pan-y",
          }}
        >
            {/* Screen area (viewport for the swipe track) */}
            <div
              ref={trackRef}
              className="relative w-full h-full overflow-hidden"
              style={{ borderRadius: 34, cursor: dragging ? "grabbing" : "grab" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              data-testid="phone-swipe-track"
            >
              {/* Dynamic-island notch */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 z-30"
                style={{
                  top: 8,
                  width: 92,
                  height: 24,
                  background: "#0a0a0a",
                  borderRadius: 999,
                }}
              />

              {/* Track — 3 screens side by side */}
              <div
                className="flex h-full will-change-transform"
                style={{ width: `${SCREENS.length * 100}%`, ...trackStyle }}
              >
                <div style={{ width: `${100 / SCREENS.length}%`, height: "100%" }}>
                  <MorningScreen />
                </div>
                <div style={{ width: `${100 / SCREENS.length}%`, height: "100%" }}>
                  <DashboardScreen />
                </div>
                <div style={{ width: `${100 / SCREENS.length}%`, height: "100%" }}>
                  <AskScreen />
                </div>
              </div>

              {/* Bottom tab bar (inside phone, above the screens) */}
              <div
                className="absolute left-0 right-0 flex items-center justify-around z-20"
                style={{
                  bottom: 0,
                  height: 56,
                  background: "rgba(10,10,10,0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderTop: "1px solid #1E1E1E",
                }}
                data-testid="phone-tab-bar"
              >
                {[
                  { key: "morning", label: "MORNING", Icon: Sun },
                  { key: "dashboard", label: "DASHBOARD", Icon: BarChart3 },
                  { key: "ask", label: "ASK AI", Icon: MessageCircle },
                ].map(({ key, label, Icon }, i) => {
                  const isActive = index === i;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setAutoOn(false);
                        goTo(i);
                      }}
                      data-testid={`phone-tab-${key}`}
                      className="flex flex-col items-center justify-center gap-1 h-full"
                      style={{
                        color: isActive ? "#FF6B2B" : "#6B6866",
                        transition: "color .2s",
                        flex: 1,
                      }}
                    >
                      <Icon size={16} />
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 8.5,
                          letterSpacing: "0.18em",
                        }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        {/* Progress dots */}
        <div
          className="mt-8 flex items-center gap-2.5"
          data-testid="phone-swipe-dots"
        >
          {SCREENS.map((s, i) => {
            const isActive = index === i;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setAutoOn(false);
                  goTo(i);
                }}
                data-testid={`phone-dot-${s}`}
                aria-label={`Go to ${s} screen`}
                className="rounded-full transition-all"
                style={{
                  width: isActive ? 28 : 8,
                  height: 8,
                  background: isActive ? "#E8500A" : "#333330",
                  transition: "width .35s cubic-bezier(0.22, 1, 0.36, 1), background .3s",
                }}
              />
            );
          })}
        </div>

        {/* Helper caption */}
        <div
          className="mt-4 font-mono uppercase tracking-[0.22em]"
          style={{ fontSize: 10, color: "#333330" }}
        >
          Swipe · Drag · Tap · Or wait — it auto-advances
        </div>
      </div>
    </div>
  );
};

export default PhoneSimulator;
