import type { Metadata } from "next";
import Link from "next/link";
import { getAdminCategories } from "@/lib/db/adminCategories";
import { PlusIcon } from "@/components/Icons";
import { CategoryListClient } from "./CategoryListClient";

export const metadata: Metadata = { title: "Categories" };

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {categories.length} total
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <PlusIcon className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      <div className="mt-6">
        <CategoryListClient categories={categories} />
      </div>
    </div>
  );
}
