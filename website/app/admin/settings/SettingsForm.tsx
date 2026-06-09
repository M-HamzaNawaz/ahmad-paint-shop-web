"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRightIcon } from "@/components/Icons";
import type { Settings } from "@/lib/db/adminSettings";
import { saveSettings } from "./actions";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

export function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<Settings>(initial);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await saveSettings(form);
      if (result.error) {
        toast.error("Save failed", { description: result.error });
        return;
      }
      toast.success("Settings saved");
      router.refresh();
    });
  }

  function field<K extends keyof Settings>(
    key: K,
    label: string,
    options?: {
      hint?: string;
      placeholder?: string;
      type?: string;
      multiline?: boolean;
      rows?: number;
    },
  ) {
    return (
      <Field label={label} hint={options?.hint}>
        {options?.multiline ? (
          <textarea
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={options?.placeholder}
            rows={options.rows ?? 3}
            className={`${inputClass} resize-y`}
          />
        ) : (
          <input
            type={options?.type ?? "text"}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={options?.placeholder}
            className={inputClass}
          />
        )}
      </Field>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Shop identity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {field("shopName", "Shop name", {
            placeholder: "Ahmad Paint House",
          })}
          {field("supplier", "Supplier", {
            placeholder: "Kaizen & Nippon Paint",
            hint: "Shown as 'Authorised retailer of …'",
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">WhatsApp</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {field("whatsapp", "WhatsApp number", {
            placeholder: "923468803287",
            hint: "International format, no '+'. Used to receive orders.",
          })}
          {field("whatsappDisplay", "Display format", {
            placeholder: "0346-8803287",
            hint: "How it appears on the site.",
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Contact &amp; hours</h2>
        <div className="mt-4 space-y-4">
          {field("address", "Address", {
            placeholder:
              "Branch 1, City\nBranch 2, City (one per line for multiple branches)",
            hint: "Put each branch on its own line — they'll appear stacked on the customer site.",
            multiline: true,
            rows: 3,
          })}
          {field("hours", "Hours", {
            placeholder: "Monday – Saturday, 9:00 AM – 8:00 PM",
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-bold text-zinc-900">Price list metadata</h2>
        <div className="mt-4 space-y-4">
          {field("taxNote", "Tax note", {
            placeholder:
              "All prices include 18% sales tax · Subject to stock availability",
            hint: "Shown in the announcement strip.",
          })}
          {field("priceListDate", "Price list effective", {
            placeholder: "20 April 2026",
          })}
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
          {!pending ? <ArrowRightIcon className="h-4 w-4" /> : null}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-zinc-800">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1 text-xs text-zinc-400">{hint}</p> : null}
    </div>
  );
}
