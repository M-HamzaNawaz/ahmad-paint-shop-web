import type { Metadata } from "next";
import { getAdminSettings } from "@/lib/db/adminSettings";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
        Settings
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Shop identity, contact info and WhatsApp configuration.
      </p>
      <div className="mt-6 max-w-3xl">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
