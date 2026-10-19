export type Listing = {
  id: string;
  title: string;
  neighborhood: string;
  area: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  blurb: string;
  image: string;
  available: string;
};

/** Sample listings — replace with real inventory when available. */
export const listings: Listing[] = [
  {
    id: "maple-2br",
    title: "Sunlit two-bedroom on Maple",
    neighborhood: "Maple Quarter",
    area: "East Brookhaven",
    price: 2450,
    beds: 2,
    baths: 1,
    sqft: 980,
    blurb:
      "Quiet upper-floor flat with south-facing windows, refreshed kitchen, and a shared garden courtyard two blocks from the tram.",
    image: "/images/listings/maple.jpg",
    available: "Available now",
  },
  {
    id: "harbor-studio",
    title: "Harbor-view studio loft",
    neighborhood: "Pier District",
    area: "Waterfront",
    price: 1890,
    beds: 0,
    baths: 1,
    sqft: 520,
    blurb:
      "Compact loft with tall windows, built-in storage, and an easy walk to the waterfront path. Ideal for a single professional.",
    image: "/images/listings/harbor.jpg",
    available: "Available Apr 1",
  },
  {
    id: "cedar-3br",
    title: "Family home near Cedar Park",
    neighborhood: "Cedar Park",
    area: "North Brookhaven",
    price: 3200,
    beds: 3,
    baths: 2,
    sqft: 1450,
    blurb:
      "Detached cottage with a fenced yard, updated baths, and morning light in the dining room. Close to schools and the weekend market.",
    image: "/images/listings/cedar.jpg",
    available: "Available now",
  },
  {
    id: "garden-1br",
    title: "Garden-level one-bedroom",
    neighborhood: "Orchard Lane",
    area: "West Brookhaven",
    price: 1750,
    beds: 1,
    baths: 1,
    sqft: 710,
    blurb:
      "Calm ground-floor unit opening onto a private patio. Soft finishes, in-unit laundry, and street parking included.",
    image: "/images/listings/garden.jpg",
    available: "Available mid-April",
  },
  {
    id: "ridge-2br",
    title: "Ridge Avenue duplex suite",
    neighborhood: "Ridge Avenue",
    area: "South Hills",
    price: 2650,
    beds: 2,
    baths: 1.5,
    sqft: 1100,
    blurb:
      "Bright duplex with a flexible office nook, generous closets, and hillside views. Pet-friendly with owner approval.",
    image: "/images/listings/ridge.jpg",
    available: "Available now",
  },
];

export const neighborhoods = Array.from(
  new Set(listings.map((l) => l.neighborhood)),
).sort();

export const areas = Array.from(new Set(listings.map((l) => l.area))).sort();

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatBeds(beds: number) {
  if (beds === 0) return "Studio";
  return `${beds} bed${beds === 1 ? "" : "s"}`;
}
