/**
 * Site copy for Lehigh Property Management & Realty LLC.
 * Logo: `public/brand/lehigh-logo.jpg` → `src/components/brand/logo.tsx`
 * (Logo artwork is not edited — LLC is text-only.)
 */

export const site = {
  brand: "Lehigh Property Management & Realty LLC",
  brandShort: "Lehigh",
  /** Temporarily blank on the public site until real launch (restore personal name later). */
  person: "",
  tagline: "Serving the Allentown area and the entire Valley",
  announcement:
    "Now open in Whitehall, serving the Allentown area and the entire Valley",
  heroHeadline: "Lehigh Property Management & Realty LLC",
  heroSupport:
    "Local expertise for Allentown, Whitehall, and the entire Valley — professional management for owners who want their rentals handled with care.",
  address: {
    line1: "779 3rd St",
    line2: "Whitehall, PA 18052",
  },
  about: {
    heading: "Why hire us?",
    eyebrow: "About our company",
    body: [
      "Lehigh Property Management & Realty LLC is a new local office in Whitehall. The practice is fresh — the experience behind it is not.",
      "Owners get established know-how with a personal, private-practice approach: clear communication, careful tenant placement, and day-to-day management that protects your investment without the corporate runaround.",
    ],
  },
  /** Mid-page company pitch (home). */
  pitch: {
    heading: "Lehigh Property Management and Realty LLC",
    body: "Our property management services are practical, professional, and designed to keep your rental performing at its best—from marketing and tenant screening through inspections and ongoing tenant requests. We also assist clients with buying or selling property. Lehigh Property Management & Realty LLC serves owners throughout the Allentown area and the entire Lehigh Valley.",
  },
  services: {
    heading: "Lehigh Valley property management services",
    intro:
      "Our property management services are practical, professional, and built to keep your rental performing — from marketing and screening through inspections and tenant requests.",
    items: [
      {
        id: "managing",
        title: "Managing rental properties",
        blurb:
          "Day-to-day oversight so your rental runs smoothly — occupancy, upkeep, and owner updates without you chasing every detail.",
      },
      {
        id: "rent",
        title: "Collecting rent",
        blurb:
          "Consistent rent collection and clear records so payments stay on schedule and you always know where things stand.",
      },
      {
        id: "tenants",
        title: "Advertising, screening & placing tenants",
        blurb:
          "We market your vacancy, screen applicants carefully, and place qualified tenants who fit the home and protect your investment.",
      },
      {
        id: "inspections",
        title: "Quarterly inspections",
        blurb:
          "Regular walkthroughs to monitor rental conditions early — so small issues don’t become expensive surprises.",
      },
      {
        id: "requests",
        title: "Tenant complaints & requests",
        blurb:
          "We answer tenant calls and requests promptly so problems get handled and your phone stays quieter.",
      },
    ],
  },
  actionCards: [
    {
      id: "pm",
      title: "Property management",
      body: "Looking for professional property management in the Lehigh Valley?",
      href: "#services",
      tone: "light" as const,
    },
    {
      id: "contact",
      title: "Talk with our team",
      body: "Have a property to manage? Reach out for a straightforward conversation.",
      href: "#contact",
      tone: "light" as const,
    },
    {
      id: "rentals",
      title: "Available rentals",
      body: "We’re a new office — check current availability or contact us about upcoming homes.",
      href: "/rentals",
      tone: "accent" as const,
    },
  ],
  areas: {
    heading: "Areas we serve",
    items: [
      "Allentown",
      "Whitehall",
      "Bethlehem",
      "Easton",
      "Catasauqua",
      "Emmaus",
      "Northampton",
      "Lehigh County",
      "Northampton County",
      "Surrounding Valley towns",
    ],
  },
  cta: {
    primary: "Available rentals",
    contact: "Contact us to get started",
    proposal: "Request a management consult",
  },
  contact: {
    email: "info@lehighpmr.com",
    phone: "(484) 484-8229",
    phoneDisplay: "484-484-8229",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#about", label: "Why hire us" },
    { href: "/rentals", label: "Rentals" },
    { href: "/#contact", label: "Contact" },
  ],
  logo: {
    src: "/brand/lehigh-logo.jpg",
    alt: "Lehigh Property Management & Realty LLC — Serving the Allentown area and the entire Valley",
  },
} as const;

export type ServiceItem = (typeof site.services.items)[number];
