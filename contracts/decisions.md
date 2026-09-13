# Architecture Decisions Record (ADR) — Nineetiestudio

## ADR-001: Luxury Editorial Redesign Architecture & Design System

### Status
Accepted

### Context
Nineetiestudio (`nineetiestudio.vercel.app`) is upgrading its online presence to a luxury editorial photography studio brand, migrating to its custom domain `nineetiestudio.biz.id`. The current UI lacks high-end aesthetic cohesion, needs tighter mobile responsiveness, refined typography, structured SEO (Schema.org LocalBusiness & Photography), and deterministic interactive tools (interactive pricing calculator, luxury filterable portfolio gallery with full-screen lightbox, and validated booking generator).

### Decision
1. **Design System & Aesthetics:**
   - Adhere strictly to `ANTI_SLOP_DESIGN_SPEC.md`.
   - Typography: Pair editorial luxury serif (`Playfair Display` / `Cinzel`) with clean modern geometric sans (`DM Sans` / `Plus Jakarta Sans`).
   - Palette: Deep cinematic noir (`#121316`, `#1A1B20`), warm champagne gold (`#D4AF37`, `#C5A880`, `#E6CA65`), alabaster/cream neutrals (`#FAF8F5`, `#F3EFEA`), and subtle border translucency (`rgba(212, 175, 55, 0.15)`). Absolute ban on saturated pure black `#000000` and generic neon cyan/purple gradients.
   - Micro-interactions: Hardware-accelerated transitions (`transform`, `opacity`), subtle magnetic buttons, polished cursor accents on desktop with mobile fallback, and fluid typography via `clamp()`.

2. **Frontend Architecture & Client-Side Engine:**
   - Multi-page static architecture optimized for Vercel edge delivery.
   - Clean routing without `.html` extensions via `vercel.json` rewrites/cleanUrls.
   - Deterministic booking builder with instant price calculation and direct WhatsApp API URL formulation with pre-filled, formatted booking briefs.
   - High-performance vanilla JavaScript modules with strict teardown/cleanup to prevent memory leaks.

3. **Domain & SEO Strategy (`nineetiestudio.biz.id`):**
   - Canonical URL set to `https://nineetiestudio.biz.id`.
   - Complete Open Graph (OG), Twitter Cards, and JSON-LD structured data (`PhotographyBusiness` & `LocalBusiness`).
   - Security headers in `vercel.json` (Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Content-Security-Policy).

### Consequences
- **Positive:** Dramatic leap in brand perception, conversion rate for wedding/graduation packages, zero runtime framework bloat, sub-100ms first paint, full accessibility (A11y), clean domain migration.
- **Trade-offs:** Requires strict synchronization across multi-page HTML templates to ensure navigation, footer, and brand consistency.

---

## ADR-002: Booking & Pricing Engine Logic

### Status
Accepted

### Context
Clients booking photography packages need an intuitive way to customize duration, addons (extra photographer, same-day edit, studio rental, printed albums), calculate estimated cost in real-time, and generate a validated WhatsApp message for immediate confirmation.

### Decision
Implement an in-browser deterministic state machine for package selection and pricing calculation with automatic WhatsApp deep-linking, eliminating third-party form dependencies and guaranteeing zero data loss.
