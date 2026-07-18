"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useStore, inr } from "@/lib/store";
import BiscuitArt from "./BiscuitArt";

/** Rotating-biscuit loading screen shown once per visit. */
export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 1400);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-cream-100 dark:bg-cocoa-900"
          aria-hidden
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              className="mx-auto h-20 w-20"
            >
              <BiscuitArt
                art={{ base: "#DDA341", accent: "#6B4226", variant: "round" }}
                className="h-full w-full drop-shadow-lg"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="mt-4 font-display text-sm tracking-[0.3em] text-gold-600"
            >
              BAKING…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="glass-strong fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold text-cocoa-700 shadow-lift dark:text-cream-100"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876500000?text=Hi%20GoldenCrumb!%20I%20have%20a%20question"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 16 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" style={{ animationDuration: "2.4s" }} />
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.49 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.58-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.38 4.63zM12.05.4A11.6 11.6 0 0 0 2 17.8L.6 23l5.32-1.4a11.55 11.55 0 0 0 5.55 1.42h.01a11.6 11.6 0 0 0 8.2-19.8A11.53 11.53 0 0 0 12.06.4z" />
      </svg>
    </motion.a>
  );
}

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    resolvedCart,
    updateQty,
    removeFromCart,
    subtotal,
  } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cocoa-900/50 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[65] flex h-dvh w-full max-w-md flex-col bg-cream-50 shadow-lift dark:bg-cocoa-800"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-gold-400/20 px-5 py-4">
              <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">
                Your Basket 🧺
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-gold-400/15"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {resolvedCart.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="text-5xl">🍪</p>
                    <p className="mt-3 font-semibold text-cocoa-600 dark:text-cream-200">
                      Your basket is feeling light
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => setCartOpen(false)}
                      className="mt-4 inline-block rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-gold-600"
                    >
                      Browse the bakery
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {resolvedCart.map((item) => (
                    <motion.li
                      layout
                      key={`${item.slug}-${item.weightLabel}`}
                      className="glass flex gap-3 rounded-2xl p-3"
                    >
                      <BiscuitArt art={item.product.art} className="h-16 w-16 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-cocoa-700 dark:text-cream-100">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-cocoa-500/70 dark:text-cream-300/60">
                          {item.weightLabel}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-gold-400/30 px-1">
                            <button className="px-1.5 py-0.5 font-bold text-gold-600" onClick={() => updateQty(item.slug, item.weightLabel, item.qty - 1)}>−</button>
                            <span className="text-sm font-semibold">{item.qty}</span>
                            <button className="px-1.5 py-0.5 font-bold text-gold-600" onClick={() => updateQty(item.slug, item.weightLabel, item.qty + 1)}>+</button>
                          </div>
                          <span className="text-sm font-bold text-cocoa-700 dark:text-cream-100">
                            {inr(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.slug, item.weightLabel)}
                        className="self-start text-xs text-cocoa-400 transition hover:text-rose-500"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {resolvedCart.length > 0 && (
              <div className="border-t border-gold-400/20 px-5 py-4">
                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-cocoa-500 dark:text-cream-300">Subtotal</span>
                  <span className="font-bold text-cocoa-700 dark:text-cream-100">{inr(subtotal)}</span>
                </div>
                <p className="mb-3 text-xs text-cocoa-500/70 dark:text-cream-300/60">
                  {subtotal >= 999 ? "🎉 You've unlocked free shipping!" : `Add ${inr(999 - subtotal)} more for free shipping`}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="rounded-full border-2 border-gold-500 px-4 py-2.5 text-center text-sm font-bold text-gold-600 transition hover:bg-gold-500/10"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="btn-shine rounded-full bg-gold-500 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-gold-600"
                  >
                    Checkout →
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
