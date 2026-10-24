import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "nav" | "hero" | "footer";
  href?: string | null;
  priority?: boolean;
  /** Center the mark inside its box (header). */
  align?: "left" | "center";
};

const sizeClass = {
  // Bigger header mark (still not a full-bleed hero logo).
  nav: "h-[4.5rem] w-auto max-w-[min(92vw,22rem)] sm:h-24 sm:max-w-[28rem]",
  // Color mark on a light plate (JPG has a light background; invert made a blank white box).
  footer: "h-12 w-auto max-w-[200px] sm:h-14 sm:max-w-[220px]",
  hero: "h-auto w-full max-w-[18rem] sm:max-w-[22rem]",
} as const;

export function Logo({
  className,
  size = "nav",
  href = "/",
  priority = false,
  align = "left",
}: LogoProps) {
  const mark = (
    <Image
      src={site.logo.src}
      alt={site.logo.alt}
      width={2048}
      height={682}
      priority={priority || size === "hero"}
      className={cn(
        "object-contain",
        align === "center" ? "object-center" : "object-left",
        sizeClass[size],
        className,
      )}
    />
  );

  if (href === null) return mark;

  return (
    <Link
      href={href}
      className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
      aria-label={site.brand}
    >
      {mark}
    </Link>
  );
}
