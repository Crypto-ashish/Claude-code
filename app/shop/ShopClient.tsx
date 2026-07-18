"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS, CategorySlug } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/ui";

type Sort = "popular" | "price-asc" | "price-desc" | "rating";

export default function ShopClient() {
  const params = useSearchParams();
  const initialCat = params.get("category") as CategorySlug | null;
  const initialQ = params.get("q") ?? "";

  const [category, setCategory] = useState<CategorySlug | "all">(
    initialCat && CATEGORIES.some((c) => c.slug === initialCat) ? initialCat : "all",
  );
  const [q, setQ] = useState(initialQ);
  const [sort, setSort] = useState<Sort>("popular");
  const [gfOnly, setGfOnly] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(3000);

  const products = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!gfOnly || p.glutenFree) &&
        (!vegOnly || p.veg) &&
        p.weights[0].price <= maxPrice &&
        (q.trim() === "" ||
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.includes(q.toLowerCase())) ||
          p.description.toLowerCase().includes(q.toLowerCase())),
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.weights[0].price - b.weights[0].price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.weights[0].price - a.weights[0].price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false),
        );
    }
    return list;
  }, [category, q, sort, gfOnly, vegOnly, maxPrice]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-500">
          The Bakery Counter
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold text-cocoa-700 dark:text-cream-100 sm:text-5xl">
          Shop all bakes
        </h1>
      </Reveal>

      {/* Discount banner */}
      <Reveal delay={0.1}>
        <div className="btn-shine mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-cocoa-600 via-caramel to-gold-500 p-5 text-center text-sm font-bold text-cream-50 shadow-soft sm:text-base">
          🎁 WELCOME10 — 10% off your first order · CRUMB150 — ₹150 off above ₹999 · Free shipping over ₹999
        </div>
      </Reveal>

      {/* Category chips */}
      <div className="mt-8 flex flex-wrap gap-2">
        {[{ slug: "all" as const, name: "All", emoji: "✨" }, ...CATEGORIES].map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug as CategorySlug | "all")}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              category === c.slug
                ? "border-gold-500 bg-gold-500 text-white shadow-glow"
                : "border-gold-400/40 text-cocoa-600 hover:bg-gold-400/10 dark:text-cream-200"
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="glass mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-3xl p-4 sm:p-5">
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full border border-gold-400/30 bg-cream-50/70 px-4 py-2.5 dark:bg-cocoa-800/60">
          <span>🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search bakes…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-cocoa-400/60 dark:text-cream-100"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-cocoa-600 dark:text-cream-200">
          <input type="checkbox" checked={gfOnly} onChange={(e) => setGfOnly(e.target.checked)} className="h-4 w-4 accent-gold-500" />
          Gluten-Free
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-cocoa-600 dark:text-cream-200">
          <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} className="h-4 w-4 accent-gold-500" />
          100% Veg
        </label>

        <label className="flex items-center gap-3 text-sm font-semibold text-cocoa-600 dark:text-cream-200">
          Under ₹{maxPrice.toLocaleString("en-IN")}
          <input
            type="range"
            min={100}
            max={3000}
            step={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-28 accent-gold-500"
          />
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-full border border-gold-400/30 bg-cream-50/70 px-4 py-2.5 text-sm font-semibold text-cocoa-600 outline-none dark:bg-cocoa-800/60 dark:text-cream-200"
          aria-label="Sort products"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      <p className="mt-6 text-sm text-cocoa-500/70 dark:text-cream-300/60">
        {products.length} bake{products.length === 1 ? "" : "s"} found
      </p>

      <motion.div layout className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </motion.div>

      {products.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-6xl">🫙</p>
          <p className="mt-4 font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">
            The jar is empty for those filters
          </p>
          <button
            onClick={() => {
              setQ("");
              setCategory("all");
              setGfOnly(false);
              setVegOnly(false);
              setMaxPrice(3000);
            }}
            className="mt-5 rounded-full bg-gold-500 px-6 py-2.5 font-bold text-white transition hover:bg-gold-600"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
