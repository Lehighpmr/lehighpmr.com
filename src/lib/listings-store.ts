import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Listing, ListingInput, ListingStatus } from "@/lib/listings-types";

const DATA_PATH = path.join(process.cwd(), "data", "listings.json");

async function ensureFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, "[]\n", "utf8");
  }
}

export async function readAllListings(): Promise<Listing[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const parsed = JSON.parse(raw) as Listing[];
  return Array.isArray(parsed) ? parsed : [];
}

export async function readPublicListings(): Promise<Listing[]> {
  const all = await readAllListings();
  return all.filter((l) => l.status === "listed");
}

async function writeAll(listings: Listing[]) {
  await ensureFile();
  await fs.writeFile(DATA_PATH, `${JSON.stringify(listings, null, 2)}\n`, "utf8");
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function normalize(input: ListingInput, existingId?: string): Listing {
  const images = (input.images || []).filter(Boolean);
  const status = (input.status || "listed") as ListingStatus;
  return {
    id: existingId || input.id || `${slugify(input.title) || "listing"}-${randomUUID().slice(0, 8)}`,
    title: String(input.title || "").trim(),
    neighborhood: String(input.neighborhood || "").trim(),
    area: String(input.area || "").trim(),
    price: Number(input.price) || 0,
    beds: Number(input.beds) || 0,
    baths: Number(input.baths) || 0,
    sqft: Number(input.sqft) || 0,
    blurb: String(input.blurb || "").trim(),
    images: images.length ? images : [],
    available: String(input.available || "").trim(),
    status: ["listed", "rented", "hidden"].includes(status) ? status : "listed",
  };
}

export async function createListing(input: ListingInput): Promise<Listing> {
  const listings = await readAllListings();
  const listing = normalize(input);
  if (!listing.title) throw new Error("Title is required");
  listings.unshift(listing);
  await writeAll(listings);
  return listing;
}

export async function updateListing(
  id: string,
  input: ListingInput,
): Promise<Listing | null> {
  const listings = await readAllListings();
  const index = listings.findIndex((l) => l.id === id);
  if (index < 0) return null;
  const listing = normalize({ ...listings[index], ...input }, id);
  if (!listing.title) throw new Error("Title is required");
  listings[index] = listing;
  await writeAll(listings);
  return listing;
}

export async function deleteListing(id: string): Promise<boolean> {
  const listings = await readAllListings();
  const next = listings.filter((l) => l.id !== id);
  if (next.length === listings.length) return false;
  await writeAll(next);
  return true;
}
