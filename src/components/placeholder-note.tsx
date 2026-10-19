import { cn } from "@/lib/utils";

export function PlaceholderNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs tracking-wide text-[var(--brand-muted)] italic",
        className,
      )}
    >
      {children}
    </p>
  );
}
