"use server";

import { createClient } from "@/lib/supabase/server";

export interface UploadResult {
  url?: string;
  error?: string;
}

const MAX_BYTES = 5 * 1024 * 1024; // 5MB — matches storage bucket limit
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/**
 * Uploads an image to the `product-images` Supabase Storage bucket and
 * returns its public URL. Authenticated-only via RLS.
 */
export async function uploadProductImage(
  formData: FormData,
): Promise<UploadResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not signed in." };

    const file = formData.get("file");
    if (!(file instanceof File)) return { error: "No file provided." };

    if (!ALLOWED_TYPES.has(file.type)) {
      return { error: "Image must be JPEG, PNG, WebP or GIF." };
    }
    if (file.size > MAX_BYTES) {
      return { error: "Image must be 5 MB or smaller." };
    }

    // Build a stable-ish but collision-resistant filename:
    // <timestamp>-<random>-<sanitized-name>.<ext>
    const safeName = file.name
      .toLowerCase()
      .replace(/\.[a-z0-9]+$/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image";
    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
    const path = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${safeName}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("product-images")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
    if (uploadErr) return { error: uploadErr.message };

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed" };
  }
}
