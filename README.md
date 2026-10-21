# Lehigh Property Management & Realty

Website for **Lehigh Property Management & Realty** — home, public rentals, and a small password-protected admin to manage listings. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Run locally

```bash
npm install
cp .env.example .env.local   # if you don't already have .env.local
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327).

## Deploy on Vercel

1. Push this repo and import it in [Vercel](https://vercel.com/new) (Framework Preset: Next.js).
2. In the project **Settings → Environment Variables**, set:
   - `ADMIN_PASSWORD` — a strong password (**not** `lehigh-demo-2026`)
   - `ADMIN_SESSION_SECRET` — a long random string (recommended)
3. In the project **Storage** tab, create a **Blob** store (Public access is fine) and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` (and OIDC vars when connected).
4. Deploy. Without Blob, the marketing site and seed rentals still load, but admin create/edit/upload will return an error until Blob is connected.
5. Open `/admin/login` with your production `ADMIN_PASSWORD`.

Production login is **blocked** if `ADMIN_PASSWORD` is missing or still set to the demo value.

### Storage on Vercel vs local

| | Local (`npm run dev`) | Vercel |
| --- | --- | --- |
| Listings | `data/listings.json` | Vercel Blob (`data/listings.json`) |
| Photo uploads | `public/uploads/` | Vercel Blob (`uploads/…`) |
| Seed images | `public/images/listings/` | same (bundled) |

Photo uploads via the server route are limited to **4MB** (Vercel request body limit).

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Public marketing home |
| `/rentals` | Public available rentals (reads live data) |
| `/admin/login` | Admin sign-in |
| `/admin` | Add / edit / hide / remove listings |

## Admin (listings)

1. Set `ADMIN_PASSWORD` (see `.env.example`).
2. Open `/admin/login` and sign in.
3. Add, edit, mark rented/hidden, or remove listings.
4. Public `/rentals` only shows listings with status **listed**.

**Demo password (local only):** `lehigh-demo-2026`  
**Change this before any real launch.**

## Brand & content

| What | Where |
| --- | --- |
| Logo | `public/brand/lehigh-logo.jpg` |
| Marketing copy | `src/content/site.ts` |
| Listings seed | `data/listings.json` |

**Set:** address `779 3rd St, Whitehall, PA 18052`, demo phone `(610) 555-0148`, email `hello@lehighpm.example`.

**Still placeholder:** social icon links; demo contact email domain.
