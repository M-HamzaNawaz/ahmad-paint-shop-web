import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminCategoryBySlug } from "@/lib/db/adminCategories";
import { CategoryForm } from "../../CategoryForm";

export const metadata: Metadata = { title: "Edit category" };

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getAdminCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div>
      <nav className="text-sm text-zinc-500">
        <Link href="/admin/categories" className="hover:text-zinc-800">
          Categories
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">Edit</span>
      </nav>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        Edit category
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        {category.name} · {category.productCount}{" "}
        {category.productCount === 1 ? "product" : "products"}
      </p>
      <div className="mt-6">
        <CategoryForm
          mode="edit"
          initial={{
            originalSlug: category.slug,
            slug: category.slug,
            name: category.name,
            description: category.description,
            gradient: category.gradient,
          }}
        />
      </div>
    </div>
  );
}
