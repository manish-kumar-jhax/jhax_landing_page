import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  MessageSquare,
  Clock,
  Activity,
  Wrench,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Download,
  Loader2,
} from "lucide-react";

// Prefer the build-time env var (set on Vercel); fall back to the deployed
// Render backend so the app still works if the env var isn't configured.
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://jhax-landing-page.onrender.com";
const API = `${BACKEND_URL}/api`;

// Kept in sync with the backend heuristics (server.py).
const BENCHMARK_RATING = 4.7;
const VISIBILITY_REVIEW_FLOOR = 150;

// ---------- Loading steps ----------
const LOADING_STEPS = [
  { emoji: "🔍", label: "Finding your restaurant" },
  { emoji: "📖", label: "Reading your reviews" },
  { emoji: "⏰", label: "Checking your busy hours" },
  { emoji: "🏆", label: "Comparing to other restaurants nearby" },
  { emoji: "💰", label: "Finding money leaks" },
];

// ---------- Example chips (real, findable restaurants) ----------
const EXAMPLES = [
  { name: "Katz's Delicatessen", city: "New York", label: "Katz's Delicatessen · New York" },
  { name: "Franklin Barbecue", city: "Austin", label: "Franklin Barbecue · Austin" },
  { name: "Pike Place Chowder", city: "Seattle", label: "Pike Place Chowder · Seattle" },
];

// Finding tiers -> Lucide icon + colour (no emojis in new UI, per brand rules).
const TIER_STYLES = {
  URGENT: { Icon: AlertTriangle, color: "#F87171", bg: "rgba(220,38,38,0.10)", bd: "rgba(220,38,38,0.35)" },
  "FIX THIS": { Icon: Wrench, color: "#FF6B2B", bg: "rgba(232,80,10,0.12)", bd: "rgba(232,80,10,0.40)" },
  OPPORTUNITY: { Icon: Sparkles, color: "#22C55E", bg: "rgba(22,163,74,0.10)", bd: "rgba(22,163,74,0.30)" },
};

// ---------- Turn the API response into what the report UI renders ----------
const buildFindings = ({ rating, reviewCount, moneyLost, openNow }) => {
  const out = [];

  if (rating != null && rating < BENCHMARK_RATING) {
    const gap = (BENCHMARK_RATING - rating).toFixed(1);
    out.push({
      tier: rating < 4.0 ? "URGENT" : "FIX THIS",
      title: `Your rating is ${rating.toFixed(1)}★ — ${gap} below the 4.7 that keeps tables full`,
      body: "Each star is worth ~5–9% of revenue. Reply to recent reviews and fix the top complaint — that's the fastest lift.",
      impact: moneyLost ? `$${moneyLost.toLocaleString("en-US")} / week` : null,
    });
  } else if (rating != null) {
    out.push({
      tier: "OPPORTUNITY",
      title: `Your ${rating.toFixed(1)}★ rating is doing the heavy lifting`,
      body: "You're at or above the 4.7 benchmark. Protect it — a single quiet month of unanswered reviews can undo it fast.",
      impact: null,
    });
  }

  if (reviewCount != null) {
    if (reviewCount < VISIBILITY_REVIEW_FLOOR) {
      out.push({
        tier: "FIX THIS",
        title: `Only ${reviewCount.toLocaleString("en-US")} public reviews — you're hard to find`,
        body: "Thin review counts push you down Google's local results. A simple 'leave us a review' prompt at checkout compounds every week.",
        impact: null,
      });
    } else {
      out.push({
        tier: "OPPORTUNITY",
        title: `${reviewCount.toLocaleString("en-US")} reviews is real reach`,
        body: "You already have the audience. Turning happy reviewers into referrers is the cheapest growth you'll find.",
        impact: null,
      });
    }
  }

  if (openNow === false) {
    out.push({
      tier: "OPPORTUNITY",
      title: "You're closed right now — are your Google hours exact?",
      body: "Wrong or missing hours are a top cause of lost walk-ins. Double-check every day, including holidays.",
      impact: null,
    });
  }

  return out.slice(0, 3);
};

const buildReportFromApi = (data) => {
  const p = data.place || {};
  const est = data.estimated || {};
  const oh = p.opening_hours || {};
  const rating = typeof p.rating === "number" ? p.rating : null;
  const reviewCount = typeof p.review_count === "number" ? p.review_count : null;
  const openNow = oh.open_now;
  const moneyLost = est.money_lost_weekly ?? 0;

  const kpis = [
    {
      label: "Rating",
      value: rating != null ? rating.toFixed(1) : "—",
      suffix: rating != null ? "★" : "",
      icon: Star,
    },
    {
      label: "Reviews",
      value: reviewCount != null ? reviewCount.toLocaleString("en-US") : "—",
      icon: MessageSquare,
    },
    {
      label: "Open now",
      value: openNow === true ? "Open" : openNow === false ? "Closed" : "—",
      icon: Clock,
    },
    {
      label: "Health",
      value: est.health_score != null ? String(est.health_score) : "—",
      suffix: "/100",
      icon: Activity,
    },
  ];

  return {
    name: p.name || "Your restaurant",
    location: p.address || "From public info only",
    dataSource: data.data_source || "estimated",
    healthScore: est.health_score ?? 0,
    healthLabel: est.health_label || "",
    moneyLost,
    basis: est.basis || "",
    kpis,
    reviews: Array.isArray(p.top_reviews) ? p.top_reviews : [],
    findings: buildFindings({ rating, reviewCount, moneyLost, openNow }),
  };
};

// ---------- Small building blocks ----------
const HealthScoreDial = ({ value }) => {
  const size = 128;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 75 ? "#22C55E" : pct >= 50 ? "#FF6B2B" : "#F87171";
  const label = pct >= 75 ? "Good" : pct >= 50 ? "Needs work" : "At risk";
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
      data-testid="audit-health-dial"
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#1E1E1E"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: `rotate(-90deg)`, transformOrigin: "50% 50%" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="font-display text-cream"
          style={{ fontSize: 36, letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          {pct}
        </div>
        <div
          className="font-mono uppercase tracking-[0.2em]"
          style={{ fontSize: 9, color }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

// Real Google reviews — replaces the old (fabricated) popular-times chart,
// since the Places API does not expose hourly traffic.
const ReviewsPanel = ({ reviews }) => (
  <div
    className="rounded-2xl p-5"
    style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
    data-testid="audit-reviews"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
        What people are saying
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost">
        From Google
      </div>
    </div>
    {reviews.length === 0 ? (
      <div className="text-muted-warm text-[13px]">No public reviews yet.</div>
    ) : (
      <div className="space-y-3">
        {reviews.slice(0, 3).map((r, i) => (
          <div
            key={i}
            className="rounded-xl p-3"
            style={{ background: "#0d0d0d", border: "1px solid #1E1E1E" }}
            data-testid={`audit-review-${i}`}
          >
            <div className="flex items-center justify-between mb-1 gap-2">
              <span className="text-cream text-[13px] truncate" style={{ fontWeight: 500 }}>
                {r.author || "Google user"}
              </span>
              {r.rating != null && (
                <span className="font-mono text-[11px] text-orange whitespace-nowrap">
                  {r.rating}★
                </span>
              )}
            </div>
            {r.text && (
              <div
                className="text-muted-warm text-[12.5px] leading-snug"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {r.text}
              </div>
            )}
            {r.relative_time && (
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ghost mt-1.5">
                {r.relative_time}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

// ---------- PDF report template (separate, light, print-optimized) ----------
// We do NOT screenshot the dark on-screen card. Building a fresh light DOM node
// avoids framer-motion residue (the source of the faded health-score/title
// "ghosting") and lets us control margins, spacing, and pagination for print.
const escHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const pdfScoreColor = (v) => (v >= 75 ? "#16A34A" : v >= 50 ? "#E8500A" : "#DC2626");
const PDF_TIER_COLOR = { URGENT: "#DC2626", "FIX THIS": "#E8500A", OPPORTUNITY: "#16A34A" };

const buildPdfTemplate = (report) => {
  const money = "$" + (report.moneyLost || 0).toLocaleString("en-US") + " / wk";
  const sColor = pdfScoreColor(report.healthScore);

  const sectionTitle = (t) =>
    `<div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#E8500A;font-weight:700;">${t}</div>`;

  const kpiHtml = (report.kpis || [])
    .map(
      (k) => `
      <div style="flex:1;border:1px solid #e6e2dc;border-radius:10px;padding:10px 12px;background:#faf8f5;">
        <div style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#9a9691;">${escHtml(k.label)}</div>
        <div style="font-size:19px;font-weight:800;color:#141414;margin-top:3px;">${escHtml(k.value)}${
        k.suffix ? `<span style="font-size:12px;color:#E8500A;font-weight:700;"> ${escHtml(k.suffix)}</span>` : ""
      }</div>
      </div>`
    )
    .join("");

  const findingsHtml =
    (report.findings || [])
      .map((f) => {
        const c = PDF_TIER_COLOR[f.tier] || "#E8500A";
        return `
        <div style="border:1px solid #e6e2dc;border-left:4px solid ${c};border-radius:8px;padding:11px 13px;margin-top:9px;background:#ffffff;break-inside:avoid;page-break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
            <span style="font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${c};">${escHtml(f.tier)}</span>
            ${f.impact ? `<span style="font-size:11px;font-weight:700;color:${c};white-space:nowrap;">~${escHtml(f.impact)}</span>` : ""}
          </div>
          <div style="font-size:13.5px;font-weight:600;color:#141414;margin-top:5px;line-height:1.3;">${escHtml(f.title)}</div>
          <div style="font-size:11.5px;color:#5c5854;margin-top:4px;line-height:1.45;">${escHtml(f.body)}</div>
        </div>`;
      })
      .join("") ||
    `<div style="font-size:12px;color:#6B6866;margin-top:9px;">No findings.</div>`;

  const reviewsHtml =
    report.reviews && report.reviews.length
      ? report.reviews
          .slice(0, 3)
          .map(
            (r) => `
          <div style="border:1px solid #e6e2dc;border-radius:8px;padding:10px 12px;margin-top:9px;background:#faf8f5;break-inside:avoid;page-break-inside:avoid;">
            <div style="display:flex;justify-content:space-between;gap:10px;">
              <span style="font-size:12px;font-weight:600;color:#141414;">${escHtml(r.author || "Google user")}</span>
              ${r.rating != null ? `<span style="font-size:11px;font-weight:700;color:#E8500A;">${escHtml(r.rating)}★</span>` : ""}
            </div>
            ${r.text ? `<div style="font-size:11.5px;color:#5c5854;margin-top:4px;line-height:1.45;">${escHtml(r.text)}</div>` : ""}
            ${
              r.relative_time
                ? `<div style="font-size:9.5px;color:#9a9691;margin-top:5px;text-transform:uppercase;letter-spacing:0.06em;">${escHtml(r.relative_time)}</div>`
                : ""
            }
          </div>`
          )
          .join("")
      : `<div style="font-size:12px;color:#6B6866;margin-top:9px;border:1px dashed #e0dcd5;border-radius:8px;padding:12px;background:#faf8f5;">No public reviews available for this restaurant.</div>`;

  const bannerHtml =
    report.dataSource === "estimated"
      ? `<div style="flex:1;border:1px solid #f0d9c9;border-radius:12px;padding:13px 15px;background:#fff6f0;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-size:10.5px;font-weight:700;color:#B23A06;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">These numbers are estimated</div>
          <div style="font-size:11.5px;line-height:1.5;color:#5c5854;">Location is real; rating and reviews are modelled from public map data. Full verified analysis is available once connected to Google.</div>
        </div>`
      : "";

  const root = document.createElement("div");
  root.setAttribute("data-jhax-pdf", "true");
  root.style.cssText =
    "width:100%;background:#ffffff;color:#141414;box-sizing:border-box;padding:2px 2px 6px;" +
    "font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;" +
    "opacity:1;transform:none;animation:none;transition:none;";
  root.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:2px solid #E8500A;padding-bottom:12px;">
      <div style="min-width:0;">
        <div style="font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:#E8500A;font-weight:700;">Restaurant Health</div>
        <div style="font-size:25px;font-weight:800;line-height:1.15;margin-top:4px;color:#141414;opacity:1;transform:none;animation:none;transition:none;">${escHtml(report.name)}</div>
        <div style="font-size:11.5px;color:#6B6866;margin-top:4px;line-height:1.35;">${escHtml(report.location)}</div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-size:9.5px;letter-spacing:0.1em;text-transform:uppercase;color:#9a9691;">Est. money lost</div>
        <div style="font-size:22px;font-weight:800;color:#E8500A;line-height:1.05;margin-top:3px;white-space:nowrap;">${escHtml(money)}</div>
      </div>
    </div>

    <div style="display:flex;gap:12px;margin-top:16px;">
      <div style="flex-shrink:0;width:120px;border:1px solid #e6e2dc;border-radius:12px;padding:14px 10px;text-align:center;background:#faf8f5;">
        <div style="font-size:40px;font-weight:800;line-height:1;color:${sColor};opacity:1;transform:none;animation:none;transition:none;">${escHtml(report.healthScore)}</div>
        <div style="font-size:9.5px;letter-spacing:0.1em;text-transform:uppercase;color:${sColor};margin-top:5px;font-weight:700;">${escHtml(report.healthLabel || "")}</div>
        <div style="font-size:9px;color:#9a9691;margin-top:2px;">Health score / 100</div>
      </div>
      ${bannerHtml}
    </div>

    <div style="margin-top:20px;">
      ${sectionTitle("Key numbers")}
      <div style="display:flex;gap:9px;margin-top:8px;">${kpiHtml}</div>
    </div>

    <div style="margin-top:20px;">
      ${sectionTitle("What JHAX found")}
      ${findingsHtml}
    </div>

    <div style="margin-top:20px;">
      ${sectionTitle("What people are saying")}
      ${reviewsHtml}
    </div>
  `;
  return root;
};

// ---------- Main component ----------
const FreeAudit = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | report | error
  const [stepIndex, setStepIndex] = useState(0);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [pdfState, setPdfState] = useState("idle"); // idle | working
  const timeoutsRef = useRef([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const parseQuery = (q) => {
    const cleaned = (q || "").replace(/https?:\/\/\S+/g, "").trim();
    const sep = cleaned.includes("·") ? "·" : cleaned.includes(",") ? "," : null;
    if (sep) {
      const idx = cleaned.indexOf(sep);
      return {
        name: cleaned.slice(0, idx).trim(),
        city: cleaned.slice(idx + sep.length).trim(),
      };
    }
    return { name: cleaned, city: "" };
  };

  const runAudit = async ({ name, city, display }) => {
    clearTimers();
    if (display !== undefined) setQuery(display);
    setError("");
    setReport(null);
    setState("loading");
    setStepIndex(0);
    // Advance the step indicators while the real request is in flight.
    LOADING_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setStepIndex(i), i * 620);
      timeoutsRef.current.push(t);
    });

    try {
      const { data } = await axios.post(`${API}/audit`, { name, city });
      clearTimers();
      setStepIndex(LOADING_STEPS.length - 1);
      setReport(buildReportFromApi(data));
      setState("report");
    } catch (err) {
      clearTimers();
      const status = err?.response?.status;
      let msg;
      if (status === 404) {
        msg = `We couldn't find "${name}"${city ? ` in ${city}` : ""} on Google. Check the spelling, or add the city.`;
      } else if (status === 503) {
        msg = "Live lookups aren't switched on yet — this needs a Google Places API key.";
      } else if (status === 400) {
        msg = "Type a restaurant name to run the audit.";
      } else {
        msg = "Something went wrong looking that up. Give it another try in a moment.";
      }
      setError(msg);
      setState("error");
    }
  };

  const submit = (e) => {
    e?.preventDefault?.();
    const { name, city } = parseQuery(query);
    if (!name) return;
    runAudit({ name, city });
  };

  const submitExample = (ex) => {
    runAudit({ name: ex.name, city: ex.city, display: ex.label });
  };

  const reset = () => {
    clearTimers();
    setState("idle");
    setReport(null);
    setError("");
    setQuery("");
  };

  const slugify = (s) =>
    (s || "restaurant")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "restaurant";

  // Export a proper, print-optimized PDF report (NOT a screenshot of the dark
  // on-screen card). We build a fresh light-background template from the report
  // data, capture it with html2pdf.js on standard A4 pages with margins reserved
  // for a running header/footer, then draw the header/footer + page numbers on
  // every page via jsPDF. A4 in POINTS (unit:'pt') keeps html2pdf's pagebreak
  // plugin and slicer consistent so content paginates cleanly with no cut-off.
  const downloadPdf = async () => {
    if (!report || pdfState === "working") return;
    setPdfState("working");
    let holder = null;
    try {
      // Ensure brand web-fonts are painted before rasterizing.
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch (_) {
          /* non-fatal */
        }
      }

      const html2pdf = (await import("html2pdf.js")).default;
      const el = buildPdfTemplate(report);

      // Belt-and-suspenders anti-ghosting: force these off on every node right
      // before capture so no inherited animation/transform/opacity can fade text.
      el.querySelectorAll("*").forEach((n) => {
        n.style.opacity = "1";
        n.style.transform = "none";
        n.style.animation = "none";
        n.style.transition = "none";
      });

      // Attach off-screen so fonts/computed styles resolve during capture.
      holder = document.createElement("div");
      holder.style.cssText = "position:fixed;left:-10000px;top:0;width:676px;background:#ffffff;";
      holder.appendChild(el);
      document.body.appendChild(holder);

      const dateStr = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      await html2pdf()
        .set({
          // [top, left, bottom, right] pt — reserves the header/footer bands and
          // keeps content off every edge.
          margin: [64, 44, 54, 44],
          filename: `${slugify(report.name)}-jhax-audit-report.pdf`,
          image: { type: "png" },
          html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
          jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        })
        .from(el)
        .toPdf()
        .get("pdf", (pdf) => {
          const total = pdf.internal.getNumberOfPages();
          const pw = pdf.internal.pageSize.getWidth();
          const ph = pdf.internal.pageSize.getHeight();
          for (let i = 1; i <= total; i++) {
            pdf.setPage(i);

            // Header: "JHAX — Free Restaurant Audit Report"  +  date
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(232, 80, 10);
            pdf.text("JHAX", 44, 38);
            const jw = pdf.getTextWidth("JHAX");
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(70, 70, 70);
            pdf.text(" — Free Restaurant Audit Report", 44 + jw, 38);
            pdf.setTextColor(150, 150, 150);
            pdf.text(dateStr, pw - 44, 38, { align: "right" });
            pdf.setDrawColor(228, 224, 218);
            pdf.setLineWidth(0.5);
            pdf.line(44, 46, pw - 44, 46);

            // Footer: "Generated by JHAX"  +  page number
            pdf.setDrawColor(228, 224, 218);
            pdf.setLineWidth(0.5);
            pdf.line(44, ph - 36, pw - 44, ph - 36);
            pdf.setFontSize(8.5);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(150, 150, 150);
            pdf.text("Generated by JHAX", 44, ph - 22);
            pdf.text(`Page ${i} of ${total}`, pw - 44, ph - 22, { align: "right" });
          }
        })
        .save();
    } catch (err) {
      // Keep the report intact; surface the failure without a hard crash.
      // eslint-disable-next-line no-console
      console.error("PDF export failed", err);
    } finally {
      if (holder && holder.parentNode) holder.parentNode.removeChild(holder);
      setPdfState("idle");
    }
  };

  const totalImpact = report ? report.moneyLost : 0;

  return (
    <section
      id="audit"
      data-testid="free-audit-section"
      className="relative py-24 md:py-32"
    >
      {/* Ambient orange glow */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 -top-10 w-[900px] h-[420px] blur-3xl opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,80,10,0.22), transparent)",
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full font-mono uppercase tracking-[0.18em]"
            style={{
              background: "rgba(232,80,10,0.08)",
              border: "1px solid rgba(232,80,10,0.28)",
              color: "#FF6B2B",
              padding: "6px 14px",
              fontSize: 10.5,
            }}
          >
            Free Restaurant Audit
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-cream mt-5 mx-auto"
            style={{
              fontSize: "clamp(30px, 5vw, 60px)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            Find out what your restaurant is losing —{" "}
            <span className="text-orange">for free</span>.
          </motion.h2>
          <p
            className="mt-5 mx-auto text-muted-warm"
            style={{ maxWidth: 620, fontSize: 16, lineHeight: 1.55, fontWeight: 300 }}
          >
            No sign-up. No credit card. Just type your restaurant name and we&apos;ll
            show you exactly where money is slipping through the cracks.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={submit}
          data-testid="audit-form"
          className="mt-9 mx-auto flex flex-col sm:flex-row gap-3 max-w-[720px]"
        >
          <div
            className="flex-1 flex items-center gap-2 rounded-full px-5"
            style={{
              background: "#0d0d0d",
              border: "1px solid #1E1E1E",
              height: 56,
            }}
          >
            <Search size={16} className="text-muted-warm flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Restaurant name and city (e.g. Joe's Pizza, New York)"
              data-testid="audit-input"
              className="flex-1 bg-transparent outline-none text-cream placeholder:text-muted-warm"
              style={{ fontSize: 15, fontWeight: 500 }}
              disabled={state === "loading"}
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading" || !query.trim()}
            data-testid="audit-submit"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 font-semibold whitespace-nowrap"
            style={{
              background: "#E8500A",
              color: "#fff",
              fontSize: 15,
              height: 56,
              opacity: state === "loading" || !query.trim() ? 0.55 : 1,
              boxShadow: "0 20px 60px -20px rgba(232,80,10,0.6)",
              transition: "opacity .2s, transform .2s",
            }}
          >
            {state === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Working…
              </>
            ) : (
              <>
                Get Free Report <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Example chips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2" data-testid="audit-examples">
          <span
            className="font-mono uppercase tracking-[0.18em] text-ghost mr-1 self-center"
            style={{ fontSize: 10 }}
          >
            Or try:
          </span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => submitExample(ex)}
              disabled={state === "loading"}
              data-testid={`audit-example-${ex.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
              className="rounded-full transition-colors"
              style={{
                background: "#0d0d0d",
                border: "1px solid #1E1E1E",
                color: "#6B6866",
                padding: "8px 14px",
                fontSize: 12.5,
              }}
              onMouseEnter={(e) => {
                if (state !== "loading") {
                  e.currentTarget.style.borderColor = "rgba(232,80,10,0.4)";
                  e.currentTarget.style.color = "#FF6B2B";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E1E1E";
                e.currentTarget.style.color = "#6B6866";
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Loading panel */}
        <AnimatePresence>
          {state === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="mt-10 mx-auto max-w-[720px] rounded-2xl p-6 md:p-7"
              style={{ background: "#0d0d0d", border: "1px solid #1E1E1E" }}
              data-testid="audit-loading"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange mb-4">
                JHAX is looking at your restaurant…
              </div>
              <ul className="space-y-3">
                {LOADING_STEPS.map((s, i) => {
                  const isDone = i < stepIndex;
                  const isActive = i === stepIndex;
                  return (
                    <li
                      key={s.label}
                      className="flex items-center gap-3"
                      data-testid={`audit-step-${i}`}
                      style={{
                        opacity: isDone || isActive ? 1 : 0.35,
                        transition: "opacity .3s",
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isActive
                            ? "rgba(232,80,10,0.14)"
                            : isDone
                            ? "rgba(22,163,74,0.14)"
                            : "#0f0f0f",
                          border: `1px solid ${
                            isActive
                              ? "rgba(232,80,10,0.4)"
                              : isDone
                              ? "rgba(22,163,74,0.35)"
                              : "#1E1E1E"
                          }`,
                          fontSize: 15,
                        }}
                      >
                        {isDone ? (
                          <span style={{ color: "#22C55E", fontSize: 14 }}>✓</span>
                        ) : isActive ? (
                          <Loader2 size={14} className="animate-spin" color="#FF6B2B" />
                        ) : (
                          <span>{s.emoji}</span>
                        )}
                      </span>
                      <span
                        className="text-[14.5px]"
                        style={{
                          color: isActive ? "#F5F2ED" : isDone ? "#6B6866" : "#3a3835",
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error panel */}
        <AnimatePresence>
          {state === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="mt-10 mx-auto max-w-[720px] rounded-2xl p-6 md:p-7 flex items-start gap-4"
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(220,38,38,0.35)",
              }}
              data-testid="audit-error"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.35)" }}
              >
                <AlertTriangle size={18} color="#F87171" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] mb-1" style={{ color: "#F87171" }}>
                  Restaurant not found
                </div>
                <div className="text-cream text-[15px]" style={{ fontWeight: 500, lineHeight: 1.3 }}>
                  {error}
                </div>
                <button
                  type="button"
                  onClick={reset}
                  data-testid="audit-error-retry"
                  className="mt-4 inline-flex items-center gap-2 rounded-full text-[13px] font-semibold"
                  style={{
                    background: "#E8500A",
                    color: "#fff",
                    padding: "10px 18px",
                  }}
                >
                  Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report */}
        <AnimatePresence>
          {state === "report" && report && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 rounded-[22px] relative overflow-hidden"
              style={{
                background: "#0c0c0c",
                border: "1px solid rgba(232,80,10,0.28)",
                boxShadow: "0 40px 120px -40px rgba(232,80,10,0.35)",
              }}
              data-testid="audit-report"
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #E8500A 30%, #FF6B2B 60%, transparent)",
                }}
              />
              <div className="p-6 md:p-8">
                {/* Head */}
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex items-center gap-5 flex-1 min-w-[260px]">
                    <HealthScoreDial value={report.healthScore} />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
                        Free audit · Restaurant health
                      </div>
                      <div
                        className="font-display text-cream mt-1"
                        style={{
                          fontSize: "clamp(24px, 3vw, 34px)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.05,
                        }}
                        data-testid="audit-report-name"
                      >
                        {report.name}
                      </div>
                      <div className="text-muted-warm text-[13px] mt-1">
                        {report.location} · From public info only
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ghost">
                      Estimated money lost
                    </div>
                    <div
                      className="font-display mt-1"
                      style={{
                        color: "#FF6B2B",
                        fontSize: "clamp(28px, 3.4vw, 40px)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                      data-testid="audit-total-impact"
                    >
                      ${totalImpact.toLocaleString("en-US")}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-warm mt-1">
                      Every week · Estimated
                    </div>
                  </div>
                </div>

                {/* Estimated-data note (OSM provider — no verified ratings yet) */}
                {report.dataSource === "estimated" && (
                  <div
                    className="mt-5 flex items-start gap-3 rounded-xl p-3.5"
                    style={{
                      background: "rgba(232,80,10,0.06)",
                      border: "1px solid rgba(232,80,10,0.22)",
                    }}
                    data-testid="audit-estimated-note"
                  >
                    <AlertTriangle size={15} color="#FF6B2B" className="flex-shrink-0 mt-0.5" />
                    <div className="text-muted-warm text-[12.5px] leading-snug">
                      <span className="text-cream" style={{ fontWeight: 500 }}>
                        These numbers are estimated.
                      </span>{" "}
                      Location is real; rating and reviews are modelled from public map data.
                      Full verified analysis is available once connected to Google.
                    </div>
                  </div>
                )}

                {/* KPI pills */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {report.kpis.map((k) => {
                    const Icon = k.icon;
                    return (
                      <div
                        key={k.label}
                        className="rounded-xl p-4"
                        style={{ background: "#0a0a0a", border: "1px solid #1E1E1E" }}
                        data-testid={`audit-kpi-${k.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon size={12} className="text-orange" />
                          <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ghost">
                            {k.label}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span
                            className="font-display text-cream"
                            style={{ fontSize: 26, letterSpacing: "-0.03em" }}
                          >
                            {k.value}
                          </span>
                          {k.suffix && (
                            <span
                              className="font-mono text-orange"
                              style={{ fontSize: 12 }}
                            >
                              {k.suffix}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimate basis note */}
                {report.basis && (
                  <div
                    className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ghost"
                    data-testid="audit-basis"
                  >
                    {report.basis}
                  </div>
                )}

                {/* Findings + Reviews */}
                <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr,1fr]">
                  <div className="space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-orange">
                      What JHAX found
                    </div>
                    {report.findings.map((f, i) => {
                      const st = TIER_STYLES[f.tier] || TIER_STYLES.OPPORTUNITY;
                      const Icon = st.Icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                          className="rounded-xl p-4 flex items-start gap-3"
                          style={{ background: "#0a0a0a", border: `1px solid ${st.bd}` }}
                          data-testid={`audit-finding-${i}`}
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: st.bg, border: `1px solid ${st.bd}` }}
                          >
                            <Icon size={16} color={st.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                              <span
                                className="font-mono text-[9.5px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full"
                                style={{
                                  color: st.color,
                                  background: st.bg,
                                  border: `1px solid ${st.bd}`,
                                }}
                              >
                                {f.tier}
                              </span>
                              {f.impact && (
                                <span
                                  className="font-mono text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap"
                                  style={{
                                    color: st.color,
                                    background: st.bg,
                                    border: `1px solid ${st.bd}`,
                                  }}
                                >
                                  ~{f.impact}
                                </span>
                              )}
                            </div>
                            <div
                              className="text-cream text-[15px]"
                              style={{ fontWeight: 500, lineHeight: 1.25 }}
                            >
                              {f.title}
                            </div>
                            <div className="text-muted-warm text-[13px] mt-1 leading-snug">
                              {f.body}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <ReviewsPanel reviews={report.reviews} />
                </div>

                {/* Bottom CTA */}
                <div
                  className="mt-7 rounded-2xl p-5 md:p-6 flex flex-wrap items-center justify-between gap-4"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(232,80,10,0.08), rgba(232,80,10,0.02))",
                    border: "1px solid rgba(232,80,10,0.35)",
                  }}
                  data-testid="audit-cta"
                >
                  <div className="flex-1 min-w-[240px]">
                    <div
                      className="text-cream font-display"
                      style={{ fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.2 }}
                    >
                      This is only what we can see from the outside.
                    </div>
                    <div className="text-muted-warm text-[14px] mt-1.5">
                      Plug in your Square and JHAX shows you the money you&apos;re losing{" "}
                      <em style={{ fontStyle: "italic", color: "#F5F2ED" }}>inside</em> your
                      restaurant too — every regular, every shift, every dish.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={downloadPdf}
                      disabled={pdfState === "working"}
                      data-testid="audit-download"
                      data-html2canvas-ignore="true"
                      className="inline-flex items-center gap-2 rounded-full text-[13px] font-semibold"
                      style={{
                        background: "#0a0a0a",
                        border: "1px solid rgba(232,80,10,0.45)",
                        color: "#FF6B2B",
                        padding: "12px 18px",
                        opacity: pdfState === "working" ? 0.6 : 1,
                      }}
                    >
                      {pdfState === "working" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Preparing…
                        </>
                      ) : (
                        <>
                          <Download size={14} /> Download report
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      data-testid="audit-run-another"
                      className="rounded-full text-[13px]"
                      style={{
                        background: "#0a0a0a",
                        border: "1px solid #1E1E1E",
                        color: "#6B6866",
                        padding: "12px 18px",
                      }}
                    >
                      Run another
                    </button>
                    <a
                      href="#book-demo"
                      data-testid="audit-cta-book"
                      className="inline-flex items-center gap-2 rounded-full text-[14px] font-semibold"
                      style={{
                        background: "#E8500A",
                        color: "#fff",
                        padding: "12px 22px",
                        boxShadow: "0 16px 40px -14px rgba(232,80,10,0.6)",
                      }}
                    >
                      Connect your Square <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle helper strip */}
        {state === "idle" && (
          <div className="mt-8 flex items-center justify-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ghost">
            <span>Uses only public info</span>
            <span>·</span>
            <span>No sign-up needed</span>
            <span>·</span>
            <span>Real Google data</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeAudit;
