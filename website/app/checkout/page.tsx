import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter your details and place your order on WhatsApp.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
