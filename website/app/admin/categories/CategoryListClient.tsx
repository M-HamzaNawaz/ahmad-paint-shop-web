"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { AdminCategory } from "@/lib/db/adminCategories";
import { deleteCategory } from "./actions";

export function CategoryListClient({
  categories: initial,
}: {
  categories: AdminCategory[];
}) {
  // Local state so we can remove the card instantly — no full page refresh.
  const [categories, setCategories] = useState(initial);
  const [, startTransition] = useTransition();

  function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    const removed = categories.find((c) => c.slug === slug);
    setCategories((prev) => prev.filter((c) => c.slug !== slug));
    startTransition(async () => {
      const result = await deleteCategory(slug);
      if (result.error) {
        if (removed) {
          setCategories((prev) => [...prev, removed]);
        }
        toast.error("Delete failed", { description: result.error });
        return;
      }
      toast.success("Category deleted", { description: name });
    });
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center">
        <p className="font-semibold text-zinc-800">No categories yet.</p>
        <p className="mt-1 text-sm text-zinc-500">
          Add your first one to start grouping products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <div
          key={c.slug}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
        >
          <div className={`bg-linear-to-br ${c.gradient} p-5`}>
            <p className="text-lg font-extrabold text-zinc-900">{c.name}</p>
            <p className="mt-1 font-mono text-xs text-zinc-700/70">/{c.slug}</p>
          </div>
          <div className="space-y-3 p-5">
            <p className="line-clamp-2 text-sm text-zinc-600">
              {c.description || "No description."}
            </p>
            <p className="text-xs font-medium text-zinc-500">
              {c.productCount}{" "}
              {c.productCount === 1 ? "product" : "products"}
            </p>
            <div className="flex gap-2">
              <Link
                href={`/admin/categories/${c.slug}/edit`}
                className="flex-1 rounded-full bg-zinc-100 px-3 py-1.5 text-center text-xs font-semibold text-zinc-700 transition hover:bg-zinc-200"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(c.slug, c.name)}
                disabled={c.productCount > 0}
                title={
                  c.productCount > 0
                    ? "Move or delete its products first"
                    : undefined
                }
                className="flex-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
