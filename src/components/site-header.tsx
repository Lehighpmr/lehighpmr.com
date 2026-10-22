"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const mid = Math.ceil(site.nav.length / 2);
const navLeft = site.nav.slice(0, mid);
const navRight = site.nav.slice(mid);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--brand-line)] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-3 sm:px-6">
        {/* Desktop: left nav. Mobile: spacer so the logo stays visually centered. */}
        <nav
          aria-label="Primary left"
          className="hidden items-center justify-end gap-0.5 md:flex"
        >
          {navLeft.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 py-2 text-sm font-medium uppercase tracking-[0.06em] text-[var(--brand-navy)] transition-colors hover:text-[var(--brand-accent)] lg:px-3"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="size-10 md:hidden" aria-hidden />

        <div className="flex justify-center justify-self-center">
          <Logo size="nav" align="center" priority />
        </div>

        <div className="flex items-center justify-end gap-0.5">
          <nav
            aria-label="Primary right"
            className="hidden items-center gap-0.5 md:flex"
          >
            {navRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-2 text-sm font-medium uppercase tracking-[0.06em] text-[var(--brand-navy)] transition-colors hover:text-[var(--brand-accent)] lg:px-3"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-[var(--brand-navy)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-[var(--brand-line)] bg-white md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-2 py-2">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-navy)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
