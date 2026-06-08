import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getSettings } from "@/lib/db/settings";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your details and place your order on WhatsApp.",
};

export default async function CheckoutPage() {
  const shop = await getSettings();
  return <CheckoutForm shop={shop} />;
}
