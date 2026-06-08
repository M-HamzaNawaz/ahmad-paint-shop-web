"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Brand, Category } from "@/lib/types";
import type { AdminProduct } from "@/lib/db/adminProducts";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { BrandBadge } from "@/components/BrandBadge";
import { SearchIcon } from "@/components/Icons";
import { formatPrice } from "@/lib/format";
import { deleteProduct, toggleProductField } from "./actions";

type StatusFilter = "all" | "visible" | "hidden" | "featured";
type BrandFilter = "all" | Brand;

const STATUS_OPTIONS: DropdownOption<StatusFilter>[] = [
  { value: "all", label: "Status: All" },
  { value: "visible", label: "Visible only" },
  { value: "hidden", label: "Hidden only" },
  { value: "featured", label: "Featured only" },
];

const BRAND_OPTIONS: DropdownOption<BrandFilter>[] = [
  { value: "all", label: "All Brands" },
  { value: "Neo", label: "NEO" },
  { value: "Zen", label: "ZEN" },
  { value: "Nippon", label: "Nippon" },
];

export function ProductListClient({
  products,
  categories,
}: {
  products: AdminProduct[];
  categories: Category[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<string>("all");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const categoryOptions: DropdownOption<string>[] = [
    { value: "all", label: "All Categories" },
    ...categories.map((c) => ({ value: c.slug, label: c.name })),
  ];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (brand !== "all" && p.brand !== brand) return false;
      if (category !== "all" && p.categorySlug !== category) return false;
      if (status === "visible" && p.hidden) return false;
      if (status === "hidden" && !p.hidden) return false;
      if (status === "featured" && !p.featured) return false;
      const q = query.trim().toLowerCase();
      if (q) {
        const text =
          `${p.name} ${p.productLine} ${p.brand} ${p.categoryName}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [products, query, brand, status, category]);

  async function handleToggleHidden(id: string, current: boolean) {
    setPendingId(id);
    const result = await toggleProductField(id, "hidden", !current);
    setPendingId(null);
    if (result.error) {
      toast.error("Failed", { description: result.error });
      return;
    }
    toast.success(current ? "Product is now visible" : "Product hidden");
    router.refresh();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setPendingId(id);
    const result = await deleteProduct(id);
    setPendingId(null);
    if (result.error) {
      toast.error("Delete failed", { description: result.error });
      return;
    }
    toast.success("Product deleted", { description: name });
    router.refresh();
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-60 flex-1">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, brand or code…"
            className="w-full rounded-full border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <Dropdown
          value={brand}
          onChange={setBrand}
          options={BRAND_OPTIONS}
          ariaLabel="Filter by brand"
        />
        <Dropdown
          value={category}
          onChange={setCategory}
          options={categoryOptions}
          ariaLabel="Filter by category"
        />
        <Dropdown
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          ariaLabel="Filter by status"
        />
      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Showing{" "}
        <span className="font-semibold text-zinc-800">{filtered.length}</span>{" "}
        of {products.length}
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
          <p className="font-semibold text-zinc-800">No products match.</p>
          <p className="mt-1 text-sm text-zinc-500">Try adjusting filters.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
          <table className="w-full min-w-200 text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Brand</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 text-center font-semibold">Packs</th>
                <th className="px-4 py-3 text-right font-semibold">From</th>
                <th className="px-4 py-3 text-right font-semibold">To</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className={pendingId === p.id ? "opacity-50" : ""}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-zinc-900">{p.name}</div>
                    {p.productLine ? (
                      <div className="text-xs text-zinc-400">
                        {p.productLine}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <BrandBadge brand={p.brand} />
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{p.categoryName}</td>
                  <td className="px-4 py-3 text-center text-zinc-600">
                    {p.variants.length}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-zinc-700">
                    {formatPrice(p.minPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-zinc-700">
                    {formatPrice(p.maxPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.hidden ? (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                          Hidden
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                          Live
                        </span>
                      )}
                      {p.featured ? (
                        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                          Featured
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleToggleHidden(p.id, p.hidden)}
                        disabled={pendingId === p.id}
                        className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200 disabled:opacity-50"
                      >
                        {p.hidden ? "Show" : "Hide"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={pendingId === p.id}
                        className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
