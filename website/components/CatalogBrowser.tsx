"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Brand, Product } from "@/lib/types";
import { Dropdown, type DropdownOption } from "./Dropdown";
import { ProductCard } from "./ProductCard";
import { SearchIcon } from "./Icons";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";
type BrandFilter = "all" | Brand;

const SORT_OPTIONS: DropdownOption<SortKey>[] = [
  { value: "featured", label: "Sort: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

const BRAND_OPTIONS: DropdownOption<BrandFilter>[] = [
  { value: "all", label: "All Brands" },
  { value: "Neo", label: "NEO (Kaizen)" },
  { value: "Zen", label: "ZEN (Kaizen)" },
  { value: "Nippon", label: "Nippon" },
];

export function CatalogBrowser({
  products,
  initialQuery = "",
  showBrandFilter = true,
}: {
  products: Product[];
  initialQuery?: string;
  showBrandFilter?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (brand !== "all" && p.brand !== brand) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.productLine.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    });

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => a.srNo - b.srNo);
    }
    return sorted;
  }, [products, query, brand, sort]);

  function resetFilters() {
    setQuery("");
    setBrand("all");
    setSort("featured");
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or product code…"
            aria-label="Search products"
            className="w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {showBrandFilter ? (
          <Dropdown
            value={brand}
            onChange={setBrand}
            options={BRAND_OPTIONS}
            ariaLabel="Filter by brand"
            className="sm:w-44"
          />
        ) : null}

        <Dropdown
          value={sort}
          onChange={setSort}
          options={SORT_OPTIONS}
          ariaLabel="Sort products"
          className="sm:w-56"
        />
      </div>

      <p className="mt-5 text-sm text-zinc-500">
        Showing <span className="font-semibold text-zinc-800">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "product" : "products"}
        {query.trim() ? (
          <>
            {" "}
            for &ldquo;<span className="font-semibold text-zinc-800">{query.trim()}</span>
            &rdquo;
          </>
        ) : null}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-zinc-800">No products found</p>
          <p className="mt-1 text-sm text-zinc-500">
            Try a different search, or clear the filters to see everything.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Clear filters
            </button>
            <Link
              href="/products"
              className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400"
            >
              Browse all products
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
