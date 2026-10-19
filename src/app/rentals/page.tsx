import type { Metadata } from "next";
import { RentalsBrowser } from "@/components/rentals/rentals-browser";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Rentals",
  description: `Homes and flats currently available through ${site.brand}.`,
};

export default function RentalsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="max-w-2xl daher-animate-fade-up">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-accent)]">
            Available to rent
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.02em] text-[var(--brand-ink)] sm:text-5xl">
            Current rentals
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">
            A short list of places ready for viewing. Details and photos are
            samples until live inventory is connected.
          </p>
        </header>

        <div className="mt-12">
          <RentalsBrowser />
        </div>
      </div>
    </div>
  );
}
