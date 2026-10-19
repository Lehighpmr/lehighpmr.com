import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { PlaceholderNote } from "@/components/placeholder-note";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Quiet residential street with mature trees and warm evening light"
            fill
            priority
            className="object-cover daher-animate-ken"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 daher-animate-fade-in"
            style={{ background: "var(--brand-hero-veil)" }}
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 md:justify-center md:pb-24">
          <div className="max-w-xl text-[#faf7f3]">
            <div className="daher-animate-fade-up">
              <Logo size="hero" href={null} priority />
            </div>
            <h1 className="daher-animate-fade-up daher-delay-1 mt-7 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]">
              {site.heroHeadline}
            </h1>
            <p className="daher-animate-fade-up daher-delay-2 mt-4 max-w-md text-base leading-relaxed text-[#faf7f3]/90 sm:text-lg">
              {site.heroSupport}
            </p>
            <div className="daher-animate-fade-up daher-delay-3 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/rentals"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-md bg-[#faf7f3] px-5 text-[var(--brand-ink)] hover:bg-white",
                )}
              >
                {site.cta.primary}
              </Link>
              <Link
                href="/rentals"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-md border-[#faf7f3]/45 bg-transparent px-5 text-[#faf7f3] hover:bg-[#faf7f3]/10 hover:text-[#faf7f3]",
                )}
              >
                {site.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--brand-line)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-24">
          <div className="space-y-10">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--brand-ink)]">
                {site.services.heading}
              </h2>
              <PlaceholderNote className="mt-2">
                {site.services.note}
              </PlaceholderNote>
              <ul className="mt-6 space-y-3 border-l border-[var(--brand-accent)]/40 pl-5">
                {site.services.items.map((item) => (
                  <li
                    key={item}
                    className="text-[1.05rem] leading-snug text-[var(--brand-ink)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-[-0.02em] text-[var(--brand-ink)]">
                {site.about.heading}
              </h2>
              <PlaceholderNote className="mt-2">{site.about.note}</PlaceholderNote>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-[var(--brand-muted)] sm:text-lg">
                {site.about.body}
              </p>
            </div>
          </div>

          <aside className="md:justify-self-end md:pt-2">
            <div className="md:sticky md:top-28 md:text-right">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-accent)]">
                Office
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug text-[var(--brand-ink)]">
                {site.address.line1}
              </p>
              <p className="mt-1 text-lg text-[var(--brand-muted)]">
                {site.address.line2}
              </p>
              <div className="mt-8 md:flex md:justify-end">
                <Link
                  href="/rentals"
                  className={cn(buttonVariants(), "h-10 rounded-md px-4")}
                >
                  View current rentals
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
