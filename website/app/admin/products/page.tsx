import Link from "next/link";
import type { Metadata } from "next";
import { getCategories } from "@/lib/db/categories";
import { getAdminProducts } from "@/lib/db/adminProducts";
import { PlusIcon } from "@/components/Icons";
import { ProductListClient } from "./ProductListClient";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getAdminProducts(),
    getCategories(),
  ]);
  const hiddenCount = products.filter((p) => p.hidden).length;
  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {products.length} total · {hiddenCount} hidden · {featuredCount}{" "}
            featured
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <PlusIcon className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="mt-6">
        <ProductListClient products={products} categories={categories} />
      </div>
    </div>
  );
}
