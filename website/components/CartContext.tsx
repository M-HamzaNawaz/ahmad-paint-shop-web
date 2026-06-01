"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, ColorShade, Product, Variant } from "@/lib/types";

const STORAGE_KEY = "aps_cart";
const MAX_QTY = 99;

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  /** True once the cart has been loaded from localStorage. */
  ready: boolean;
  addItem: (
    product: Product,
    variant: Variant,
    quantity: number,
    color?: ColorShade | null,
  ) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** A cart line is unique per variant + chosen colour. */
function makeLineId(variantId: string, color?: ColorShade | null): string {
  return color ? `${variantId}::${color.code}` : variantId;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Load the saved cart once, on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          // Keep only items that still have a line id (drop old-format carts).
          setItems(parsed.filter((i) => typeof i?.lineId === "string"));
        }
      }
    } catch {
      // Ignore corrupt storage.
    }
    setReady(true);
  }, []);

  // Persist whenever the cart changes (after the initial load).
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors.
    }
  }, [items, ready]);

  const addItem = useCallback(
    (
      product: Product,
      variant: Variant,
      quantity: number,
      color?: ColorShade | null,
    ) => {
      const qty = Math.max(1, Math.min(MAX_QTY, Math.round(quantity)));
      const lineId = makeLineId(variant.id, color);
      setItems((prev) => {
        const existing = prev.find((i) => i.lineId === lineId);
        if (existing) {
          return prev.map((i) =>
            i.lineId === lineId
              ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + qty) }
              : i,
          );
        }
        const newItem: CartItem = {
          lineId,
          variantId: variant.id,
          productId: product.id,
          productName: product.name,
          productLine: product.productLine,
          brand: product.brand,
          packSize: variant.packSize,
          unitPrice: variant.totalPrice,
          quantity: qty,
          colorName: color?.name,
          colorCode: color?.code,
          colorHex: color?.hex,
        };
        return [...prev, newItem];
      });
    },
    [],
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    const qty = Math.round(quantity);
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.lineId !== lineId);
      return prev.map((i) =>
        i.lineId === lineId ? { ...i, quantity: Math.min(MAX_QTY, qty) } : i,
      );
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );
    return {
      items,
      totalItems,
      totalPrice,
      ready,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, ready, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
