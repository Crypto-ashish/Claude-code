"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStore, inr } from "@/lib/store";
import BiscuitArt from "@/components/BiscuitArt";
import { Reveal } from "@/components/ui";

export default function CartPage() {
  const { resolvedCart, updateQty, removeFromCart, subtotal } = useStore();
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const savings = resolvedCart.reduce(
    (s, i) => s + (i.mrp - i.price) * i.qty,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold text-cocoa-700 dark:text-cream-100">
          Your Basket 🧺
        </h1>
      </Reveal>

      {resolvedCart.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-7xl">🍪</p>
          <p className="mt-5 font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">
            Nothing but crumbs in here
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-gold-500 px-8 py-3.5 font-bold text-white transition hover:bg-gold-600"
          >
            Fill it with fresh bakes →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="space-y-4">
            {resolvedCart.map((item) => (
              <motion.li
                layout
                key={`${item.slug}-${item.weightLabel}`}
                className="glass flex gap-4 rounded-3xl p-4 shadow-soft sm:p-5"
              >
                <Link href={`/product/${item.slug}`}>
                  <BiscuitArt art={item.product.art} className="h-20 w-20 sm:h-24 sm:w-24" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${item.slug}`}>
                    <h2 className="font-display text-lg font-bold text-cocoa-700 hover:text-gold-600 dark:text-cream-100">
                      {item.product.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-cocoa-500/70 dark:text-cream-300/60">{item.weightLabel}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-gold-400/40 px-3 py-1.5">
                      <button className="font-bold text-gold-600" onClick={() => updateQty(item.slug, item.weightLabel, item.qty - 1)}>−</button>
                      <span className="w-5 text-center font-bold">{item.qty}</span>
                      <button className="font-bold text-gold-600" onClick={() => updateQty(item.slug, item.weightLabel, item.qty + 1)}>+</button>
                    </div>
                    <p className="font-extrabold text-cocoa-700 dark:text-cream-100">
                      {inr(item.price * item.qty)}
                      <span className="ml-2 text-xs font-medium text-cocoa-400 line-through">{inr(item.mrp * item.qty)}</span>
                    </p>
                    <button
                      onClick={() => removeFromCart(item.slug, item.weightLabel)}
                      className="ml-auto text-sm font-semibold text-cocoa-400 transition hover:text-rose-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <aside className="glass h-fit rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">
              Order Summary
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-cocoa-500 dark:text-cream-300">Subtotal</dt>
                <dd className="font-bold">{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-cocoa-500 dark:text-cream-300">Shipping</dt>
                <dd className="font-bold">{shipping === 0 ? "FREE 🎉" : inr(shipping)}</dd>
              </div>
              <div className="flex justify-between text-emerald-600">
                <dt>You save</dt>
                <dd className="font-bold">{inr(savings)}</dd>
              </div>
              <div className="flex justify-between border-t border-gold-400/20 pt-3 text-base">
                <dt className="font-bold text-cocoa-700 dark:text-cream-100">Total</dt>
                <dd className="font-extrabold text-cocoa-700 dark:text-cream-100">{inr(subtotal + shipping)}</dd>
              </div>
            </dl>
            {shipping > 0 && (
              <p className="mt-3 rounded-2xl bg-gold-400/10 px-4 py-2.5 text-xs font-semibold text-gold-600">
                Add {inr(999 - subtotal)} more to unlock free shipping
              </p>
            )}
            <Link href="/checkout">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-shine mt-5 block rounded-full bg-gradient-to-r from-gold-500 to-caramel py-3.5 text-center font-bold text-white shadow-glow"
              >
                Proceed to Checkout →
              </motion.span>
            </Link>
            <p className="mt-3 text-center text-xs text-cocoa-500/70 dark:text-cream-300/60">
              🔒 Secured by Razorpay · Apply coupons at checkout
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
