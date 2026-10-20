export type ListingStatus = "listed" | "rented" | "hidden";

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
  images: string[];
  available: string;
  status: ListingStatus;
};

export type ListingInput = Omit<Listing, "id"> & { id?: string };

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
