# JHAX.ai — Landing Page README

A high-conversion, Awwwards-level landing page for **JHAX.ai — the AI COO for independent restaurants**. This document explains every section: what it is, why it's there, and how to change it.

## Stack

- **Frontend:** React 19, Tailwind, framer-motion, Lenis (smooth scroll)
- **Backend:** FastAPI + MongoDB (lead capture only)
- **Fonts:** Bricolage Grotesque · Inter · JetBrains Mono
- **Primary color:** `#E8500A`
- **Live at:** `REACT_APP_BACKEND_URL` (see `/app/frontend/.env`)

## Local dev

```bash
# backend
sudo supervisorctl restart backend
# frontend (hot reload — usually not needed)
sudo supervisorctl restart frontend
```

The backend exposes:
- `POST /api/leads` `{ email, source }` — persists to MongoDB (`leads` collection)
- `GET  /api/leads` — list all leads

Frontend must always call the backend via `REACT_APP_BACKEND_URL`.

---

# Section-by-section reference

## Nav (`components/site/Nav.jsx`)
- **Shows** — Logo + 4 in-page links + primary orange "Book a Demo" button. Blurred on scroll.
- **Why it's here** — Consistent, single-CTA persistence. Nothing distracts from booking a demo.
- **For** — Both audiences.
- **If removed** — Visitors deep in the page have no shortcut back to the CTA. Conversion drops.
- **Rule** — One primary action, visible on every scroll frame.

## 00 — Hero (`components/site/Hero.jsx` + `LiveDemoCard.jsx`)
- **Shows** — Kinetic headline "Stop guessing. Start running.", 1-line pitch, primary CTA, and a live interactive demo card (5 tabs, typewriter cycling 4 real operator questions with numbers, 30s countdown, real AI response with stats & action).
- **Why it's here** — The single most important element on the entire page. Answers "what is this?" and "does it actually work?" in under 3 seconds without a scroll.
- **For** — Both — restaurant owner sees the questions they'd actually ask; VC sees a working, animated product surface.
- **If removed** — The page becomes indistinguishable from a template.
- **Rule** — Show, don't tell. The demo card is not a screenshot; it moves. Above the fold on desktop.

## 01 — The Problem (`components/site/ProblemSection.jsx`)
- **Shows** — A live cost counter ("What it's costing you — weekly") that starts at $0 and animates to **$2,439/week** as 6 pain/fix pairs slide in from left/right. Each pain has a red weekly cost tag; each fix has a green savings tag.
- **Why it's here** — Loss aversion. Operators must feel the cost of doing nothing before they'll buy.
- **For** — Restaurant owner (primary). VCs see specific unit economics (secondary).
- **If removed** — Owner never emotionally engages with the pain — everything below reads as generic SaaS.
- **Rule** — Concrete numbers beat adjectives. "$486/wk" > "significant losses".

## 02 — The Product (`components/site/ProductDemo.jsx`)
- **Shows** — A single mock product frame with 6 tabs (Dashboard · Ask Anything · Customers · Menu · Marketing AI · Labor). Each tab shows **completely different content** — KPIs, VIPs, combo builder, campaign banner, labor report, etc.
- **Why it's here** — Proof of depth. One screen replaces 6+ tools.
- **For** — Both.
- **If removed** — The product feels one-note.
- **Rule** — Every tab must show a real deliverable, not decorative UI.

## 03 — How It Works (`components/site/HowItWorks.jsx`)
- **Shows** — 3 numbered step cards (Connect Square · Detect & Diagnose · Approve & Act) with watermark numerals.
- **Why it's here** — Answers "what does adopting this actually look like?"
- **For** — Restaurant owner.
- **If removed** — Buying friction spikes — feels too magical.
- **Rule** — 3 steps max. Any more and it feels like work.

## 04 — Capabilities (`components/site/Features.jsx`)
- **Shows** — 9 feature cards with unique tags ("No one else does this", "Saves $400+/week"). On hover, each card lifts and reveals a real one-line example in orange (e.g. "Try: Why are sales down?"). Headline includes an animated orange underline on "Optimized" that draws in over 0.8s on load.
- **Why it's here** — Breadth proof + rebuttal to "isn't this just Square?"
- **For** — Both — owner sees coverage; VC sees moat.
- **If removed** — Competitor comparison becomes weaker.
- **Rule** — Every feature has a benefit tag AND a real example. No feature stands alone as a name.

## 05 — Your Competitive Advantage / The Loop (`components/site/TheLoop.jsx`)
- **Shows** — A 5-card auto-running loop (**DETECT → DIAGNOSE → ACT → DEPLOY → MEASURE**), each activating 1.4s at a time with an orange progress bar. Below: two comparison bars — Square/Toast caps at 40% (STOPS HERE), JHAX fills to 100% (FULL LOOP), both in sync with the loop.
- **Why it's here** — The moat. This is the *one* image a VC will remember.
- **For** — VC (primary), operator secondary.
- **If removed** — The pitch has no defensible differentiation.
- **Rule** — One picture that summarises the whole company. Do not weaken it.

## Editorial Marquee (`components/site/Marquee.jsx`)
- **Shows** — A slow kinetic marquee: "Your restaurant. On autopilot. · Root cause in 60 seconds. · Recovers $400+/week. · ..."
- **Why it's here** — Editorial pacing pause between analytical (Loop) and interactive (FAQ). Awwwards-level texture.
- **For** — Both. Vibes matter for VC decks and operator trust.
- **If removed** — The page reads too clinical.
- **Rule** — Motion between dense blocks — never adjacent to the CTA.

## 06 — FAQ (`components/site/FAQ.jsx`)
- **Shows** — 8 accordion questions covering the top objections (replace Square? setup time? single location? cost? cancel?).
- **Why it's here** — Removes final friction before the CTA.
- **For** — Restaurant owner.
- **If removed** — Owners bounce to compose an email asking the same questions.
- **Rule** — Address the objection by name in the question, answer in <60 words.

## Stats (`components/site/Stats.jsx`)
- **Shows** — 4 big-type stats: $82.7B market · 60 sec answer · $400+ weekly savings · 1 app replaces 6+.
- **Why it's here** — Market size for VCs, savings for operators — one strip serves both.
- **For** — Both.
- **If removed** — The market TAM is invisible to VCs.
- **Rule** — Max 4 numbers. Any more feels like a slide.

## Final CTA (`components/site/FinalCTA.jsx`)
- **Shows** — Big kinetic headline "Your competitors are already falling behind." + email capture form (`POST /api/leads`) with green success / red error states + 4 trust ticks.
- **Why it's here** — The whole page exists for this.
- **For** — Both.
- **If removed** — There is no page.
- **Rule** — One field. One button. Never two CTAs competing.

## Footer (`components/site/Footer.jsx`)
- **Shows** — Logo + brand line + copyright.
- **Rule** — Deliberately minimal. Nothing here should compete with the CTA above it.

---

# Static vs dynamic content

| Section | Kind | Data source |
|---|---|---|
| Nav, Hero copy, Problem pairs, HowItWorks, Features, TheLoop, Marquee, FAQ, Stats, FinalCTA copy, Footer | **Static** — hardcoded in components | Component files |
| Hero live demo card questions + AI responses | **Static, animated** — driven by 30s timer + tab click | `LiveDemoCard.jsx` `ITEMS` array |
| Product tab panels (all 6) | **Static content, dynamic tab switch** | `ProductDemo.jsx` |
| Loop animation | **Dynamic, rAF-driven** | `TheLoop.jsx` local state |
| Cost counter + pair reveal | **Dynamic, IntersectionObserver-driven** | `ProblemSection.jsx` |
| Lead form | **Dynamic** — writes to MongoDB via `POST /api/leads` | Backend |

**Nothing on this page currently reads live Square data.** All numbers are curated. When Square OAuth ships, the following are the first places to pipe real data:
1. Hero live demo card → real questions + real answers per logged-in restaurant
2. Product Demo → Dashboard tab KPIs, Customers tab lists, Menu tab margin data
3. Trust strip → live count of connected restaurants
4. Stats → replace "1 restaurant live" with real number

---

# How to update content

| Task | File | What to change |
|---|---|---|
| Change hero headline | `Hero.jsx` | The `<motion.span>` inside `.mask-line` blocks |
| Change CTA text | `Hero.jsx`, `Nav.jsx`, `FinalCTA.jsx` | Button text — keep "Book" verb |
| Change pain/fix pairs | `ProblemSection.jsx` | `PAIRS` array — costs must sum to a memorable round number |
| Change product tab content | `ProductDemo.jsx` | Each `*Tab` component |
| Add feature card | `Features.jsx` | Push into `features` array + provide `example` string |
| Change comparison stops | `TheLoop.jsx` | `COMPETITOR_CAP` (currently 40) |
| Change marquee words | `Marquee.jsx` | `words` array |
| Add FAQ | `FAQ.jsx` | Push `{q, a}` into `faqs` |
| Change lead form destination | `FinalCTA.jsx` | Endpoint URL |

---

# If conversion rates are low — change in this order

1. **Hero headline & CTA copy** — 40% of the swing lives here.
2. **The Loop section moat statement** — is the differentiation obvious in 5 seconds?
3. **Problem section cost counter total** — does the number feel real to your average operator?
4. **First feature card example** — the hover-revealed one-liner should hit visceral.
5. **Final CTA fine print** — remove any friction word (contract, commitment, credit card).
6. **Hero demo card question rotation speed** — try 20s if 30s feels slow.
7. **FAQ item order** — put the pricing question in the top 3 if pricing is the objection.
8. **Trust strip integration list** — add the POS your target market actually uses.

---

# Before you go live — 10-item checklist

- [ ] Replace `POST /api/leads` destination with real CRM / notification email
- [ ] Add real Open Graph image + Twitter card metadata
- [ ] Add real favicon at 32×32 and 180×180 (Apple touch)
- [ ] Test lead form on 3 real email addresses (valid + invalid + edge-case)
- [ ] Verify all 6 product tabs load on mobile Safari (WebKit) — no layout jumps
- [ ] Verify Lenis smooth scroll doesn't fight iOS momentum on real device
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Add analytics events on `hero-cta-book-demo`, `nav-cta-book-demo`, `lead-submit-btn`
- [ ] Verify `prefers-reduced-motion` disables marquee, dot-pulse, loop and typewriter
- [ ] Verify contrast on all cream-on-panel and orange-on-cream combinations meets WCAG AA
