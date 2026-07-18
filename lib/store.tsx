"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, Product } from "./products";

export interface CartItem {
  slug: string;
  weightLabel: string;
  qty: number;
}

export interface ResolvedCartItem extends CartItem {
  product: Product;
  price: number;
  mrp: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  dark: boolean;
  cartOpen: boolean;
  toast: string | null;
  addToCart: (slug: string, weightLabel: string, qty?: number) => void;
  updateQty: (slug: string, weightLabel: string, qty: number) => void;
  removeFromCart: (slug: string, weightLabel: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  viewProduct: (slug: string) => void;
  toggleDark: () => void;
  setCartOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  resolvedCart: ResolvedCartItem[];
  subtotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreState | null>(null);

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {
      /* corrupted storage — fall back to initial */
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable */
    }
  }, [key, value, loaded]);

  return [value, setValue] as const;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = usePersisted<CartItem[]>("gc-cart", []);
  const [wishlist, setWishlist] = usePersisted<string[]>("gc-wishlist", []);
  const [recentlyViewed, setRecentlyViewed] = usePersisted<string[]>(
    "gc-recent",
    [],
  );
  const [dark, setDark] = usePersisted<boolean>("gc-dark", false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (slug: string, weightLabel: string, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find(
          (i) => i.slug === slug && i.weightLabel === weightLabel,
        );
        if (existing) {
          return prev.map((i) =>
            i.slug === slug && i.weightLabel === weightLabel
              ? { ...i, qty: i.qty + qty }
              : i,
          );
        }
        return [...prev, { slug, weightLabel, qty }];
      });
      showToast("Added to cart 🍪");
    },
    [setCart, showToast],
  );

  const updateQty = useCallback(
    (slug: string, weightLabel: string, qty: number) => {
      setCart((prev) =>
        qty <= 0
          ? prev.filter(
              (i) => !(i.slug === slug && i.weightLabel === weightLabel),
            )
          : prev.map((i) =>
              i.slug === slug && i.weightLabel === weightLabel
                ? { ...i, qty }
                : i,
            ),
      );
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (slug: string, weightLabel: string) =>
      setCart((prev) =>
        prev.filter((i) => !(i.slug === slug && i.weightLabel === weightLabel)),
      ),
    [setCart],
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  const toggleWishlist = useCallback(
    (slug: string) => {
      setWishlist((prev) => {
        const has = prev.includes(slug);
        showToast(has ? "Removed from wishlist" : "Saved to wishlist 💛");
        return has ? prev.filter((s) => s !== slug) : [...prev, slug];
      });
    },
    [setWishlist, showToast],
  );

  const viewProduct = useCallback(
    (slug: string) =>
      setRecentlyViewed((prev) =>
        [slug, ...prev.filter((s) => s !== slug)].slice(0, 8),
      ),
    [setRecentlyViewed],
  );

  const toggleDark = useCallback(() => setDark((d) => !d), [setDark]);

  const resolvedCart = useMemo<ResolvedCartItem[]>(
    () =>
      cart.flatMap((item) => {
        const product = PRODUCTS.find((p) => p.slug === item.slug);
        if (!product) return [];
        const weight =
          product.weights.find((w) => w.label === item.weightLabel) ??
          product.weights[0];
        return [{ ...item, product, price: weight.price, mrp: weight.mrp }];
      }),
    [cart],
  );

  const subtotal = useMemo(
    () => resolvedCart.reduce((sum, i) => sum + i.price * i.qty, 0),
    [resolvedCart],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  );

  const value: StoreState = {
    cart,
    wishlist,
    recentlyViewed,
    dark,
    cartOpen,
    toast,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    viewProduct,
    toggleDark,
    setCartOpen,
    showToast,
    resolvedCart,
    subtotal,
    cartCount,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
