export type ListingStatus = "listed" | "rented" | "hidden";

export type Listing = {
  id: string;
  title: string;
  /** Street / place address shown on public rentals. */
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  blurb: string;
  images: string[];
  available: string;
  status: ListingStatus;
};

/** Create/update payload. Legacy `neighborhood` / `area` accepted for migration. */
export type ListingInput = Omit<Listing, "id"> & {
  id?: string;
  neighborhood?: string;
  area?: string;
};

/** Raw stored shape may still carry neighborhood/area from older saves. */
export type ListingRecord = Partial<Listing> & {
  id?: string;
  neighborhood?: string;
  area?: string;
};

export function addressFromParts(parts: {
  address?: string | null;
  neighborhood?: string | null;
  area?: string | null;
}) {
  const direct = String(parts.address || "").trim();
  if (direct) return direct;
  return [parts.neighborhood, parts.area]
    .map((p) => String(p || "").trim())
    .filter(Boolean)
    .join(", ");
}

export function coerceListing(raw: ListingRecord): Listing | null {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id || "").trim();
  if (!id) return null;
  const status = (raw.status || "listed") as ListingStatus;
  return {
    id,
    title: String(raw.title || "").trim(),
    address: addressFromParts(raw),
    price: Number(raw.price) || 0,
    beds: Number(raw.beds) || 0,
    baths: Number(raw.baths) || 0,
    sqft: Number(raw.sqft) || 0,
    blurb: String(raw.blurb || "").trim(),
    images: Array.isArray(raw.images)
      ? raw.images.filter(Boolean).map(String)
      : [],
    available: String(raw.available || "").trim(),
    status: ["listed", "rented", "hidden"].includes(status)
      ? status
      : "listed",
  };
}

export function primaryImage(listing: Listing) {
  return listing.images[0] || "/images/listings/maple.jpg";
}

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
