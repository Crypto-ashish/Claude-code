"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { categoryName } from "@/lib/products";
import { useStore, inr } from "@/lib/store";
import BiscuitArt from "./BiscuitArt";
import { Badge, Stars, VegMark } from "./ui";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quickView, setQuickView] = useState(false);
  const wished = wishlist.includes(product.slug);
  const w0 = product.weights[0];
  const off = Math.round(((w0.mrp - w0.price) / w0.mrp) * 100);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: (index % 4) * 0.08 }}
        whileHover={{ y: -8 }}
        className="glass group relative flex flex-col overflow-hidden rounded-3xl p-4 shadow-soft transition-shadow hover:shadow-lift"
      >
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
          {product.bestseller && <Badge tone="gold">★ Bestseller</Badge>}
          {product.isNew && <Badge tone="green">New</Badge>}
          {off >= 15 && <Badge tone="red">-{off}%</Badge>}
        </div>

        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label="Toggle wishlist"
          className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full transition ${
            wished
              ? "bg-rose-500 text-white"
              : "bg-white/70 text-cocoa-500 opacity-0 backdrop-blur transition group-hover:opacity-100 dark:bg-cocoa-700/70 dark:text-cream-200"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9Z" strokeLinejoin="round" />
          </svg>
        </button>

        <Link href={`/product/${product.slug}`} className="relative mx-auto block py-4">
          <div className="absolute inset-4 rounded-full bg-gold-400/15 blur-2xl transition group-hover:bg-gold-400/30" />
          <BiscuitArt
            art={product.art}
            className="relative h-36 w-36 drop-shadow-md transition duration-500 group-hover:rotate-6 group-hover:scale-110 sm:h-40 sm:w-40"
          />
        </Link>

        <div className="mt-2 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">
            {categoryName(product.category)}
          </p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-cocoa-700 transition group-hover:text-gold-600 dark:text-cream-100">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1.5 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-xs text-cocoa-500/70 dark:text-cream-300/60">
              ({product.reviewCount.toLocaleString("en-IN")})
            </span>
            <VegMark veg={product.veg} />
            {product.glutenFree && <Badge tone="green">GF</Badge>}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p>
            <span className="text-lg font-extrabold text-cocoa-700 dark:text-cream-100">{inr(w0.price)}</span>
            <span className="ml-2 text-sm text-cocoa-400 line-through dark:text-cream-300/50">{inr(w0.mrp)}</span>
          </p>
          {product.stock < 60 && (
            <span className="text-[11px] font-semibold text-rose-500">Only {product.stock} left</span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => addToCart(product.slug, w0.label)}
            className="rounded-full bg-cocoa-600 py-2.5 text-sm font-bold text-cream-50 transition hover:bg-gold-500 dark:bg-gold-500 dark:hover:bg-gold-400"
          >
            Add to Cart
          </motion.button>
          <button
            onClick={() => setQuickView(true)}
            aria-label="Quick view"
            title="Quick view"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/40 text-gold-600 transition hover:bg-gold-400/15"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
          </button>
        </div>
      </motion.article>

      <AnimatePresence>
        {quickView && (
          <QuickViewModal product={product} onClose={() => setQuickView(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [weight, setWeight] = useState(product.weights[0]);
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-cocoa-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 16, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="glass-strong w-full max-w-2xl rounded-4xl p-6 shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Quick view: ${product.name}`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid place-items-center rounded-3xl bg-gold-400/10 p-6">
            <BiscuitArt art={product.art} className="h-44 w-44 animate-float drop-shadow-xl" />
          </div>
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">
                {product.name}
              </h3>
              <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-gold-400/15">✕</button>
            </div>
            <p className="mt-1 text-sm text-cocoa-500/80 dark:text-cream-300/70">{product.tagline}</p>
            <div className="mt-2 flex items-center gap-2">
              <Stars rating={product.rating} />
              <VegMark veg={product.veg} />
              {product.glutenFree && <Badge tone="green">Gluten-Free</Badge>}
            </div>

            <p className="mt-4 text-2xl font-extrabold text-cocoa-700 dark:text-cream-100">
              {inr(weight.price * qty)}
              <span className="ml-2 text-sm font-medium text-cocoa-400 line-through">{inr(weight.mrp * qty)}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.weights.map((w) => (
                <button
                  key={w.label}
                  onClick={() => setWeight(w)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                    weight.label === w.label
                      ? "border-gold-500 bg-gold-500 text-white"
                      : "border-gold-400/40 text-cocoa-600 hover:bg-gold-400/10 dark:text-cream-200"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-gold-400/40 px-3 py-1.5">
                <button className="font-bold text-gold-600" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="w-5 text-center font-bold">{qty}</span>
                <button className="font-bold text-gold-600" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addToCart(product.slug, weight.label, qty);
                  onClose();
                }}
                className="btn-shine flex-1 rounded-full bg-gold-500 py-3 text-sm font-bold text-white transition hover:bg-gold-600"
              >
                Add to Cart · {inr(weight.price * qty)}
              </motion.button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
              onClick={onClose}
            >
              View full details →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
