import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getProductsByBrand } from "@/lib/catalog";
import { brandInfo, resolveBrand } from "@/lib/brands";
import { BrandCards } from "@/components/BrandCards";
import { BrandSwitcher } from "@/components/BrandSwitcher";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { ArrowRightIcon, PaintBucketIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Browse by Brand",
  description:
    "Browse paints by brand — Kaizen NEO & ZEN and Nippon Paint — at Ahmad Paint House.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const brand = resolveBrand(
    typeof params.brand === "string" ? params.brand : null,
  );

  // ----- Search results (across all brands) -----
  if (q) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/products" className="hover:text-zinc-800">
            Products
          </Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-zinc-800">Search</span>
        </nav>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Search results
        </h1>
        <p className="mt-1 text-zinc-500">
          Showing matches for &ldquo;{q}&rdquo; across all brands.
        </p>
        <div className="reveal mt-6">
          <CatalogBrowser
            key={q}
            products={getAllProducts()}
            initialQuery={q}
            showBrandFilter
          />
        </div>
      </div>
    );
  }

  // ----- Brand picker (default landing) -----
  if (!brand) {
    const total = getAllProducts().length;
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-800">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-zinc-800">Products</span>
        </nav>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Browse by brand
        </h1>
        <p className="mt-1 max-w-xl text-zinc-500">
          Choose a paint brand to see its products. We stock Kaizen (NEO &amp;
          ZEN) and Nippon Paint.
        </p>

        <div className="reveal mt-8">
          <BrandCards
            hrefFor={(b) => `/products?brand=${b.slug}`}
            countFor={(b) => getProductsByBrand(b.key).length}
          />
        </div>

        <Link
          href="/products?brand=all"
          className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-orange-300 hover:shadow"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
              <PaintBucketIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold text-zinc-900">See all products</p>
              <p className="text-sm text-zinc-500">
                Browse all {total} products from every brand together
              </p>
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 shrink-0 text-zinc-400" />
        </Link>
      </div>
    );
  }

  // ----- Products for the chosen brand -----
  const products =
    brand === "all" ? getAllProducts() : getProductsByBrand(brand);
  const info = brand === "all" ? null : brandInfo(brand);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-800">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/products" className="hover:text-zinc-800">
          Brands
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">
          {info ? info.label : "All"}
        </span>
      </nav>

      <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        {info ? `${info.label} Products` : "All Products"}
      </h1>
      <p className="mt-1 text-zinc-500">
        {info ? `${info.company} · ` : ""}
        {products.length} products — all prices include 18% sales tax.
      </p>

      <div className="mt-4">
        <BrandSwitcher
          current={brand}
          hrefFor={(key) =>
            key === "all"
              ? "/products?brand=all"
              : `/products?brand=${brandInfo(key).slug}`
          }
        />
      </div>

      <div className="reveal mt-6">
        <CatalogBrowser
          key={brand}
          products={products}
          showBrandFilter={false}
        />
      </div>
    </div>
  );
}
