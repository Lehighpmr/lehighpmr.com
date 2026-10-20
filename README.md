# Lehigh Property Management & Realty

Website for **Lehigh Property Management & Realty** (Elie Daher) — home, public rentals, and a small password-protected admin to manage listings. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Run locally

```bash
npm install
cp .env.example .env.local   # if you don't already have .env.local
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327).

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Public marketing home |
| `/rentals` | Public available rentals (reads live data) |
| `/admin/login` | Admin sign-in |
| `/admin` | Add / edit / hide / remove listings |

## Admin (listings)

1. Set `ADMIN_PASSWORD` in `.env.local` (see `.env.example`).
2. Open `/admin/login` and sign in.
3. Add, edit, mark rented/hidden, or remove listings. Photo upload saves files under `public/uploads/` and stores the public URL on the listing.
4. Public `/rentals` only shows listings with status **listed**.

**Demo password (local/preview default):** `lehigh-demo-2026`  
**Change this before any real launch.** Do not leave the demo password on a production host.

### How photos work

- Admin upload → `POST /api/admin/upload` (auth required) → file written to `public/uploads/`.
- Listing JSON stores paths like `/uploads/….jpg`.
- Seed images still live in `public/images/listings/`.
- For production later: swap the upload handler to S3/Cloudinary (or similar) and keep the same URL field on listings.

### Data file

- Source of truth: `data/listings.json` (seeded with the original sample rentals).
- Admin writes update this file. There is no separate hardcoded public list.

## Brand & content

| What | Where |
| --- | --- |
| Logo | `public/brand/lehigh-logo.jpg` |
| Marketing copy | `src/content/site.ts` |
| Listings data | `data/listings.json` |

**Set:** address `779 3rd St, Whitehall, PA 18052`, demo phone `(610) 555-0148`, email `hello@lehighpm.example`.

**Still placeholder:** social icon links; demo contact email domain.
