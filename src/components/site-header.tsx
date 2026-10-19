"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/rentals", label: "Rentals" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <Logo size="nav" className="text-[var(--brand-ink)] drop-shadow-sm [&_svg]:text-[var(--brand-accent)]" />
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium tracking-wide transition-colors duration-300",
                  active
                    ? "text-[var(--brand-ink)]"
                    : "text-[var(--brand-muted)] hover:text-[var(--brand-ink)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
