# JHAX.ai — Design Tokens (Single Source of Truth)

All hex, font, spacing, motion, and asset decisions used across the landing page. Copy-pasteable variables first, human reference below.

---

## 1. CSS Variables — copy/paste

```css
:root {
  /* ---------- COLOR ---------- */
  --jhax-black:        #080808;   /* base background */
  --jhax-card:         #111111;   /* elevated card fill */
  --jhax-panel:        #0d0d0d;   /* inner panel / feature card */
  --jhax-panel-alt:    #0f0f0f;   /* KPI tile */
  --jhax-well:         #0a0a0a;   /* deepest well (response cards) */
  --jhax-border:       #1E1E1E;   /* default 1px border */
  --jhax-border-soft:  #161616;   /* softer chrome border */
  --jhax-border-glow:  rgba(232,80,10,0.25);
  --jhax-border-active:rgba(232,80,10,0.40);

  --jhax-orange:       #E8500A;   /* primary brand orange */
  --jhax-orange-light: #FF6B2B;   /* orange highlight / text-on-dark */
  --jhax-orange-tint:  rgba(232,80,10,0.08);
  --jhax-orange-tint-2:rgba(232,80,10,0.14);
  --jhax-orange-glow:  rgba(232,80,10,0.35);

  --jhax-cream:        #F5F2ED;   /* primary foreground text */
  --jhax-muted:        #6B6866;   /* secondary text */
  --jhax-ghost:        #333330;   /* tertiary / caption */
  --jhax-hair:         #3a3835;   /* future/inactive dim */

  --jhax-green:        #16A34A;   /* positive delta */
  --jhax-green-bright: #22C55E;   /* success badge */
  --jhax-red:          #DC2626;   /* negative delta */
  --jhax-red-bright:   #F87171;   /* pain / at-risk text */
  --jhax-purple:       #7C3AED;   /* Health Score accent */
  --jhax-purple-light: #A78BFA;   /* health score tag */

  /* ---------- TYPOGRAPHY ---------- */
  --font-display:      "Bricolage Grotesque", "Inter", sans-serif;
  --font-body:         "Inter", -apple-system, sans-serif;
  --font-mono:         "JetBrains Mono", ui-monospace, monospace;

  --tracking-display:  -0.03em;   /* headlines */
  --tracking-mono-lg:  0.24em;    /* section labels */
  --tracking-mono-md:  0.18em;
  --tracking-mono-sm:  0.14em;

  /* ---------- SPACING ---------- */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-14: 56px;
  --space-16: 64px;
  --space-20: 80px;
  --space-28: 112px;   /* section vertical (mobile) */
  --space-40: 160px;   /* section vertical (desktop) */

  --radius-xs: 6px;    /* stat pill hover */
  --radius-sm: 8px;    /* small badges */
  --radius-md: 12px;   /* KPI tiles, inner panels */
  --radius-lg: 16px;   /* mid cards */
  --radius-xl: 22px;   /* live demo / product mockup */
  --radius-pill: 100px;/* buttons, chips, badges */
  --radius-full: 9999px;

  /* ---------- SHADOWS ---------- */
  --shadow-cta:        0 20px 60px -20px rgba(232,80,10,0.60);
  --shadow-cta-hover:  0 28px 72px -20px rgba(232,80,10,0.80);
  --shadow-card:       0 30px 120px -40px rgba(232,80,10,0.35);
  --shadow-mockup:     0 60px 160px -40px rgba(232,80,10,0.25);
  --shadow-hover:      0 24px 60px -30px rgba(232,80,10,0.35);
  --shadow-inner-glow: inset 0 0 40px rgba(232,80,10,0.08);

  /* ---------- MOTION ---------- */
  --ease-out-swift:    cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast:   0.25s;
  --dur-md:     0.45s;
  --dur-lg:     0.70s;
  --dur-hero:   0.90s;
  --dur-marquee: 45s;
}
```

---

## 2. Colors — usage reference

| Token | Hex | Used on |
|---|---|---|
| `--jhax-orange` | **#E8500A** | Primary CTA button fill, "X" in wordmark logo, star mark fill, active tab background/border, live indicator dot, chapter number, orange progress bars in loop/counter, "Optimized" underline, hero headline accent word |
| `--jhax-orange-light` | **#FF6B2B** | Orange text on dark (badges, active tab labels, "AI COO · Decision" label, feature example line), star mark inner dot, marquee stroke |
| `--jhax-orange-tint` | rgba(232,80,10,0.08) | Live badge fill, hover glow ambient |
| `--jhax-orange-tint-2` | rgba(232,80,10,0.14) | ACT badge fill, active tab fill, campaign goal selected fill |
| `--jhax-orange-glow` | rgba(232,80,10,0.35) | Ambient hero glow, card box-shadow color |
| `--jhax-cream` | **#F5F2ED** | Primary text (headlines, body, JHA in wordmark) |
| `--jhax-muted` | **#6B6866** | Secondary text (sub, body paragraph, description) |
| `--jhax-ghost` | **#333330** | Tertiary — captions, chapter labels, inactive tab labels |
| `--jhax-hair` | **#3a3835** | Future/dim state on loop cards, inactive |
| `--jhax-black` | **#080808** | App background |
| `--jhax-card` | **#111111** | Base elevated card |
| `--jhax-panel` | **#0d0d0d** | Feature cards, inner containers |
| `--jhax-panel-alt` | **#0f0f0f** | KPI tiles, list rows |
| `--jhax-well` | **#0a0a0a** | Deepest well (response cards, prompt line) |
| `--jhax-border` | **#1E1E1E** | Default 1px card/border |
| `--jhax-border-soft` | **#161616** | Window chrome, subtle dividers |
| `--jhax-green` | **#16A34A** | Positive delta text, live indicator (Square status), success bar in customers |
| `--jhax-green-bright` | **#22C55E** | Success badge fill/text, VIP numbering |
| `--jhax-red` | **#DC2626** | Negative delta, cost counter gradient start |
| `--jhax-red-bright` | **#F87171** | Pain X icon, at-risk row text, cost tag text, competitor "STOPS HERE" |
| `--jhax-purple` | **#7C3AED** | Health Score card border, RED tag background |
| `--jhax-purple-light` | **#A78BFA** | RED tag text on Health Score |

---

## 3. Fonts

**Import (already in `/app/frontend/public/index.html`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

| Family | Weights loaded | Sizes used | Applied to |
|---|---|---|---|
| **Bricolage Grotesque** | 400, 700, **800** | clamp(48px, 7.5vw, 96px) hero · clamp(38px, 6vw, 78px) chapter · clamp(48px, 8vw, 100px) final CTA · clamp(48px, 9vw, 120px) marquee · 26–30px card headlines · 22px feature titles · 24px loop stage · 30px KPI values | All display headlines, KPI numbers, big stats, marquee, logo wordmark ("JHAX" + ".ai") |
| **Inter** | **300**, **400**, **500**, 600 | 15–20px body · 14.5–15px card body · 16–17px sub · 13px small · 14px lists | All body copy, sub-headlines, list items, buttons, form input, everything not display or mono |
| **JetBrains Mono** | 400, **500** | 9–12px labels · 10–11px chapter numbers · 10.5px badges · 12.5px stat pills | All small labels, chapter numbers ("01"), tag pills, countdown timer, "LIVE" indicators, tab labels, breadcrumbs, "fig. 02 —" caption |

**Utility classes:**
```css
.font-display { font-family: var(--font-display); font-weight: 800; letter-spacing: -0.03em; line-height: 0.92; }
.font-mono    { font-family: var(--font-mono);    font-weight: 500; letter-spacing: 0.02em; }
.font-body    { font-family: var(--font-body); }
```

---

## 4. Spacing & layout

| Value | Where used |
|---|---|
| **Section vertical**: `py-28` (112px) mobile → `py-40` (160px) desktop | Every major section: Problem, Product, HowItWorks, Features, Loop, FAQ, FinalCTA |
| **Container max-width**: `1280px` (content) / `1360px` (hero grid) / `1400px` (nav + trust strip) | Section wrappers |
| **Container horizontal**: `px-6` (24px) mobile → `px-10` (40px) desktop | All section wrappers |
| **Nav height**: `68px` | Fixed header |
| **Hero top padding**: `104px` mobile → `112px` desktop | To clear fixed nav |
| **Card padding**: `p-5` (20px) or `p-6` (24px) mobile → `p-8` (32px) desktop | Feature cards, KPI tiles, response cards |
| **Card gap**: `gap-4` (16px) → `gap-5` (20px) → `gap-6` (24px) | Grids between cards |
| **Button padding**: `18px 42px` (hero) · `16px 34px` (hero secondary) · `12px 22px` (nav) · `10px 20px` (inline actions) | CTA buttons |
| **Pill padding**: `8px 14–16px` (badges) · `10px 18px` (action pills) · `2px 8px` (mini tags) · `4px 12px` (goal chips) | All rounded chips |

**Border radii used:**
| Radius | Component |
|---|---|
| `100px / 9999px` (pill) | All buttons, CTA, badges, chips, form input, live badge |
| `22px` | Live demo card, product mockup outer, hero card |
| `16px` (`rounded-2xl`) | Cost counter banner, pair cards, feature cards, loop container, loop stage cards |
| `12px` (`rounded-xl`) | KPI tiles, response cards, inner panels, ask bar, list-row containers |
| `8px` (`rounded-lg`) | List rows (VIPs, at-risk, shifts) |
| `6px` (`rounded-md`) | Icon squares in problem section, small icons |

---

## 5. Animations — keyframes & motion

**Keyframes defined in `/app/frontend/src/index.css`:**

| Name | Duration | Easing | Applied to |
|---|---|---|---|
| `jhaxPulse` | `1.8s` | `ease-in-out infinite` | `.dot-pulse` — live indicator dot (nav, hero, Square-connected status, cost counter row) |
| `jhaxMarquee` | `45s` | `linear infinite` | `.marquee-track` — editorial marquee slide |
| `jhaxCaret` | `0.85s` | `step-end infinite` | `.caret` — blinking typewriter cursor |
| `actPulse` | `1.6s` | `ease-in-out infinite` | `.act-pulse` — orange ACT badge in hero live demo & Ask Anything tab |

All animations are suppressed via `@media (prefers-reduced-motion: reduce)`.

**Framer-motion patterns:**
| Pattern | Duration | Easing | Where |
|---|---|---|---|
| Hero masked-line reveal | `0.9s`, stagger `0.06s`, delay `0.25s` | `cubic-bezier(0.22, 1, 0.36, 1)` | "Stop guessing. / Start running." lines |
| Nav slide-down | `0.7s`, delay `0.05s` | `cubic-bezier(0.22, 1, 0.36, 1)` | Site nav |
| Scroll section fade-up | `0.6–0.9s` | `cubic-bezier(0.22, 1, 0.36, 1)` | All `whileInView` motion.divs (chapter headers, feature cards, KPIs, loop card) |
| Problem pair reveal | `0.7s` slide-in ±40px on X | `cubic-bezier(0.22, 1, 0.36, 1)` | `PairRow` — IntersectionObserver via `useInView` |
| Cost counter tween | `0.9s` | `cubic-bezier(0.22, 1, 0.36, 1)` | Counter animates on each pair reveal |
| Product tab cross-fade | `0.3s` opacity 0→1 | default | `<AnimatePresence>` between tab panels |
| Feature card hover | `0.25s` transform + border | `ease` | Card lift on mouseenter |
| Feature example reveal | `0.28s` height + opacity + y | `cubic-bezier(0.22, 1, 0.36, 1)` | Hover-revealed orange line |
| Loop step cards | 1.4s per step, 2s pause, 9s total cycle | rAF-driven linear progress | 5-card DETECT→MEASURE progress bars |
| "Optimized" underline | `0.8s`, delay `0.4s` | `cubic-bezier(0.22, 1, 0.36, 1)` | `scaleX 0→1`, `transform-origin: left` |
| FAQ accordion | `0.35s` | `cubic-bezier(0.22, 1, 0.36, 1)` | Height + opacity toggle |
| Lenis smooth scroll | `1.15s` | `1.001 - Math.pow(2, -10 * t)` | Global page scroll |

---

## 6. Shadows & borders

**Border widths used:** `1px` (default), `3px` (left accent on Loop callout, top accent on hero card).

**Shadow tokens** — see CSS variables above (`--shadow-cta`, `--shadow-card`, `--shadow-mockup`, `--shadow-hover`, `--shadow-inner-glow`).

**Recurring border colors:**
- `#1E1E1E` — 90% of card borders
- `rgba(232,80,10,0.25)` — soft brand border (trust hover, live badge)
- `rgba(232,80,10,0.35–0.55)` — active/emphasis brand border
- `rgba(220,38,38,0.25–0.35)` — pain/red borders
- `rgba(22,163,74,0.28–0.35)` — positive/green borders

---

## 7. SVG assets — JHAX Star Mark

**One path, four render sizes. All use `viewBox="0 0 64 64"`.**

```svg
<!-- 28px — Nav wordmark -->
<svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 2 C34.5 21.5 42.5 29.5 62 32 C42.5 34.5 34.5 42.5 32 62 C29.5 42.5 21.5 34.5 2 32 C21.5 29.5 29.5 21.5 32 2 Z" fill="#E8500A"/>
  <circle cx="28.5" cy="32" r="3.2" fill="#FF6B2B"/>
</svg>

<!-- 32px — Favicon -->
<svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 2 C34.5 21.5 42.5 29.5 62 32 C42.5 34.5 34.5 42.5 32 62 C29.5 42.5 21.5 34.5 2 32 C21.5 29.5 29.5 21.5 32 2 Z" fill="#E8500A"/>
  <circle cx="28.5" cy="32" r="3.2" fill="#FF6B2B"/>
</svg>

<!-- 48px — Medium (feature icon, footer mark) -->
<svg width="48" height="48" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 2 C34.5 21.5 42.5 29.5 62 32 C42.5 34.5 34.5 42.5 32 62 C29.5 42.5 21.5 34.5 2 32 C21.5 29.5 29.5 21.5 32 2 Z" fill="#E8500A"/>
  <circle cx="28.5" cy="32" r="3.2" fill="#FF6B2B"/>
</svg>

<!-- 80px — Hero / large marketing use -->
<svg width="80" height="80" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 2 C34.5 21.5 42.5 29.5 62 32 C42.5 34.5 34.5 42.5 32 62 C29.5 42.5 21.5 34.5 2 32 C21.5 29.5 29.5 21.5 32 2 Z" fill="#E8500A"/>
  <circle cx="28.5" cy="32" r="3.2" fill="#FF6B2B"/>
</svg>
```

**Path meaning:** 4-point concave "sparkle" star. Outer fill orange, off-center inner dot (28.5, 32) in lighter orange = motion / eye. Component: `/app/frontend/src/components/site/Logo.jsx` (`<JhaxMark>` + `<JhaxLogo>`).

**Wordmark:** `<span>JHA</span><span style="color:#E8500A">X</span><span style="color:#E8500A; font-weight:500; size:55%">.ai</span>` — Bricolage 800.

---

## 8. Body & background treatments

- Base: solid `#080808`
- Ambient radial glows: `rgba(232,80,10,0.04–0.08)` at hero, features, final CTA
- Film grain: fixed SVG turbulence overlay at `opacity 0.035`, `mix-blend-mode: overlay`
- Grid pattern (hero): `linear-gradient` 1px lines at `rgba(255,255,255,0.03)` on `56px` grid, radial mask
- Selection: `background: #E8500A; color: #fff`
- Scrollbar thumb: `#1a1a1a`, hover `#E8500A`

---

**Any change to this file must be reflected in `/app/frontend/src/index.css` (CSS variables) and the component files that consume them. If a designer or agent proposes a color/font/spacing outside this file, reject or add — do not silently drift.**
