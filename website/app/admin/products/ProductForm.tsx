"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import type { Brand } from "@/lib/types";
import {
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
} from "@/components/Icons";
import { Dropdown, type DropdownOption } from "@/components/Dropdown";
import { saveProduct, type ProductInput, type VariantInput } from "./actions";
import { uploadProductImage } from "./upload";

const BRAND_OPTIONS: DropdownOption<Brand>[] = [
  { value: "Neo", label: "NEO (Kaizen)" },
  { value: "Zen", label: "ZEN (Kaizen)" },
  { value: "Nippon", label: "Nippon" },
];

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

interface Category {
  slug: string;
  name: string;
}

export function ProductForm({
  initial,
  categories,
  mode,
}: {
  initial?: Partial<ProductInput>;
  categories: Category[];
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<ProductInput>({
    id: initial?.id,
    name: initial?.name ?? "",
    brand: initial?.brand ?? "Neo",
    product_line: initial?.product_line ?? "",
    category_slug: initial?.category_slug ?? categories[0]?.slug ?? "",
    description: initial?.description ?? "",
    note: initial?.note ?? "",
    image: initial?.image ?? "",
    featured: initial?.featured ?? false,
    hidden: initial?.hidden ?? false,
    variants:
      initial?.variants && initial.variants.length > 0
        ? initial.variants.map((v) => ({
            pack_size: v.pack_size,
            total_price: v.total_price,
          }))
        : [{ pack_size: "", total_price: 0 }],
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await saveProduct(form);
      if (result.error) {
        toast.error("Save failed", { description: result.error });
        return;
      }
      toast.success(mode === "new" ? "Product created" : "Product updated", {
        description: form.name,
      });
      router.push("/admin/products");
      router.refresh();
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadProductImage(fd);
    setUploading(false);
    e.target.value = ""; // allow re-selecting same file
    if (result.error) {
      toast.error("Upload failed", { description: result.error });
      return;
    }
    setForm((f) => ({ ...f, image: result.url ?? "" }));
    toast.success("Image uploaded");
  }

  function updateVariant(
    i: number,
    key: keyof VariantInput,
    value: string | number,
  ) {
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, j) =>
        j === i ? { ...v, [key]: value } : v,
      ),
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic info */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Basic info</h2>

        <div className="mt-4 space-y-4">
          <Field label="Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g. Neo Stain Guard"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Brand" required>
              <Dropdown
                value={form.brand}
                onChange={(v) => setForm({ ...form, brand: v })}
                options={BRAND_OPTIONS}
                ariaLabel="Brand"
              />
            </Field>

            <Field
              label="Product code"
              hint="Optional product line code, e.g. N920"
            >
              <input
                type="text"
                value={form.product_line}
                onChange={(e) =>
                  setForm({ ...form, product_line: e.target.value })
                }
                placeholder="N920"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Category" required>
            <Dropdown
              value={form.category_slug}
              onChange={(v) => setForm({ ...form, category_slug: v })}
              options={categories.map((c) => ({
                value: c.slug,
                label: c.name,
              }))}
              ariaLabel="Category"
            />
          </Field>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              rows={3}
              placeholder="Short description shown on the product page."
              className={`${inputClass} resize-y`}
            />
          </Field>

          <Field
            label="Note"
            hint="Yellow warning shown above the price (optional)"
          >
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={2}
              placeholder="Any caveat, tip or important note for the customer."
              className={`${inputClass} resize-y`}
            />
          </Field>

          <Field
            label="Product image"
            hint="Upload a JPG/PNG/WebP (max 5 MB) or paste an image URL."
          >
            <div className="space-y-3">
              {form.image ? (
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt=""
                    className="h-32 w-32 rounded-xl border border-zinc-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: "" })}
                    aria-label="Clear image"
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-zinc-600 shadow-md transition hover:text-red-600"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <label
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 ${
                    uploading ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  <UploadIcon className="h-4 w-4" />
                  {uploading ? "Uploading…" : "Upload image"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="… or paste an image URL"
                  className={`${inputClass} min-w-60 flex-1`}
                />
              </div>
            </div>
          </Field>
        </div>
      </section>

      {/* Variants */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-zinc-900">
            Pack sizes &amp; prices
          </h2>
          <button
            type="button"
            onClick={() =>
              setForm((f) => ({
                ...f,
                variants: [...f.variants, { pack_size: "", total_price: 0 }],
              }))
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
          >
            <PlusIcon className="h-4 w-4" />
            Add pack
          </button>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Enter the customer-facing total price (already includes 18% tax). The
          retail price and tax breakdown are computed automatically when you
          save.
        </p>

        <ul className="mt-4 space-y-3">
          {form.variants.map((v, i) => (
            <li
              key={i}
              className="flex flex-wrap items-end gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3"
            >
              <div className="min-w-40 flex-1">
                <label className="block text-xs font-semibold text-zinc-700">
                  Pack size
                </label>
                <input
                  type="text"
                  value={v.pack_size}
                  onChange={(e) =>
                    updateVariant(i, "pack_size", e.target.value)
                  }
                  placeholder="e.g. 1 Ltr"
                  className={`mt-1 ${inputClass}`}
                />
              </div>
              <div className="w-40">
                <label className="block text-xs font-semibold text-zinc-700">
                  Total price (Rs)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={v.total_price || ""}
                  onChange={(e) =>
                    updateVariant(i, "total_price", Number(e.target.value))
                  }
                  placeholder="2075"
                  className={`mt-1 ${inputClass}`}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    variants: f.variants.filter((_, j) => j !== i),
                  }))
                }
                disabled={form.variants.length === 1}
                aria-label="Remove pack"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-zinc-500"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Visibility */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Visibility</h2>
        <div className="mt-4 space-y-3">
          <CheckboxRow
            label="Featured on home page"
            description="Show in the 'Popular products' grid on the home page."
            checked={form.featured}
            onChange={(v) => setForm({ ...form, featured: v })}
          />
          <CheckboxRow
            label="Hidden from customers"
            description="Customers won't see this product. Useful for drafts or out-of-stock items."
            checked={form.hidden}
            onChange={(v) => setForm({ ...form, hidden: v })}
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/admin/products"
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-800"
        >
          ← Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {pending
            ? "Saving…"
            : mode === "new"
              ? "Create product"
              : "Save changes"}
          {!pending ? <ArrowRightIcon className="h-4 w-4" /> : null}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-zinc-800">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1 text-xs text-zinc-400">{hint}</p> : null}
    </div>
  );
}

function CheckboxRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 cursor-pointer accent-orange-600"
      />
      <span>
        <span className="block text-sm font-semibold text-zinc-900">
          {label}
        </span>
        <span className="block text-xs text-zinc-500">{description}</span>
      </span>
    </label>
  );
}
