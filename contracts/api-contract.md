# API & Routing Contract — Nineetiestudio

## 1. Clean Routing & Navigation Endpoints

| URL Path | Source File | Purpose | Canonical Target |
|---|---|---|---|
| `/` | `index.html` | Editorial Landing Page (Hero, Showcase, Stats, Highlights) | `https://nineetiestudio.biz.id/` |
| `/services` | `services.html` | Detailed Photography & Videography Services & Methodology | `https://nineetiestudio.biz.id/services` |
| `/pricelist` | `pricelist.html` | Packages 2026, Features, Pricing Calculator | `https://nineetiestudio.biz.id/pricelist` |
| `/gallery` | `gallery.html` | Filterable Editorial Portfolio with Fullscreen Lightbox | `https://nineetiestudio.biz.id/gallery` |
| `/contact` | `contact.html` | Booking Inquiry Form with WhatsApp Dispatcher & Map | `https://nineetiestudio.biz.id/contact` |
| `/terms` | `terms.html` | Booking Policies, Down Payment (DP), Rescheduling & Terms | `https://nineetiestudio.biz.id/terms` |

## 2. Vercel Header & Security Edge Contract (`vercel.json`)

All outgoing HTTP responses from `nineetiestudio.biz.id` and `nineetiestudio.vercel.app` must enforce the following security and caching headers:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## 3. Client-Side WhatsApp Bridge Contract

- **Endpoint:** `https://wa.me/6285174350715`
- **Method:** `GET` with encoded query parameter `text`
- **Validation Rules:**
  - Phone and name must not be empty.
  - Form validation must block dispatch if required fields fail validation.
  - On submit: open WhatsApp tab in `_blank` with `rel="noopener noreferrer"`.
