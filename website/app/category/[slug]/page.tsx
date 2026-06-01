import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getBrandsInCategory,
  getCategoryBySlug,
  getProductsByCategory,
  getProductsByCategoryAndBrand,
} from "@/lib/catalog";
import { brandInfo, resolveBrand } from "@/lib/brands";
import { BrandCards } from "@/components/BrandCards";
import { BrandSwitcher } from "@/components/BrandSwitcher";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { ArrowRightIcon, PaintBucketIcon } from "@/components/Icons";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const allInCategory = getProductsByCategory(slug);
  const availableBrands = getBrandsInCategory(slug);
  const brand = resolveBrand(typeof sp.brand === "string" ? sp.brand : null);

  const breadcrumb = (
    <nav className="text-sm text-zinc-500">
      <Link href="/" className="hover:text-zinc-800">
        Home
      </Link>
      <span className="mx-1.5">/</span>
      <Link href="/products" className="hover:text-zinc-800">
        Products
      </Link>
      <span className="mx-1.5">/</span>
      <span className="font-medium text-zinc-800">{category.name}</span>
    </nav>
  );

  const banner = (
    <div
      className={`mt-3 rounded-2xl bg-linear-to-br ${category.gradient} p-6 sm:p-8`}
    >
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        {category.name}
      </h1>
      <p className="mt-1.5 max-w-xl text-zinc-700">{category.description}</p>
      <p className="mt-3 inline-block rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-zinc-700">
        {allInCategory.length} products · {availableBrands.length} brands
      </p>
    </div>
  );

  // ----- Brand picker for this category -----
  if (!brand) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        {breadcrumb}
        {banner}

        <div className="reveal mt-8">
          <h2 className="text-lg font-bold text-zinc-900">Choose a brand</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Pick a brand to see its {category.name.toLowerCase()}.
          </p>

          <div className="mt-5">
            <BrandCards
              only={availableBrands}
              hrefFor={(b) => `/category/${slug}?brand=${b.slug}`}
              countFor={(b) =>
                getProductsByCategoryAndBrand(slug, b.key).length
              }
            />
          </div>

          <Link
            href={`/category/${slug}?brand=all`}
            className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-orange-300 hover:shadow"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-primary">
                <PaintBucketIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold text-zinc-900">
                  See all {category.name.toLowerCase()}
                </p>
                <p className="text-sm text-zinc-500">
                  Browse all {allInCategory.length} products from every brand
                </p>
              </div>
            </div>
            <ArrowRightIcon className="h-5 w-5 shrink-0 text-zinc-400" />
          </Link>
        </div>
      </div>
    );
  }

  // ----- Products for the chosen brand within this category -----
  const products =
    brand === "all"
      ? allInCategory
      : getProductsByCategoryAndBrand(slug, brand);
  const info = brand === "all" ? null : brandInfo(brand);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {breadcrumb}
      {banner}

      <div className="mt-6">
        <BrandSwitcher
          current={brand}
          available={availableBrands}
          hrefFor={(key) =>
            key === "all"
              ? `/category/${slug}?brand=all`
              : `/category/${slug}?brand=${brandInfo(key).slug}`
          }
        />
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        {info ? `${info.label} · ` : ""}
        {products.length} {products.length === 1 ? "product" : "products"} in{" "}
        {category.name}
      </p>

      <div className="reveal mt-4">
        <CatalogBrowser
          key={brand}
          products={products}
          showBrandFilter={false}
        />
      </div>
    </div>
  );
}
