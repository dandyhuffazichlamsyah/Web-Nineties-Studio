# Data Contract — Nineetiestudio

## 1. Domain Configuration & SEO Metadata

```yaml
canonical_domain: "https://nineetiestudio.biz.id"
fallback_domain: "https://nineetiestudio.vercel.app"
brand_name: "Nineetiestudio"
tagline: "High-Resolution Memories with Timeless Elegance"
contact:
  phone_wa: "6285174350715"
  instagram: "@nineetiestudio"
  instagram_url: "https://instagram.com/nineetiestudio"
  location: "Jakarta, Indonesia"
```

## 2. Service & Package Schema

### Package Tier Structure

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Unique package slug (e.g. `silver-1`, `gold-video`) |
| `name` | `string` | Yes | Display name |
| `category` | `string` | Yes | Enum: `'foto' \| 'foto-video' \| 'wedding' \| 'graduation' \| 'event'` |
| `duration` | `string` | Yes | Coverage duration (e.g. '1 Jam', '3 Jam', 'Full Day') |
| `price_idr` | `number` | Yes | Price in Rupiah (integer, e.g. 650000) |
| `price_display` | `string` | Yes | Formatted price string (e.g. 'Rp650.000' or '650k') |
| `crew` | `string` | Yes | Team deployed (e.g. '1 Photographer + 1 Assistant') |
| `deliverables` | `string[]` | Yes | List of confirmed outputs |
| `is_popular` | `boolean` | No | Highlight badge flag |

### Addon Schema

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | Yes | Addon slug (e.g. `extra-hour`, `video-teaser`, `printed-album`) |
| `name` | `string` | Yes | Display title |
| `price_idr` | `number` | Yes | Price per unit or fixed |
| `unit` | `string` | Yes | 'per-jam', 'per-album', 'flat' |

## 3. Booking Inquiry DTO (Client-Side State)

```typescript
interface BookingInquiry {
  clientName: string;           // min 2 chars, sanitized
  clientPhone: string;          // valid Indonesian mobile number (08xx or 628xx)
  eventType: 'Wedding' | 'Graduation' | 'Event' | 'Birthday' | 'Prewedding' | 'Personal' | 'Other';
  eventDate: string;            // ISO format YYYY-MM-DD
  eventLocation: string;        // Venue name & city
  packageId: string;            // selected package id
  selectedAddons: string[];     // array of addon ids
  estimatedTotalIdr: number;    // calculated total
  notes?: string;               // special client requests
}
```

## 4. WhatsApp Output Message Schema

```text
Halo Nineetiestudio! ✨

Saya ingin melakukan reservasi sesi dokumentasi dengan rincian berikut:

• *Nama:* {clientName}
• *Nomor WhatsApp:* {clientPhone}
• *Jenis Acara:* {eventType}
• *Tanggal Acara:* {eventDate}
• *Lokasi/Venue:* {eventLocation}
• *Paket Terpilih:* {packageName} ({packagePrice})
• *Add-on Tambahan:* {addonsListSummary}
• *Estimasi Total:* {formattedTotal}
• *Catatan Khusus:* {notes}

Mohon konfirmasi ketersediaan jadwal pada tanggal tersebut. Terima kasih!
```
