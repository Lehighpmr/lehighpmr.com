import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { site } from "@/content/site";

export function SiteFooter() {
  const tel = site.contact.phone.replace(/\D/g, "");

  return (
    <footer
      id="contact"
      className="bg-[var(--brand-navy-deep)] text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8 md:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em]">
            {site.brandShort} Property Management
          </p>
          <Logo size="footer" className="mt-4" href="/" />
          <ul className="mt-6 space-y-3 text-sm text-white/90">
            <li>
              <a
                href={`tel:${tel}`}
                className="inline-flex items-start gap-2 underline-offset-2 hover:underline"
              >
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-start gap-2 underline-offset-2 hover:underline"
              >
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                {site.contact.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em]">
            Our company
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            {site.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-offset-2 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3 text-white/80" aria-hidden>
            <span className="inline-flex size-9 items-center justify-center border border-white/30 text-xs font-semibold">
              f
            </span>
            <span className="inline-flex size-9 items-center justify-center border border-white/30 text-xs font-semibold">
              ig
            </span>
          </div>
          <p className="mt-2 text-xs text-white/50">Social links coming soon</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em]">
            {site.areas.heading}
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/90">
            {site.areas.items.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.brand}. {site.tagline}.
          </p>
          <p>Demo contact details for preview.</p>
        </div>
      </div>
    </footer>
  );
}
