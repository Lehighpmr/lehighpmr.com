import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { BlobNotFoundError, head, put } from "@vercel/blob";
import type { Listing, ListingInput, ListingStatus } from "@/lib/listings-types";
import { usesBlobStorage } from "@/lib/storage";

const LOCAL_DATA_PATH = path.join(process.cwd(), "data", "listings.json");
/** Legacy single overwritten object (CDN-stale risk). Migrated away on write. */
const LEGACY_BLOB_PATHNAME = "data/listings.json";
/** Small pointer to the latest immutable listings snapshot. */
const POINTER_PATHNAME = "data/listings-pointer.json";

type ListingsPointer = {
  pathname: string;
  url: string;
  updatedAt: number;
};

/** Write-through cache so same isolate does not re-read after a put. */
let memoryCache: Listing[] | null = null;

async function ensureLocalFile() {
  try {
    await fs.access(LOCAL_DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
    await fs.writeFile(LOCAL_DATA_PATH, "[]\n", "utf8");
  }
}

async function readSeedListings(): Promise<Listing[]> {
  try {
    const raw = await fs.readFile(LOCAL_DATA_PATH, "utf8");
    const parsed = JSON.parse(raw) as Listing[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cacheListings(listings: Listing[]) {
  memoryCache = listings.map((l) => ({ ...l, images: [...l.images] }));
}

function fromCache(): Listing[] | null {
  if (!memoryCache) return null;
  return memoryCache.map((l) => ({ ...l, images: [...l.images] }));
}

function bustUrl(url: string, token: string | number) {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${encodeURIComponent(String(token))}`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Blob fetch failed (${res.status})`);
  }
  return (await res.json()) as T;
}

async function readLegacyBlobListings(): Promise<Listing[] | null> {
  try {
    const meta = await head(LEGACY_BLOB_PATHNAME);
    const version =
      meta.uploadedAt instanceof Date
        ? meta.uploadedAt.toISOString()
        : String(meta.uploadedAt);
    const parsed = await fetchJson<Listing[]>(bustUrl(meta.url, version));
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    if (e instanceof BlobNotFoundError) return null;
    throw e;
  }
}

async function readFromBlob(): Promise<Listing[]> {
  const cached = fromCache();
  if (cached) return cached;

  try {
    const pointerMeta = await head(POINTER_PATHNAME);
    const version =
      pointerMeta.uploadedAt instanceof Date
        ? pointerMeta.uploadedAt.toISOString()
        : String(pointerMeta.uploadedAt);
    const pointer = await fetchJson<ListingsPointer>(
      bustUrl(pointerMeta.url, version),
    );
    if (!pointer?.url) {
      throw new Error("Listings pointer is missing url");
    }
    // Snapshot pathnames are immutable — safe to cache-bust by pointer updatedAt.
    const parsed = await fetchJson<Listing[]>(
      bustUrl(pointer.url, pointer.updatedAt || version),
    );
    if (!Array.isArray(parsed)) {
      throw new Error("Blob listings payload is not an array");
    }
    cacheListings(parsed);
    return fromCache() ?? parsed;
  } catch (e) {
    // Only fall through to migrate/seed when the pointer object is missing.
    // Any other failure must surface — never overwrite good data with seed.
    if (!(e instanceof BlobNotFoundError)) {
      throw e;
    }
  }

  // No pointer yet — migrate legacy object or seed once (never wipe existing).
  const legacy = await readLegacyBlobListings();
  if (legacy) {
    await writeToBlob(legacy);
    return fromCache() ?? legacy;
  }

  const seed = await readSeedListings();
  await writeToBlob(seed);
  return fromCache() ?? seed;
}

async function writeToBlob(listings: Listing[]) {
  const pathname = `data/snapshots/${Date.now()}-${randomUUID().slice(0, 8)}.json`;
  const snapshot = await put(
    pathname,
    `${JSON.stringify(listings, null, 2)}\n`,
    {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    },
  );

  const pointer: ListingsPointer = {
    pathname: snapshot.pathname,
    url: snapshot.url,
    updatedAt: Date.now(),
  };

  await put(POINTER_PATHNAME, `${JSON.stringify(pointer)}\n`, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });

  cacheListings(listings);
}

async function readFromLocal(): Promise<Listing[]> {
  await ensureLocalFile();
  const raw = await fs.readFile(LOCAL_DATA_PATH, "utf8");
  const parsed = JSON.parse(raw) as Listing[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeToLocal(listings: Listing[]) {
  await ensureLocalFile();
  await fs.writeFile(
    LOCAL_DATA_PATH,
    `${JSON.stringify(listings, null, 2)}\n`,
    "utf8",
  );
}

export async function readAllListings(): Promise<Listing[]> {
  if (usesBlobStorage()) return readFromBlob();
  return readFromLocal();
}

export async function readPublicListings(): Promise<Listing[]> {
  const all = await readAllListings();
  return all.filter((l) => l.status === "listed");
}

async function writeAll(listings: Listing[]) {
  if (usesBlobStorage()) {
    await writeToBlob(listings);
    return;
  }
  if (process.env.VERCEL) {
    throw new Error(
      "Writable storage is not configured. Create a Vercel Blob store and set BLOB_READ_WRITE_TOKEN (or connect the store for OIDC).",
    );
  }
  await writeToLocal(listings);
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
    id:
      existingId ||
      input.id ||
      `${slugify(input.title) || "listing"}-${randomUUID().slice(0, 8)}`,
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
    status: ["listed", "rented", "hidden"].includes(status)
      ? status
      : "listed",
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

/** Partial update — only touches `status` (and availability label when rented). */
export async function updateListingStatus(
  id: string,
  status: ListingStatus,
  available?: string,
): Promise<Listing | null> {
  if (!["listed", "rented", "hidden"].includes(status)) {
    throw new Error("Invalid status");
  }
  const listings = await readAllListings();
  const index = listings.findIndex((l) => l.id === id);
  if (index < 0) return null;
  const current = listings[index];
  const next: Listing = {
    ...current,
    status,
    available:
      available !== undefined
        ? String(available).trim()
        : status === "rented"
          ? "Rented"
          : status === "listed" && current.available === "Rented"
            ? "Available now"
            : current.available,
  };
  listings[index] = next;
  await writeAll(listings);
  return next;
}

export async function deleteListing(id: string): Promise<boolean> {
  const listings = await readAllListings();
  const next = listings.filter((l) => l.id !== id);
  if (next.length === listings.length) return false;
  await writeAll(next);
  return true;
}
