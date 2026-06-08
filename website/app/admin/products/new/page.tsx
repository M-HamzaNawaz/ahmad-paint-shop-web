import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/db/categories";
import { ProductForm } from "../ProductForm";

export const metadata: Metadata = { title: "New product" };

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div>
      <nav className="text-sm text-zinc-500">
        <Link href="/admin/products" className="hover:text-zinc-800">
          Products
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">New</span>
      </nav>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        New product
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Add a new product to the catalogue. It goes live the moment you save
        (unless you tick &ldquo;Hidden from customers&rdquo;).
      </p>
      <div className="mt-6">
        <ProductForm mode="new" categories={categories} />
      </div>
    </div>
  );
}
