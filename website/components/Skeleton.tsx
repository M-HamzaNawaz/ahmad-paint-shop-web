/** Shimmering placeholder block. Compose to mirror a page's real layout. */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-200/70 ${className}`}
      aria-hidden
    />
  );
}
