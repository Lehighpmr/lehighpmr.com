import { Logo } from "@/components/brand/logo";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--brand-line)] bg-[var(--brand-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="space-y-3">
          <Logo size="footer" />
          <p className="max-w-sm text-sm leading-relaxed text-[var(--brand-muted)]">
            {site.tagline}
          </p>
          <p className="text-sm text-[var(--brand-ink)]">
            <span className="font-medium">{site.person}</span>
            <span className="text-[var(--brand-muted)]">
              {" "}
              · {site.brand}
            </span>
          </p>
        </div>
        <div className="text-sm text-[var(--brand-muted)]">
          <p className="font-medium text-[var(--brand-ink)]">Contact</p>
          <p className="mt-1">
            {site.address.line1}, {site.address.line2}
          </p>
          <p className="mt-1">
            <a
              href={`tel:${site.contact.phone.replace(/\D/g, "")}`}
              className="hover:text-[var(--brand-ink)]"
            >
              {site.contact.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${site.contact.email}`}
              className="hover:text-[var(--brand-ink)]"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
