import { Logo } from "@/components/brand/logo";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--brand-line)] bg-[var(--brand-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="space-y-3">
          <Logo size="nav" />
          <p className="max-w-sm text-sm leading-relaxed text-[var(--brand-muted)]">
            {site.tagline}
          </p>
        </div>
        <div className="text-sm text-[var(--brand-muted)]">
          <p className="font-medium text-[var(--brand-ink)]">Contact</p>
          <p className="mt-1">
            {site.address.line1}, {site.address.line2}
          </p>
          <p className="mt-1">{site.contact.email}</p>
          <p>{site.contact.phone}</p>
          <p className="mt-2 text-xs italic opacity-80">{site.contact.note}</p>
        </div>
      </div>
    </footer>
  );
}
