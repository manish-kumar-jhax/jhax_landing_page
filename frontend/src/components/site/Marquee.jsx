import React from "react";

/**
 * One slow editorial marquee — kinetic type, VERY subtle, on-brand.
 * Duplicates content twice for seamless loop.
 */
const words = [
  "Your restaurant.",
  "On autopilot.",
  "Answers in 60 seconds.",
  "Finds $400 a week.",
  "Plugs into Square.",
  "Built for restaurant owners.",
  "1 restaurant. 15. Doesn't matter.",
  "Spots it. Finds why. Fixes it. Shows the money back.",
];

const Marquee = () => {
  const content = (
    <div className="flex items-center shrink-0">
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="font-display flex items-center whitespace-nowrap"
          style={{
            fontSize: "clamp(48px, 9vw, 120px)",
            letterSpacing: "-0.045em",
            lineHeight: 1,
            color: i % 2 === 0 ? "#F5F2ED" : "transparent",
            WebkitTextStroke: i % 2 === 1 ? "1px #E8500A" : "0",
            padding: "0 40px",
          }}
        >
          {w}
          <span
            aria-hidden
            className="inline-block ml-10"
            style={{
              width: 14,
              height: 14,
              background: "#E8500A",
              transform: "rotate(45deg)",
            }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="editorial marquee"
      data-testid="editorial-marquee"
      className="relative py-14 md:py-20 overflow-hidden border-y"
      style={{
        background: "#0a0a0a",
        borderColor: "#141414",
      }}
    >
      <div className="flex marquee-track">
        {content}
        {content}
      </div>

      {/* Vignette edges for polish */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #0a0a0a, transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{
          background: "linear-gradient(270deg, #0a0a0a, transparent)",
        }}
      />
    </section>
  );
};

export default Marquee;
