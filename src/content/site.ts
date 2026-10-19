/**
 * Site copy — swap placeholder about/services when real content arrives.
 * Logo file: `public/brand/lehigh-logo.jpg` (wired in `src/components/brand/logo.tsx`).
 */

export const site = {
  /** Business name */
  brand: "Lehigh Property Management & Realty",
  /** Short mark for compact contexts */
  brandShort: "Lehigh",
  /** Principal / person */
  person: "Elie Daher",
  /** Tagline from the logo */
  tagline: "Serving the Allentown area and the entire Valley",
  heroHeadline: "Private real estate, handled with care.",
  heroSupport:
    "Elie Daher helps with renting, buying, and looking after the places that matter — across Allentown and the Lehigh Valley.",
  address: {
    line1: "779 3rd St",
    line2: "Whitehall, PA 18052",
  },
  /** PLACEHOLDER — short about copy */
  about: {
    heading: "About Elie Daher",
    body: "Elie Daher leads Lehigh Property Management & Realty with a focus on clear advice and careful follow-through. Whether you need a well-matched rental, a thorough inspection before you commit, or steady help managing a property, the work stays personal — one client, one property, one conversation at a time.",
    note: "Placeholder about copy — replace with the real bio",
  },
  /** PLACEHOLDER — services list */
  services: {
    heading: "Services",
    note: "Placeholder services — refine or reorder as needed",
    items: [
      "Residential renting & tenant matching",
      "Property inspections & condition reports",
      "Buyer and seller advisory",
      "Lease renewals & rent reviews",
      "Light property management support",
      "Neighborhood pricing guidance",
    ],
  },
  cta: {
    primary: "Browse rentals",
    secondary: "See what’s available",
  },
  contact: {
    email: "hello@lehighpm.example",
    phone: "(610) 555-0148",
  },
  logo: {
    src: "/brand/lehigh-logo.jpg",
    alt: "Lehigh Property Management & Realty — Serving the Allentown area and the entire Valley",
  },
} as const;
