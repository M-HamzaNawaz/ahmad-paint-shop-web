import Link from "next/link";
import type { Brand } from "@/lib/types";
import { BRANDS, type BrandInfo } from "@/lib/brands";
import { ArrowRightIcon, PaintBucketIcon } from "./Icons";

/** Grid of large, brand-coloured cards used by the brand picker. */
export function BrandCards({
  hrefFor,
  counts,
  only,
}: {
  hrefFor: (brand: BrandInfo) => string;
  /** Pre-computed product count per brand. Parent fetches these so the
   *  component itself stays synchronous and reusable. */
  counts: Partial<Record<Brand, number>>;
  /** If given, only show these brands. */
  only?: Brand[];
}) {
  const shown = only ? BRANDS.filter((b) => only.includes(b.key)) : BRANDS;
  const cols = shown.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`grid gap-5 ${cols}`}>
      {shown.map((b) => {
        const count = counts[b.key] ?? 0;
        return (
          <Link
            key={b.key}
            href={hrefFor(b)}
            className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${b.card} p-6 text-white transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl`}
          >
            <PaintBucketIcon className="absolute -right-5 -top-5 h-28 w-28 text-white/15" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                {b.company}
              </p>
              <p className="mt-1 text-3xl font-extrabold">{b.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {b.blurb}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                  {count} {count === 1 ? "product" : "products"}
                </span>
                <span className="flex items-center gap-1 text-sm font-bold">
                  Browse
                  <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
