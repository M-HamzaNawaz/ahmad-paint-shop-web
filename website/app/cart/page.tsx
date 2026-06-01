import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your cart before placing your order.",
};

export default function CartPage() {
  return <CartView />;
}
