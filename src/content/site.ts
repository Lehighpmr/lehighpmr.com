/**
 * Site copy for Lehigh Property Management and Realty LLC.
 * Logo: `public/brand/lehigh-logo.jpg` → `src/components/brand/logo.tsx`
 * (Logo artwork is not edited — company name in text uses “and”, not &.)
 */

export const site = {
  brand: "Lehigh Property Management and Realty LLC",
  brandShort: "Lehigh",
  /** Keep blank on the public site (do not show a personal name). */
  person: "",
  tagline: "Serving the Allentown area",
  announcement:
    "Now open in Whitehall, serving the Allentown area",
  heroHeadline: "Lehigh Property Management and Realty LLC",
  heroSupport:
    "Local expertise for Allentown and Whitehall — professional management for owners who want their rentals handled with care.",
  address: {
    line1: "779 3rd St, Suite 101",
    line2: "Whitehall, PA 18052",
  },
  about: {
    heading: "Why hire us?",
    eyebrow: "About our company",
    body: [
      "Lehigh Property Management and Realty LLC is a new local office in Whitehall. The practice is fresh — the experience behind it is not.",
      "Owners get established know-how with a personal, private-practice approach: clear communication, careful tenant placement, and day-to-day management that protects your investment without the corporate runaround.",
    ],
  },
  /** Mid-page company pitch (home). */
  pitch: {
    heading: "Lehigh Property Management and Realty LLC",
    body: "Our property management services are practical, professional, and designed to keep your rental performing at its best—from marketing and tenant screening through inspections and ongoing tenant requests. We also assist clients with buying or selling property. Lehigh Property Management and Realty LLC serves owners throughout the Allentown area.",
  },
  services: {
    heading: "Lehigh Property Management Services",
    intro:
      "From rent collection and tenant placement to quarterly walkthroughs and day-to-day requests, here’s how we support owners across every stage of the rental lifecycle.",
    items: [
      {
        id: "managing",
        title: "Managing rental properties",
        blurb:
          "Day-to-day oversight so your rental runs smoothly — occupancy, inspections, and owner updates without you chasing every detail.",
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
          "We market your vacancy, screen applicants carefully, and place qualified tenants who meet our written rental criteria and protect your investment.",
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
      body: "Looking for professional property management in the Allentown area?",
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
    {
      id: "buySell",
      title: "Buy or Sell",
      body: "Thinking of buying or selling a property? Contact us",
      href: "#contact",
      tone: "light" as const,
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
      "Surrounding towns",
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
  social: {
    instagram: {
      href: "https://www.instagram.com/lehighpmr/",
      label: "@lehighpmr",
    },
  },
  equalHousing:
    "We are an Equal Housing Opportunity provider. We do business in accordance with the Fair Housing Act.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#about", label: "Why hire us" },
    { href: "/rentals", label: "Rentals" },
    { href: "/#contact", label: "Contact" },
  ],
  logo: {
    src: "/brand/lehigh-logo.jpg",
    alt: "Lehigh Property Management and Realty LLC — Serving the Allentown area",
  },
} as const;

export type ServiceItem = (typeof site.services.items)[number];
