"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function ServicesPanel() {
  const [activeId, setActiveId] = useState<string>(site.services.items[0].id);
  const active =
    site.services.items.find((item) => item.id === activeId) ??
    site.services.items[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {site.services.items.map((item) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={cn(
                "border px-3 py-2 text-left text-sm font-medium transition-colors",
                selected
                  ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white"
                  : "border-[var(--brand-navy)] bg-white text-[var(--brand-ink)] hover:bg-[var(--brand-surface-soft)]",
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="mt-8 max-w-3xl">
        <h3 className="text-2xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)] sm:text-3xl">
          {active.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">
          {active.blurb}
        </p>
        <Link
          href="#contact"
          className="mt-6 inline-flex min-h-12 items-center justify-center bg-[var(--brand-navy)] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-navy-deep)]"
        >
          {site.cta.proposal}
        </Link>
      </div>
    </div>
  );
}
