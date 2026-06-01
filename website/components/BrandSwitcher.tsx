import Link from "next/link";
import type { Brand } from "@/lib/types";
import { BRANDS, brandInfo } from "@/lib/brands";

/** Row of chips to switch between brands on a results page. */
export function BrandSwitcher({
  current,
  available,
  hrefFor,
}: {
  current: Brand | "all";
  /** Brands to offer (defaults to all three). */
  available?: Brand[];
  hrefFor: (key: Brand | "all") => string;
}) {
  const brands = available ?? BRANDS.map((b) => b.key);
  const items: { key: Brand | "all"; label: string }[] = [
    { key: "all", label: "All Brands" },
    ...brands.map((b) => ({ key: b, label: brandInfo(b).label })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const active = it.key === current;
        return (
          <Link
            key={it.key}
            href={hrefFor(it.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              active
                ? "bg-primary text-white"
                : "border border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
            }`}
          >
            {it.label}
          </Link>
        );
      })}
    </div>
  );
}
