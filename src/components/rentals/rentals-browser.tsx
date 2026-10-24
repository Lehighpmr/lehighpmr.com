"use client";

import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { site } from "@/content/site";
import {
  formatBeds,
  formatPrice,
  primaryImage,
  type Listing,
} from "@/lib/listings-types";

type Filters = {
  query: string;
  neighborhood: string;
  area: string;
  maxPrice: string;
};

const ALL = "all";

function filterListings(items: Listing[], filters: Filters) {
  const q = filters.query.trim().toLowerCase();
  const max = filters.maxPrice ? Number(filters.maxPrice) : null;

  return items.filter((listing) => {
    if (
      filters.neighborhood !== ALL &&
      listing.neighborhood !== filters.neighborhood
    ) {
      return false;
    }
    if (filters.area !== ALL && listing.area !== filters.area) {
      return false;
    }
    if (max !== null && !Number.isNaN(max) && listing.price > max) {
      return false;
    }
    if (!q) return true;
    const haystack = [
      listing.title,
      listing.neighborhood,
      listing.area,
      listing.blurb,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function RentalsBrowser() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filters, setFilters] = useState<Filters>({
    query: "",
    neighborhood: ALL,
    area: ALL,
    maxPrice: "",
  });
  const deferred = useDeferredValue(filters);
  const results = useMemo(
    () => filterListings(listings, deferred),
    [listings, deferred],
  );
  const isStale = deferred !== filters;

  const neighborhoods = useMemo(
    () => Array.from(new Set(listings.map((l) => l.neighborhood))).sort(),
    [listings],
  );
  const areas = useMemo(
    () => Array.from(new Set(listings.map((l) => l.area))).sort(),
    [listings],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/listings", { cache: "no-store" });
        if (!res.ok) throw new Error("bad response");
        const data = (await res.json()) as { listings: Listing[] };
        if (!cancelled) {
          setListings(data.listings || []);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Could not load rentals right now.");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <p className="py-12 text-center text-sm text-[var(--brand-muted)]">
        Loading available rentals…
      </p>
    );
  }

  if (loadError) {
    return (
      <div className="border border-dashed border-[var(--brand-line)] px-6 py-12 text-center">
        <p className="font-semibold text-[var(--brand-navy)]">{loadError}</p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-[var(--brand-accent)] underline-offset-4 hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (listings.length === 0) {
    const tel = site.contact.phone.replace(/\D/g, "");
    return (
      <div className="border border-dashed border-[var(--brand-line)] bg-[var(--brand-surface-soft)] px-6 py-16 text-center">
        <p className="text-2xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)]">
          No rentals available yet
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--brand-muted)]">
          {site.brand} is a new office and we don’t have apartments listed for
          rent right now. Reach out if you’re looking for a home or want to list
          a property with us.
        </p>
        <p className="mt-6 text-sm text-[var(--brand-ink)]">
          <a
            href={`tel:${tel}`}
            className="font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
          >
            {site.contact.phone}
          </a>
          {" · "}
          <a
            href={`mailto:${site.contact.email}`}
            className="font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
          >
            {site.contact.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-1.5 text-sm">
          <span className="text-[var(--brand-muted)]">Search</span>
          <Input
            value={filters.query}
            onChange={(e) =>
              setFilters((f) => ({ ...f, query: e.target.value }))
            }
            placeholder="Neighborhood, title…"
            className="h-10 bg-white"
          />
        </label>

        <label className="space-y-1.5 text-sm">
          <span className="text-[var(--brand-muted)]">Neighborhood</span>
          <Select
            value={filters.neighborhood}
            onValueChange={(value) =>
              setFilters((f) => ({
                ...f,
                neighborhood: value ?? ALL,
              }))
            }
          >
            <SelectTrigger className="h-10 w-full bg-white">
              <SelectValue placeholder="All neighborhoods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All neighborhoods</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="space-y-1.5 text-sm">
          <span className="text-[var(--brand-muted)]">Area</span>
          <Select
            value={filters.area}
            onValueChange={(value) =>
              setFilters((f) => ({ ...f, area: value ?? ALL }))
            }
          >
            <SelectTrigger className="h-10 w-full bg-white">
              <SelectValue placeholder="All areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All areas</SelectItem>
              {areas.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="space-y-1.5 text-sm">
          <span className="text-[var(--brand-muted)]">Max monthly rent</span>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            step={50}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxPrice: e.target.value }))
            }
            placeholder="e.g. 2500"
            className="h-10 bg-white"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className={isStale ? "opacity-70 transition-opacity" : "transition-opacity"}
      >
        {results.length === 0 ? (
          <EmptyState
            onReset={() =>
              setFilters({
                query: "",
                neighborhood: ALL,
                area: ALL,
                maxPrice: "",
              })
            }
          />
        ) : (
          <ul className="divide-y divide-[var(--brand-line)] border-y border-[var(--brand-line)]">
            {results.map((listing) => (
              <li
                key={listing.id}
                className="group grid gap-6 py-8 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--muted)] md:aspect-[5/4]">
                  <Image
                    src={primaryImage(listing)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 320px"
                    unoptimized={primaryImage(listing).startsWith("http")}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--brand-navy)]">
                      {listing.title}
                    </h2>
                    <p className="text-lg font-medium text-[var(--brand-accent)]">
                      {formatPrice(listing.price)}
                      <span className="text-sm font-normal text-[var(--brand-muted)]">
                        /mo
                      </span>
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-[var(--brand-muted)]">
                    {listing.neighborhood} · {listing.area}
                  </p>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--brand-ink)]/85">
                    {listing.blurb}
                  </p>
                  <p className="mt-4 text-sm text-[var(--brand-muted)]">
                    {formatBeds(listing.beds)} · {listing.baths} bath
                    {listing.baths === 1 ? "" : "s"}
                    {listing.sqft
                      ? ` · ${listing.sqft.toLocaleString()} sq ft`
                      : ""}{" "}
                    · {listing.available}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-[var(--brand-line)] bg-[var(--brand-surface-soft)] px-6 py-16 text-center">
      <p className="text-2xl font-bold text-[var(--brand-navy)]">
        No rentals match these filters
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--brand-muted)]">
        Try widening the neighborhood or raising the max rent. You can also
        clear filters and browse everything currently listed.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-medium text-[var(--brand-accent)] underline-offset-4 hover:underline"
      >
        Clear filters
      </button>
    </div>
  );
}
