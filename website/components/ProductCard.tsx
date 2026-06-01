import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { BrandBadge } from "./BrandBadge";
import { ProductImage } from "./ProductImage";
import { CartIcon } from "./Icons";

/**
 * A product tile linking to the product detail page.
 * On hover (desktop only), the card flips 180° to reveal the
 * description and an "Add to Cart" CTA. Touch devices stay on the
 * front face — they navigate on tap.
 */
export function ProductCard({ product }: { product: Product }) {
  const singlePrice = product.minPrice === product.maxPrice;
  const packCount = product.variants.length;
  const colorShades =
    product.details?.colorGroups?.flatMap((g) => g.shades) ?? [];

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front face */}
        <Link
          href={`/product/${product.id}`}
          className="flip-card-face group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white"
        >
          <ProductImage product={product} className="aspect-4/3 w-full" />

          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <div className="flex items-center justify-between gap-2">
              <BrandBadge brand={product.brand} />
              <span className="truncate text-[11px] text-zinc-400">
                {product.categoryName}
              </span>
            </div>

            <h3 className="font-semibold leading-snug text-zinc-900 group-hover:text-orange-700">
              {product.name}
            </h3>

            {product.note ? (
              <p className="line-clamp-1 text-[11px] text-zinc-400">
                {product.note}
              </p>
            ) : null}

            {colorShades.length > 0 ? (
              <div className="flex items-center gap-1.5 pt-2">
                <div className="flex -space-x-1">
                  {colorShades.slice(0, 6).map((c) => (
                    <span
                      key={c.code}
                      className="h-4 w-4 rounded-full ring-1 ring-white"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-zinc-500">
                  {colorShades.length} colours
                </span>
              </div>
            ) : null}

            <div className="mt-auto flex items-end justify-between pt-3">
              <div>
                <p className="text-[11px] text-zinc-500">
                  {singlePrice ? "Price" : "Starting from"}
                </p>
                <p className="text-lg font-bold text-zinc-900">
                  {formatPrice(product.minPrice)}
                </p>
              </div>
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                {packCount} {packCount === 1 ? "pack" : "packs"}
              </span>
            </div>
          </div>
        </Link>

        {/* Back face — description + Add to Cart */}
        <Link
          href={`/product/${product.id}`}
          className="flip-card-face flip-card-back flex flex-col overflow-hidden rounded-2xl border border-orange-200 bg-linear-to-br from-white to-orange-50 p-5 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <BrandBadge brand={product.brand} />
            <span className="truncate text-[11px] text-zinc-400">
              {product.categoryName}
            </span>
          </div>

          <h3 className="mt-2 font-bold leading-snug text-zinc-900">
            {product.name}
          </h3>

          <p className="mt-3 flex-1 overflow-hidden text-sm leading-relaxed text-zinc-600 line-clamp-6">
            {product.description}
          </p>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-[11px] text-zinc-500">
                {singlePrice ? "Price" : "From"}
              </p>
              <p className="text-lg font-bold text-zinc-900">
                {formatPrice(product.minPrice)}
              </p>
            </div>
            <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
              {packCount} {packCount === 1 ? "pack" : "packs"}
            </span>
          </div>

          <span className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white">
            <CartIcon className="h-4 w-4" />
            Add to Cart
          </span>
        </Link>
      </div>
    </div>
  );
}
