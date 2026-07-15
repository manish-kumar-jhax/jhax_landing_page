# JHAX.ai — Landing Page PRD

## Problem statement
Build a full-responsive, Awwwards-level landing page for JHAX.ai (AI COO for independent restaurant owners, 1–15 locations). Convert both restaurant operators and VCs. Single primary CTA: Book a 20-minute demo.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll)
- Backend: FastAPI + MongoDB (leads capture)
- Single page, no routing needed beyond `/`

## User personas
1. Independent restaurant operator (1–15 locations)
2. VC investor evaluating restaurant SaaS

## Core requirements (static)
- 12 sections per spec
- Dark aesthetic: #080808 base + #E8500A orange
- Fonts: Bricolage Grotesque / Inter / JetBrains Mono
- Save demo email leads to MongoDB
- Fully responsive, kinetic hero, editorial marquee, numbered chapters

## Implemented (2026-12)
- Nav (fixed, blurred, animated) with CTA
- Hero with masked line-by-line reveal + parallax + Live Demo Card (cycling typewriter with 6 questions and 3 rotating AI responses)
- Trust strip (integrations + live restaurant count)
- Problem section (2-column comparison, X vs ✓)
- Product demo mockup with tabs, KPIs, Health Score ring, ask-anything bar
- How It Works — 3 numbered step cards with watermark numerals
- 9-card feature grid (Features as Benefits with rare-tag badges)
- The Loop — 5 stages (DETECT → MEASURE) + orange-bordered callout
- Editorial marquee (slow kinetic type)
- FAQ accordion with 8 items
- Stats strip (4 stats, market proof)
- Final CTA with email form → POST /api/leads → success/error states
- Footer
- Backend: POST/GET /api/leads with EmailStr validation, MongoDB persistence

## Backlog (P0/P1/P2)
- P1: Add scroll progress bar indicator
- P1: Add cursor blob following mouse in hero
- P2: Real Square OAuth-style trust badge
- P2: Case study section (once first customer testimonial available)
- P2: Admin dashboard to view leads
