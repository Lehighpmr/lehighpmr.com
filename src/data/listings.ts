/**
 * Types and formatters for listings.
 * Live inventory lives in `data/listings.json` and is edited via `/admin`.
 */
export type {
  Listing,
  ListingInput,
  ListingStatus,
} from "@/lib/listings-types";
export {
  formatBeds,
  formatPrice,
  primaryImage,
} from "@/lib/listings-types";
