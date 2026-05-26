@AGENTS.md

# First Choice Care — Project Rules

## Project Overview
- **Business:** First Choice Care — home health care agency, Atlanta, GA
- **Services:** GAPP (Georgia's Aging and Disability programs) + private pay
- **Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion v12
- **Structure:** `src/app/` for pages/layouts, `src/components/` for shared components

## Placeholders (replace when user provides real data)
- Phone: `(404) 555-1234` / `+14045551234` — appears in FloatingActions, StickyCTABar, Footer, Hero, JSON-LD
- Email: `info@firstchoicecare.com` — appears in Footer and contact section
- Testimonials: sample quotes — replace with real client quotes when provided
- Social URLs: `#` placeholders in Footer

## Brand Colors (exact hex — do not invent new values)
- `--brand-dark: #F8F3E8` — warm cream main background
- `--brand-dark-alt: #F0E8D5` — slightly deeper cream alt bg
- `--brand-olive: #86B060` — olive accent (badges, borders, bg tints)
- `--brand-olive-dark: #5A7838` — deep olive (button bg)
- `--brand-olive-lt: #4E7A28` — dark olive — readable text on cream
- `--brand-cream: #9A7828` — dark amber — readable text on cream
- `--brand-gold: #9A7020` — dark warm gold — readable on cream
- Primary CTA gradient: `linear-gradient(135deg, #86B060, #4E7A28)`

## Local Dev Server
- Start with: `npm run dev` (Next.js Turbopack, port 3000)
- URL: `http://localhost:3000`
- Do not start a second instance if already running
- Check with: `netstat -an | findstr :3000`

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly
- Do not improve or add to the design — match it
- Compare output against reference, fix mismatches. Do at least 2 comparison rounds

## Styling Rules
- **Inline styles** for motion/animation elements — Tailwind classes on `motion.*` elements can fail to resolve CSS variables during animation
- **CSS variables** via `style={{ color: "var(--brand-olive-lt)" }}` for themed colors in static elements
- **Hardcoded hex** for colors inside Framer Motion `initial`/`animate`/`exit` props
- **Tailwind v4** — no `tailwind.config.js`, uses `@import "tailwindcss"` in globals.css
- Do not add `tailwind.config.js` or use CDN Tailwind

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.) — use brand colors above
- **Shadows:** Use layered, color-tinted shadows — e.g. `0 4px 16px rgba(78,122,40,0.40)`
- **Typography:** Headings and body use different font weights/sizes. Tight tracking on large headings
- **Gradients:** Layer radial gradients for depth; add grain/texture via SVG noise filter where appropriate
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states
- **Spacing:** Use intentional consistent spacing — not random Tailwind steps

## Hard Rules
- Do not add sections, features, or content not requested
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not break the cream/olive theme
- Do not add `"use client"` to server components — only add to components that use hooks or browser APIs
- Do not skip the `@AGENTS.md` Next.js version rules at the top
