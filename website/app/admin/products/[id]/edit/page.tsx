import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories } from "@/lib/db/categories";
import { getAdminProductById } from "@/lib/db/adminProducts";
import { ProductForm } from "../../ProductForm";

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getCategories(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <nav className="text-sm text-zinc-500">
        <Link href="/admin/products" className="hover:text-zinc-800">
          Products
        </Link>
        <span className="mx-1.5">/</span>
        <span className="font-medium text-zinc-800">Edit</span>
      </nav>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        Edit product
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        {product.name}
        {product.productLine ? ` · ${product.productLine}` : ""}
      </p>
      <div className="mt-6">
        <ProductForm
          mode="edit"
          categories={categories}
          initial={{
            id: product.id,
            name: product.name,
            brand: product.brand,
            product_line: product.productLine,
            category_slug: product.categorySlug,
            description: product.description,
            note: product.note ?? "",
            image: product.image ?? "",
            featured: product.featured,
            hidden: product.hidden,
            variants: product.variants.map((v) => ({
              pack_size: v.packSize,
              total_price: v.totalPrice,
            })),
          }}
        />
      </div>
    </div>
  );
}
