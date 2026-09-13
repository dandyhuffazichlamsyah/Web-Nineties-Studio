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

---

## ADR-003: WhatsApp Business Update & Full Instagram Profile Data Ingestion

### Status
Accepted

### Context
Client requested official business WhatsApp number updated to `085174350715` across all contact points, booking deep links, and structured data, along with a complete scrape and ingestion of all 71 authentic Instagram posts from `@nineetiestudio` with verified captions, category classification, and high-resolution local storage.

### Decision
1. **WhatsApp Contact Synchronization:**
   - Updated all deep-link endpoints to `https://wa.me/6285174350715`.
   - Updated visible contact labels and footer links to `+62 851-7435-0715`.
   - Updated JSON-LD structured data and contract specifications.
2. **Complete 71-Post Ingestion:**
   - Scraped all 71 profile posts from `@nineetiestudio` via browser session.
   - Preserved 100% authentic captions, dates, and Instagram post permalinks.
   - Categorized into `prewedding` (44), `event` (14), `wisuda` (7), `wedding` (3), and `birthday` (3).
   - Stored all 71 images locally in `assets/images/instagram/ig_1.jpg` to `ig_71.jpg` to prevent CDN link expiration.
3. **Cache Busting Strategy:**
   - Elevated asset cache busters to `?v=4.0` across all 6 HTML templates.

---

## ADR-004: Fluid Mobile-First Responsive Design (RWD) Overhaul

### Status
Accepted

### Context
Client reported that mobile layout previously felt bulky, heavy, or chunky ("gendut gitu jelek") due to rigid grid minimums (320px), oversized heading typography on small viewports, inline grid column spans overriding mobile rules, multi-line pill wrap stacks, and bulky card paddings.

### Decision
1. **Fluid Typography & Spacing Scales:**
   - Redefined `h1`, `h2`, `h3`, and `.lead` with viewport-proportional `clamp()` values specifically tuned for mobile (e.g., `h1` at `clamp(1.75rem, 5.5vw, 2.25rem)`).
   - Reduced `--section-padding` to `42px 0` and mobile container padding to `1.15rem` (down to `0.95rem` on `<480px`).
2. **Compact & Slim Component Structure:**
   - Refined hero visual frame to max `290px` width (and `260px` on small screens) with floating badges securely positioned within viewport bounds.
   - Bento grid and inline `grid-column: span *` fully neutralized on mobile via `display: flex; flex-direction: column; width: 100%;`.
   - Card paddings (`.pricing-card`, `.bento-card`, `.calculator-box`, `.form-card`, `.cta-card`) scaled down to `1.2rem - 1.4rem`.
   - Native-feel horizontal smooth-swipe track for filter pills (`.filter-pills`) and pricing tabs (`.pricing-tabs`) with hidden scrollbars.
   - Gallery media aspect ratio tuned to `4/3` on single-column mobile to prevent disproportionate height.
3. **Cache Invalidation:**
   - Elevated cache-busting token to `?v=5.0` on all CSS and JavaScript tags across all 6 pages.
