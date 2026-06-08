"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRightIcon } from "@/components/Icons";
import { saveCategory, type CategoryInput } from "./actions";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

const GRADIENT_OPTIONS: { value: string; label: string }[] = [
  { value: "from-sky-100 to-blue-200", label: "Sky / Blue" },
  { value: "from-emerald-100 to-teal-200", label: "Emerald / Teal" },
  { value: "from-violet-100 to-purple-200", label: "Violet / Purple" },
  { value: "from-amber-100 to-yellow-200", label: "Amber / Yellow" },
  { value: "from-rose-100 to-red-200", label: "Rose / Red" },
  { value: "from-orange-100 to-amber-200", label: "Orange / Amber" },
  { value: "from-zinc-100 to-slate-200", label: "Zinc / Slate" },
  { value: "from-fuchsia-100 to-pink-200", label: "Fuchsia / Pink" },
  { value: "from-lime-100 to-green-200", label: "Lime / Green" },
];

export function CategoryForm({
  initial,
  mode,
}: {
  initial?: Partial<CategoryInput>;
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [slugTouched, setSlugTouched] = useState(false);

  const [form, setForm] = useState<CategoryInput>({
    originalSlug: initial?.originalSlug,
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    gradient: initial?.gradient ?? GRADIENT_OPTIONS[0].value,
  });

  function updateName(name: string) {
    setForm((f) => ({
      ...f,
      name,
      slug: slugTouched ? f.slug : slugify(name),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await saveCategory(form);
      if (result.error) {
        toast.error("Save failed", { description: result.error });
        return;
      }
      toast.success(mode === "new" ? "Category created" : "Category updated", {
        description: form.name,
      });
      router.push("/admin/categories");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Category</h2>

        <div className="mt-4 space-y-4">
          <Field label="Name" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateName(e.target.value)}
              required
              placeholder="e.g. Interior Emulsions"
              className={inputClass}
            />
          </Field>

          <Field
            label="Slug"
            hint="URL fragment. Auto-derived from name — edit only if needed."
            required
          >
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm({ ...form, slug: slugify(e.target.value) });
              }}
              required
              placeholder="interior-emulsions"
              className={`${inputClass} font-mono`}
            />
          </Field>

          <Field
            label="Description"
            hint="Shown on the category page banner and home page card."
          >
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              placeholder="Smooth, washable wall paints for interior surfaces."
              className={`${inputClass} resize-y`}
            />
          </Field>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Card colour</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Pick a gradient for the category card on the home page and the
          banner on the category page.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {GRADIENT_OPTIONS.map((opt) => {
            const active = form.gradient === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm({ ...form, gradient: opt.value })}
                aria-label={opt.label}
                title={opt.label}
                className={`aspect-square rounded-2xl bg-linear-to-br ${opt.value} ring-2 transition ${
                  active
                    ? "ring-orange-500 ring-offset-2 ring-offset-white"
                    : "ring-transparent hover:ring-zinc-300"
                }`}
              />
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Link
          href="/admin/categories"
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
              ? "Create category"
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
