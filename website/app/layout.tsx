import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCartBar } from "@/components/MobileCartBar";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Ahmad Paint House — Kaizen & Nippon Paints",
    template: "%s · Ahmad Paint House",
  },
  description:
    "Browse and order Kaizen & Nippon paint products — interior & exterior emulsions, enamels, putty, primers and wood care. Build your order and send it to us on WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-zinc-900">
        <CartProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <MobileCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
