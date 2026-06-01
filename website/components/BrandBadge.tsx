import type { Brand } from "@/lib/types";

const BRAND_STYLES: Record<Brand, string> = {
  Neo: "bg-orange-100 text-orange-700",
  Zen: "bg-red-100 text-red-700",
  Nippon: "bg-blue-100 text-blue-700",
};

/** Small NEO / ZEN / NIPPON brand tag. */
export function BrandBadge({
  brand,
  className = "",
}: {
  brand: Brand;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${BRAND_STYLES[brand]} ${className}`}
    >
      {brand}
    </span>
  );
}
