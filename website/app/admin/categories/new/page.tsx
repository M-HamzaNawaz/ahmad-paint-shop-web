import type { Metadata } from "next";
import Link from "next/link";
import { CategoryForm } from "../CategoryForm";

export const metadata: Metadata = { title: "New category" };

export default function NewCategoryPage() {
  return (
    <div>
      <nav className="text-sm text-zinc-500">
        <Link href="/admin/categories" className="hover:text-zinc-800">
          Categories
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">New</span>
      </nav>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        New category
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Categories group products on the home page and let customers browse by
        type.
      </p>
      <div className="mt-6">
        <CategoryForm mode="new" />
      </div>
    </div>
  );
}
