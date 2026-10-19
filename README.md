# Daher

Private real-estate website for Daher — a warm, place-rooted site with a home page and a rentals listing page. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327).

Production build:

```bash
npm run build
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Brand-first home: hero, services, about, address, CTA to rentals |
| `/rentals` | Sample listings with search/filters and an empty state |

## Swapping placeholders

| What | File |
| --- | --- |
| Logo / wordmark | `src/components/brand/logo.tsx` (or drop `public/logo.svg` and point the component at it) |
| Brand copy, about, services, contact | `src/content/site.ts` |
| Office address (set) | `src/content/site.ts` → `address` |
| Rental listings | `src/data/listings.ts` |
| Hero photo | `public/images/hero.jpg` |
| Listing photos | `public/images/listings/*.jpg` |

Placeholder notes are marked in the UI so real content is easy to spot.
