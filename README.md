# Lehigh Property Management & Realty

Website for **Lehigh Property Management & Realty** (Elie Daher) — home page plus rentals listings. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

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
| `/` | Brand-first home: logo hero, services, about, address, CTA to rentals |
| `/rentals` | Sample listings with search/filters and an empty state |

## Brand assets & copy

| What | File |
| --- | --- |
| Logo | `public/brand/lehigh-logo.jpg` (wired in `src/components/brand/logo.tsx`) |
| Business name, person, tagline, address, about, services, contact | `src/content/site.ts` |
| Rental listings | `src/data/listings.ts` |
| Hero photo | `public/images/hero.jpg` |
| Listing photos | `public/images/listings/*.jpg` |

Office address is set to **779 3rd St, Whitehall, PA 18052**. Demo contact: **(610) 555-0148** / **hello@lehighpm.example**. About/services copy is still marked as placeholder until real content arrives.
