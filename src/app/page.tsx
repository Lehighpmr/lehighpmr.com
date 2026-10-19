import Image from "next/image";
import Link from "next/link";
import { ClipboardList, Home, KeyRound } from "lucide-react";
import { ServicesPanel } from "@/components/services-panel";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const actionIcons = {
  pm: Home,
  contact: ClipboardList,
  rentals: KeyRound,
} as const;

export default function HomePage() {
  const tel = site.contact.phone.replace(/\D/g, "");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[52vh] sm:min-h-[60vh]">
          <Image
            src="/images/hero-interior.jpg"
            alt="Bright rental living space ready for tenants"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--brand-hero-veil)" }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-center px-4 py-16 text-center text-white sm:min-h-[60vh] sm:px-6 sm:py-20">
            <h1 className="lehigh-animate-fade-up text-2xl font-bold uppercase leading-tight tracking-[0.04em] sm:text-4xl md:text-5xl">
              {site.heroHeadline}
            </h1>
            <p className="lehigh-animate-fade-up lehigh-delay-1 mx-auto mt-4 max-w-2xl text-sm font-medium uppercase tracking-[0.08em] text-white/90 sm:text-base">
              {site.tagline}
            </p>
            <p className="lehigh-animate-fade-up lehigh-delay-2 mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {site.heroSupport}
            </p>
            <div className="lehigh-animate-fade-up lehigh-delay-2 mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center bg-[var(--brand-accent)] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-accent-soft)]"
              >
                {site.cta.proposal}
              </Link>
              <Link
                href="/rentals"
                className="inline-flex min-h-12 items-center justify-center border border-white/70 bg-white/10 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {site.cta.primary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Action cards */}
      <section className="relative z-10 -mt-8 px-4 sm:-mt-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
          {site.actionCards.map((card) => {
            const Icon = actionIcons[card.id as keyof typeof actionIcons];
            return (
              <Link
                key={card.id}
                href={card.href}
                className={cn(
                  "flex gap-4 border p-5 shadow-md transition-transform hover:-translate-y-0.5",
                  card.tone === "accent"
                    ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white"
                    : "border-transparent bg-white text-[var(--brand-navy)]",
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-8 shrink-0",
                    card.tone === "accent"
                      ? "text-white"
                      : "text-[var(--brand-navy)]",
                  )}
                  aria-hidden
                />
                <span>
                  <span className="block text-sm font-bold uppercase tracking-[0.08em]">
                    {card.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-sm leading-relaxed",
                      card.tone === "accent"
                        ? "text-white/90"
                        : "text-[var(--brand-muted)]",
                    )}
                  >
                    {card.body}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Intro / PM pitch */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)] sm:text-3xl">
            Whitehall property management
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">
            {site.services.intro} Led by {site.person}, {site.brand} serves
            owners across {site.tagline.toLowerCase()}.
          </p>
          <Link
            href="#contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center bg-[var(--brand-navy)] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[var(--brand-navy-deep)]"
          >
            {site.cta.contact}
          </Link>
        </div>
      </section>

      {/* About / why hire */}
      <section id="about" className="bg-[var(--brand-surface-soft)] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--brand-line)]">
            <Image
              src="/images/hero.jpg"
              alt="Neighborhood street in the Lehigh Valley area"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
              {site.about.eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)] sm:text-3xl">
              {site.about.heading}
            </h2>
            {site.about.body.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mt-4 text-base leading-relaxed text-[var(--brand-muted)]"
              >
                {para}
              </p>
            ))}
            <p className="mt-4 text-base text-[var(--brand-ink)]">
              Call{" "}
              <a
                href={`tel:${tel}`}
                className="font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
              >
                {site.contact.phone}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-[var(--brand-accent)] underline-offset-2 hover:underline"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)] sm:text-3xl">
              {site.services.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--brand-muted)]">
              {site.services.intro}
            </p>
          </div>
          <div className="mt-8">
            <ServicesPanel />
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="border-t border-[var(--brand-line)] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold uppercase tracking-[0.04em] text-[var(--brand-navy)] sm:text-3xl">
            {site.areas.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--brand-muted)]">
            {site.tagline}.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
            {site.areas.items.map((area) => (
              <li
                key={area}
                className="border-b border-[var(--brand-line)] pb-2 text-sm font-medium text-[var(--brand-navy)]"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6">
        <Image
          src="/images/hero-interior.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--brand-navy-deep)]/75" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h2 className="text-2xl font-bold uppercase tracking-[0.04em] sm:text-3xl">
            Ready to talk about your property?
          </h2>
          <p className="mt-4 text-base text-white/85">
            Reach {site.person} at the Whitehall office —{" "}
            {site.address.line1}, {site.address.line2}.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${tel}`}
              className="inline-flex min-h-12 items-center justify-center bg-[var(--brand-accent)] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-[var(--brand-accent-soft)]"
            >
              Call {site.contact.phoneDisplay}
            </a>
            <Link
              href="/rentals"
              className="inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-navy)] hover:bg-[var(--brand-surface-soft)]"
            >
              {site.cta.primary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
