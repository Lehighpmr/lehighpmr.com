import { site } from "@/content/site";

export function SiteTopBars() {
  const tel = site.contact.phone.replace(/\D/g, "");

  return (
    <div className="relative z-40">
      <div className="bg-[var(--brand-navy)] px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white sm:text-xs">
        {site.announcement}
      </div>
      <a
        href={`tel:${tel}`}
        className="block bg-[var(--brand-surface-soft)] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-navy)] transition-colors hover:bg-[#e8eaef] sm:text-sm"
      >
        Click to call: {site.contact.phoneDisplay}
      </a>
    </div>
  );
}
