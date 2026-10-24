import type { Metadata } from "next";
import Link from "next/link";
import { RentalsBrowser } from "@/components/rentals/rentals-browser";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Available Rentals",
  description: `Homes and flats currently available through ${site.brand}.`,
};

export default function RentalsPage() {
  return (
    <div className="pb-16">
      <div className="border-b border-[var(--brand-line)] bg-[var(--brand-surface-soft)] px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
            {site.brandShort} rentals
          </p>
          <h1 className="mt-2 text-3xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)] sm:text-4xl">
            Available rentals
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--brand-muted)]">
            Browse homes listed through {site.brand}. Nothing available right
            now? Reach out — or{" "}
            <Link
              href="/#contact"
              className="font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
            >
              contact us
            </Link>{" "}
            if you’d like to list a property.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <RentalsBrowser />
      </div>
    </div>
  );
}
