"use client";

import Image from "next/image";
import { useState } from "react";
import type { Brand, Product } from "@/lib/types";

const BRAND_COLOR: Record<Brand, { base: string; dark: string }> = {
  Neo: { base: "#ea580c", dark: "#c2410c" },
  Zen: { base: "#dc2626", dark: "#b91c1c" },
  Nippon: { base: "#2563eb", dark: "#1d4ed8" },
};

/** Illustrated paint bucket, coloured by brand. */
function PaintBucketArt({ brand }: { brand: Brand }) {
  const { base, dark } = BRAND_COLOR[brand];
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-3/4 w-3/4 drop-shadow-sm"
      aria-hidden="true"
    >
      {/* Handle */}
      <path
        d="M56,58 Q100,8 144,58"
        fill="none"
        stroke="#52525b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="56" cy="58" r="4.5" fill="#3f3f46" />
      <circle cx="144" cy="58" r="4.5" fill="#3f3f46" />

      {/* Body */}
      <path
        d="M50,62 L150,62 L138,153 Q137,162 128,162 L72,162 Q63,162 62,153 Z"
        fill={base}
      />
      {/* Left gloss */}
      <path d="M50,62 L72,62 L68,160 L63,154 Z" fill="#ffffff" opacity="0.18" />
      {/* Bottom shade */}
      <path
        d="M65,141 L135,141 L138,153 Q137,162 128,162 L72,162 Q63,162 62,153 Z"
        fill="#000000"
        opacity="0.13"
      />

      {/* Rim */}
      <ellipse cx="100" cy="62" rx="51" ry="13" fill={dark} />
      <ellipse cx="100" cy="58" rx="51" ry="12" fill={base} />
      <ellipse cx="100" cy="57" rx="40" ry="8" fill="#ffffff" opacity="0.16" />

      {/* Label */}
      <rect x="64" y="92" width="72" height="46" rx="9" fill="#000000" opacity="0.12" />
      <rect x="63" y="88" width="74" height="46" rx="9" fill="#ffffff" />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill={base}
      >
        {brand.toUpperCase()}
      </text>
      <circle cx="89" cy="123" r="3.6" fill="#f59e0b" />
      <circle cx="100" cy="123" r="3.6" fill="#10b981" />
      <circle cx="111" cy="123" r="3.6" fill="#3b82f6" />
    </svg>
  );
}

/**
 * Product visual. Shows a real photo when `product.image` is set and the
 * file loads; otherwise (or if the file is missing) falls back to an
 * illustrated, brand-coloured paint bucket on a category-tinted background.
 */
export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (product.image && !imgFailed) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br from-zinc-100 to-slate-200 ${className}`}
    >
      <PaintBucketArt brand={product.brand} />
      {product.productLine ? (
        <span className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-600">
          {product.productLine}
        </span>
      ) : null}
    </div>
  );
}
