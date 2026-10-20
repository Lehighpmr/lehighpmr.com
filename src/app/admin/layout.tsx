import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-[var(--brand-surface-soft)]">
      <header className="border-b border-[var(--brand-line)] bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-accent)]">
              Admin
            </p>
            <p className="text-sm font-medium text-[var(--brand-navy)]">
              {site.brandShort} rentals
            </p>
          </div>
          <a
            href="/"
            className="text-sm font-medium text-[var(--brand-navy)] underline-offset-2 hover:underline"
          >
            View site
          </a>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-6">{children}</div>
    </div>
  );
}
