# CLAUDE.md — JHAX.ai Project Briefing

Paste this at the start of any future AI session. Everything below is the ground truth.

---

## 1. Project identity

- **Name:** JHAX.ai (wordmark: "JHA" cream + "X" orange + ".ai" small orange)
- **Product:** An AI Chief Operating Officer for independent restaurants.
- **Job:** Watches Square POS 24/7. Detects problems → diagnoses root cause → recommends fix → deploys with one tap → measures recovered revenue. The full loop.
- **Market:** Independent restaurant operators with 1–15 locations.
- **Live status:** 1 restaurant live on Square. Others "coming soon" (Toast, Clover, QuickBooks, WhatsApp Business).
- **Two audiences of this landing page:**
  1. **Restaurant owner** — wants to know: does this save me time & money? How fast?
  2. **VC** — wants to know: what's the moat? What's the TAM? Is this a real product?
- **The one goal of this page:** Book a 20-minute demo. Single CTA. No secondary conversions.

---

## 2. Brand rules — never drift

### Colors — the full palette
```
Base:        #080808   (background — never darker, never lighter)
Panels:      #0d0d0d · #0f0f0f · #0a0a0a (elevated wells)
Border:      #1E1E1E   (default 1px)
Primary:     #E8500A   (the orange — do not lighten, do not shift hue)
Highlight:   #FF6B2B   (orange text/accent on dark)
Cream text:  #F5F2ED
Muted:       #6B6866
Ghost/label: #333330

Success:     #16A34A / #22C55E
Danger:      #DC2626 / #F87171
Purple:      #7C3AED / #A78BFA  (Health Score only)
```

**Never use** purple/violet gradients as brand colour. **Never use** pure white (`#fff`) as text — use cream. **Never use** pure black — use `#080808`.

### Fonts — never sub in
- **Bricolage Grotesque 800** → all display / headlines / KPI numbers / wordmark
- **Inter 300/400/500** → all body copy, buttons, form input
- **JetBrains Mono 500** → all labels, captions, tag pills, "01" chapter numbers, timers

Import URL: see `/app/asset.md` §3.

### Logo — never edit the SVG path

```svg
<svg viewBox="0 0 64 64">
  <path d="M32 2 C34.5 21.5 42.5 29.5 62 32 C42.5 34.5 34.5 42.5 32 62 C29.5 42.5 21.5 34.5 2 32 C21.5 29.5 29.5 21.5 32 2 Z" fill="#E8500A"/>
  <circle cx="28.5" cy="32" r="3.2" fill="#FF6B2B"/>
</svg>
```

Star mark: 4-point concave sparkle in `#E8500A`, off-centre inner dot at `(28.5, 32)` in `#FF6B2B`. Wordmark: "JHA" cream + "X" orange + ".ai" orange @55% size.

Component of record: `/app/frontend/src/components/site/Logo.jsx`.

### What can be adjusted
- Copy strings inside sections (except the DO NOT TOUCH list below)
- Order of cards within a section
- Number of pair rows in Problem section (must still sum to a round number)
- Countdown seconds in hero live demo (currently 30s)
- Sequence timing in The Loop (currently 1.4s step + 2s pause)
- Individual card icons

### What can never be changed without an explicit go-ahead
- Brand hex values
- Font families
- Logo SVG
- Base background `#080808`
- "The Loop" 5-stage naming: DETECT → DIAGNOSE → ACT → DEPLOY → MEASURE
- "Full loop" vs "Stops here" language on competitor comparison

---

## 3. Tone of voice

### How copy sounds
- **Direct.** "Stop guessing. Start running." not "Empower your restaurant with insights."
- **Second-person.** "You're overstaffed on Tuesday lunch." not "Restaurants are often overstaffed."
- **Concrete.** "$486/wk" not "significant weekly losses."
- **Present tense.** "It finds what's costing you money." not "It will help identify issues."
- **Sentence fragments okay.** They read like real speech.

### Words to never use
`solutions`, `empower`, `unleash`, `revolutionize`, `synergy`, `robust`, `seamless`, `leverage`, `next-generation`, `world-class`, `enterprise-grade`, `holistic`, `stakeholder`, `paradigm`, `optimize your workflow`, `AI-powered` (redundant — say what the AI does).

### Words to always prefer
`ask`, `answer`, `find`, `fix`, `run`, `save`, `recover`, `deploy`, `tell you`, `show you`, `built for`, `watching`, `waiting`, `today`, `by Tuesday`, `before your next service`.

### The 5-second test — every new section must pass
Cover the section, uncover it for 5 seconds, cover again. Can a stranger say — in one sentence — what it does? If not, rewrite the top line, not the visuals.

---

## 4. Section map — the whole page in one glance

| Order | ID | Component | Job |
|---|---|---|---|
| 00 | `top` | `Hero` + `LiveDemoCard` | Signature above-the-fold moment — kinetic headline + working demo card |
| — | (trust strip) | `TrustStrip` | Integrations + "1 restaurant live" proof |
| 01 | `problem` | `ProblemSection` | Loss aversion — reveal $2,439/wk bleed as visitor scrolls |
| 02 | `product` | `ProductDemo` | 6 tabs, one screen, real deliverables per tab |
| 03 | `how` | `HowItWorks` | 3 steps: Connect → Detect → Approve |
| 04 | `features` | `Features` | 9 capability cards with hover-reveal examples + animated "Optimized" underline |
| 05 | `loop` | `TheLoop` | The moat — auto-running 5-stage loop + Square/Toast vs JHAX comparison bars |
| — | (marquee) | `Marquee` | Editorial slow-scroll kinetic type |
| 06 | `faq` | `FAQ` | 8 objection-killers |
| — | (stats) | `Stats` | 4 big numbers: TAM + product proof |
| 07 | `book-demo` | `FinalCTA` | The one form. The one goal. |
| — | (footer) | `Footer` | Minimal — logo + copyright |

---

## 5. Animation rules

**Golden rule: animation never blocks reading.**

- On load: only the hero has a staged reveal (masked line-by-line, 0.9s per line). Everything below is at rest until scrolled to.
- Scroll reveals: 0.6–0.9s, `cubic-bezier(0.22, 1, 0.36, 1)`, `viewport={{ once: true }}` — never re-fire.
- Hero live demo card: cycles automatically on a 30s countdown; clicking a tab jumps immediately (never delay a user's click).
- The Loop section: runs autonomously on load, 9s cycle, indefinite.
- Cost counter: increments only when a pair enters view — never on click, never on load.
- Feature card hover: reveals example in <300ms. No decorative bounce.
- All infinite animations respect `prefers-reduced-motion: reduce`.

**Never do:** parallax that reveals text later than it arrives, page-load spinners, entrance animations that fire on every scroll, cursor followers on interactive elements, hover animations >400ms.

---

## 6. Competitor context — where JHAX is different

| Player | What they do | Where they stop |
|---|---|---|
| **Square** | POS + basic sales dashboard | **Reports.** No diagnosis. No action. |
| **Toast** | POS + inventory + labor scheduling | **Diagnosis, sort of.** No autonomous action. |
| **Heartland / Clover** | Payments + basic analytics | **Reports.** |
| **7shifts, Homebase** | Labor scheduling | Labor only. No revenue. |
| **QuickBooks** | Bookkeeping (retrospective) | Weeks-late diagnosis. |
| **Generic BI tools (Toast/Square dashboards, Otter)** | Metrics visualization | **Dashboards.** Owner still has to interpret + act. |

**JHAX is the only one that completes the full loop: DETECT → DIAGNOSE → ACT → DEPLOY → MEASURE.**
This is the entire pitch. Every other feature is downstream of this claim.

Comparison visualisation lives in `/app/frontend/src/components/site/TheLoop.jsx` — the two progress bars show Square/Toast capping at 40% (through DIAGNOSE) while JHAX fills to 100%.

---

## 7. DO NOT TOUCH list

The following are copy or code artifacts that have been tuned for a specific reason. Do not edit without explicit user approval:

1. **Hero headline**: "Stop guessing. Start running." — the signature line.
2. **Hero sub**: "JHAX watches your restaurant 24/7. It finds what's costing you money, tells you why, and fixes it — before your next service."
3. **Final CTA headline**: "Your competitors are already falling behind."
4. **The Loop moat statement**: "*Every competitor stops at* DIAGNOSE. *JHAX goes all the way to* MEASURE."
5. **The 5 stage names**: DETECT · DIAGNOSE · ACT · DEPLOY · MEASURE — order and wording locked.
6. **Competitor comparison labels**: "STOPS HERE" (red) and "FULL LOOP" (orange).
7. **The star mark SVG path** and its two fill colours.
8. **Wordmark**: JHA (cream) + X (orange) + .ai (orange @55%).
9. **Primary CTA verb**: "Book". Never "Get", "Request", "Sign up", "Try".
10. **Trust fine print**: "No credit card · No commitment · Takes 2 minutes."

---

## 8. Working conventions

- All backend routes prefixed `/api`.
- Frontend must call backend via `process.env.REACT_APP_BACKEND_URL`.
- MongoDB access only via `MONGO_URL` + `DB_NAME` (no hardcodes).
- Never introduce new colors or fonts without adding to `/app/asset.md` first.
- All interactive & informational elements must carry a `data-testid` attribute — see existing pattern.
- No emojis anywhere in the UI (Lucide icons only).
- Yarn only (never npm).
- Do not restart supervisor for code edits — hot reload handles it. Only restart on `.env` or dependency changes.

---

## 9. Files to know

```
/app/asset.md                                        Design tokens (source of truth)
/app/README.md                                       Section-by-section reference
/app/CLAUDE.md                                       (this file)
/app/pitch.md                                        3-minute VC demo script
/app/memory/PRD.md                                   Product requirements & backlog

/app/backend/server.py                               FastAPI + /api/leads endpoint
/app/frontend/src/App.js                             Lenis smooth scroll setup
/app/frontend/src/index.css                          CSS tokens + keyframes
/app/frontend/src/pages/Landing.jsx                  Section orchestrator
/app/frontend/src/components/site/Logo.jsx           JHAX star + wordmark
/app/frontend/src/components/site/Nav.jsx
/app/frontend/src/components/site/Hero.jsx
/app/frontend/src/components/site/LiveDemoCard.jsx   Kinetic hero demo (5 tabs)
/app/frontend/src/components/site/TrustStrip.jsx
/app/frontend/src/components/site/ChapterHeader.jsx  Reusable numbered chapter header
/app/frontend/src/components/site/ProblemSection.jsx
/app/frontend/src/components/site/ProductDemo.jsx    6-tab product mockup
/app/frontend/src/components/site/HowItWorks.jsx
/app/frontend/src/components/site/Features.jsx       9-card grid, hover examples
/app/frontend/src/components/site/TheLoop.jsx        Auto-running 5-stage loop
/app/frontend/src/components/site/Marquee.jsx
/app/frontend/src/components/site/FAQ.jsx
/app/frontend/src/components/site/Stats.jsx
/app/frontend/src/components/site/FinalCTA.jsx
/app/frontend/src/components/site/Footer.jsx
```

If you edit this file, edit `/app/asset.md` and `/app/README.md` to match.
