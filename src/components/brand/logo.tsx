import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Larger treatment for the hero */
  size?: "nav" | "hero";
  /** Pass `null` for a non-linked mark (e.g. hero). Defaults to `/`. */
  href?: string | null;
};

/**
 * PLACEHOLDER LOGO — wordmark until a real mark arrives.
 * To replace:
 * 1. Drop your file at `public/logo.svg` (or `.png`)
 * 2. Swap the inner markup below for an <Image> / <img> of that file
 */
export function Logo({ className, size = "nav", href = "/" }: LogoProps) {
  const mark = (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[var(--brand-ink)]",
        size === "hero" && "gap-4",
        className,
      )}
      aria-label="Daher"
    >
      <svg
        aria-hidden
        viewBox="0 0 40 40"
        className={cn(
          "shrink-0 text-[var(--brand-accent)]",
          size === "hero" ? "h-12 w-12 sm:h-14 sm:w-14" : "h-8 w-8",
        )}
      >
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 28 V14 L20 8 L30 14 V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 28 V20 H24 V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span
        className={cn(
          "font-[family-name:var(--font-display)] tracking-[-0.03em] leading-none",
          size === "hero"
            ? "text-5xl sm:text-6xl md:text-7xl"
            : "text-xl sm:text-2xl",
        )}
      >
        Daher
      </span>
    </span>
  );

  if (href === null) return mark;

  return (
    <Link
      href={href}
      className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
    >
      {mark}
    </Link>
  );
}
