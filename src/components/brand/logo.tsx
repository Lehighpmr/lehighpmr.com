import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Larger treatment for the hero */
  size?: "nav" | "hero" | "footer";
  /** Pass `null` for a non-linked mark (e.g. hero). Defaults to `/`. */
  href?: string | null;
  priority?: boolean;
};

const sizeClass = {
  nav: "h-11 w-auto sm:h-12",
  footer: "h-14 w-auto sm:h-16",
  hero: "h-auto w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[34rem]",
} as const;

/**
 * Official Lehigh logo. Replace `public/brand/lehigh-logo.jpg` to update.
 */
export function Logo({
  className,
  size = "nav",
  href = "/",
  priority = false,
}: LogoProps) {
  const mark = (
    <Image
      src={site.logo.src}
      alt={site.logo.alt}
      width={2048}
      height={682}
      priority={priority || size === "hero"}
      className={cn(
        "object-contain object-left",
        sizeClass[size],
        size === "hero" && "drop-shadow-sm",
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
