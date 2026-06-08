import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { getSettings } from "@/lib/db/settings";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order has been placed.",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const shop = await getSettings();
  return <OrderConfirmation orderNumber={number} shop={shop} />;
}
