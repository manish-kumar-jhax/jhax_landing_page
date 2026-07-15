import React from "react";

/**
 * JHAX brand logo — star mark + wordmark.
 * Star: 4-point concave star in orange with a lighter orange dot.
 * Wordmark: "JHA" cream + "X" orange.
 */
export const JhaxMark = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M32 2 C34.5 21.5 42.5 29.5 62 32 C42.5 34.5 34.5 42.5 32 62 C29.5 42.5 21.5 34.5 2 32 C21.5 29.5 29.5 21.5 32 2 Z"
      fill="#E8500A"
    />
    <circle cx="28.5" cy="32" r="3.2" fill="#FF6B2B" />
  </svg>
);

export const JhaxLogo = ({ size = 22, markSize = 28, showDotAi = true }) => (
  <div className="inline-flex items-center gap-2" data-testid="jhax-logo">
    <JhaxMark size={markSize} />
    <span
      style={{
        fontFamily: "Bricolage Grotesque, sans-serif",
        fontWeight: 800,
        fontSize: `${size}px`,
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}
    >
      <span style={{ color: "#F5F2ED" }}>JHA</span>
      <span style={{ color: "#E8500A" }}>X</span>
      {showDotAi && (
        <span
          style={{
            color: "#E8500A",
            fontWeight: 500,
            fontSize: `${Math.round(size * 0.55)}px`,
            marginLeft: 2,
          }}
        >
          .ai
        </span>
      )}
    </span>
  </div>
);

export default JhaxLogo;
