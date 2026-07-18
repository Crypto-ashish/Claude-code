"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { categoryName, getRelated } from "@/lib/products";
import { REVIEWS } from "@/lib/content";
import { useStore, inr } from "@/lib/store";
import BiscuitArt from "@/components/BiscuitArt";
import ProductCard from "@/components/ProductCard";
import { Badge, Reveal, SectionHeading, Stars, VegMark } from "@/components/ui";

type Tab = "ingredients" | "nutrition" | "shipping" | "reviews";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist, viewProduct } = useStore();
  const [weight, setWeight] = useState(product.weights[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("ingredients");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [spin, setSpin] = useState(0);
  const dragging = useRef<{ x: number; spin: number } | null>(null);

  useEffect(() => {
    viewProduct(product.slug);
  }, [product.slug, viewProduct]);

  const wished = wishlist.includes(product.slug);
  const related = getRelated(product, 4);
  const fbt = getRelated(product, 2);
  const off = Math.round(((weight.mrp - weight.price) / weight.mrp) * 100);
  const gallerySeeds = [7, 23, 41, 59];

  const reviews = REVIEWS.filter((r) => r.product === product.name).concat(
    REVIEWS.filter((r) => r.product !== product.name).slice(0, 2),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-8 text-xs font-semibold text-cocoa-500/70 dark:text-cream-300/60">
        <Link href="/" className="hover:text-gold-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-gold-600">
          {categoryName(product.category)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-cocoa-700 dark:text-cream-100">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* ---------- Gallery ---------- */}
        <div>
          <div
            className="glass group relative aspect-square cursor-crosshair overflow-hidden rounded-4xl shadow-soft"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => {
              setZoom(false);
              dragging.current = null;
            }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoomPos({
                x: ((e.clientX - r.left) / r.width) * 100,
                y: ((e.clientY - r.top) / r.height) * 100,
              });
              if (dragging.current) {
                setSpin(dragging.current.spin + (e.clientX - dragging.current.x));
              }
            }}
            onMouseDown={(e) => {
              dragging.current = { x: e.clientX, spin };
            }}
            onMouseUp={() => (dragging.current = null)}
          >
            <div className="light-leak absolute inset-0" />
            <div
              className="grid h-full w-full place-items-center transition-transform duration-200"
              style={{
                transform: zoom ? "scale(1.7)" : "scale(1)",
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            >
              <div style={{ transform: `rotate(${spin}deg)` }} className="transition-transform duration-75">
                <BiscuitArt
                  art={product.art}
                  seed={gallerySeeds[galleryIdx]}
                  className="h-72 w-72 drop-shadow-2xl sm:h-96 sm:w-96"
                />
              </div>
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-cocoa-900/60 px-4 py-1.5 text-[11px] font-semibold text-cream-100 opacity-0 backdrop-blur transition group-hover:opacity-100">
              Hover to zoom · drag to spin 360°
            </span>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallerySeeds.map((seed, i) => (
              <button
                key={seed}
                onClick={() => setGalleryIdx(i)}
                className={`glass grid aspect-square place-items-center rounded-2xl p-3 transition ${
                  galleryIdx === i ? "ring-2 ring-gold-500" : "hover:ring-1 hover:ring-gold-400/50"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <BiscuitArt art={product.art} seed={seed} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Details ---------- */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.bestseller && <Badge tone="gold">★ Bestseller</Badge>}
            {product.isNew && <Badge tone="green">New Arrival</Badge>}
            {product.glutenFree && <Badge tone="green">🌾 Certified Gluten-Free</Badge>}
            <VegMark veg={product.veg} />
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-cocoa-700 dark:text-cream-100 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-cocoa-500/80 dark:text-cream-300/70">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold text-cocoa-600 dark:text-cream-200">{product.rating}</span>
            <span className="text-sm text-cocoa-500/70 dark:text-cream-300/60">
              {product.reviewCount.toLocaleString("en-IN")} reviews
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <p className="text-4xl font-extrabold text-cocoa-700 dark:text-cream-100">
              {inr(weight.price * qty)}
            </p>
            <p className="pb-1 text-lg text-cocoa-400 line-through">{inr(weight.mrp * qty)}</p>
            <Badge tone="red">Save {off}%</Badge>
          </div>
          <p className="mt-1 text-xs text-cocoa-500/70 dark:text-cream-300/60">
            Inclusive of all taxes · GST invoice available
          </p>

          <p className="mt-5 leading-relaxed text-cocoa-600/90 dark:text-cream-200/85">
            {product.description}
          </p>

          {/* Weight selection */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-bold text-cocoa-700 dark:text-cream-100">Select size</p>
            <div className="flex flex-wrap gap-2">
              {product.weights.map((w) => (
                <button
                  key={w.label}
                  onClick={() => setWeight(w)}
                  className={`rounded-2xl border px-4 py-2.5 text-sm font-bold transition ${
                    weight.label === w.label
                      ? "border-gold-500 bg-gold-500 text-white shadow-glow"
                      : "border-gold-400/40 text-cocoa-600 hover:bg-gold-400/10 dark:text-cream-200"
                  }`}
                >
                  {w.label}
                  <span className={`block text-[11px] font-semibold ${weight.label === w.label ? "text-cream-100/90" : "text-gold-600"}`}>
                    {inr(w.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Qty + stock */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-full border border-gold-400/40 px-4 py-2.5">
              <button className="text-xl font-bold text-gold-600" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
              <span className="w-6 text-center text-lg font-bold">{qty}</span>
              <button className="text-xl font-bold text-gold-600" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <p className={`text-sm font-semibold ${product.stock < 60 ? "text-rose-500" : "text-emerald-600"}`}>
              {product.stock < 60 ? `⚡ Only ${product.stock} left in stock` : "✔ In stock, ships in 24h"}
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => addToCart(product.slug, weight.label, qty)}
              className="rounded-full border-2 border-gold-500 py-3.5 font-bold text-gold-600 transition hover:bg-gold-500/10"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                addToCart(product.slug, weight.label, qty);
                router.push("/checkout");
              }}
              className="btn-shine rounded-full bg-gradient-to-r from-gold-500 to-caramel py-3.5 font-bold text-white shadow-glow"
            >
              Buy Now — {inr(weight.price * qty)}
            </motion.button>
            <button
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Toggle wishlist"
              className={`grid h-[52px] w-[52px] place-items-center rounded-full border-2 transition ${
                wished ? "border-rose-500 bg-rose-500 text-white" : "border-gold-400/50 text-cocoa-500 hover:bg-gold-400/10"
              }`}
            >
              ♥
            </button>
          </div>
          <p className="mt-3 text-xs text-cocoa-500/70 dark:text-cream-300/60">
            🔒 Secure checkout via Razorpay — UPI, cards, net banking & wallets · COD available
          </p>

          {/* Trust strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-cocoa-600 dark:text-cream-200">
            {[
              ["🚚", "Free shipping over ₹999"],
              ["↩️", "48h damage replacement"],
              ["🏅", `FSSAI ${product.fssai}`],
            ].map(([icon, text]) => (
              <div key={text} className="glass rounded-2xl px-2 py-3">
                <span className="block text-xl">{icon}</span>
                <span className="mt-1 block leading-tight">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="mt-16">
        <div className="flex flex-wrap gap-2 border-b border-gold-400/20">
          {(
            [
              ["ingredients", "Ingredients"],
              ["nutrition", "Nutrition Facts"],
              ["shipping", "Shipping & Returns"],
              ["reviews", `Reviews (${product.reviewCount.toLocaleString("en-IN")})`],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative px-4 py-3 text-sm font-bold transition ${
                tab === key ? "text-gold-600" : "text-cocoa-500/70 hover:text-cocoa-700 dark:text-cream-300/60"
              }`}
            >
              {label}
              {tab === key && (
                <motion.span layoutId="tab-line" className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold-500" />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="py-8"
          >
            {tab === "ingredients" && (
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">What's inside</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ing) => (
                      <li key={ing} className="flex items-center gap-2 text-sm text-cocoa-600/90 dark:text-cream-200/80">
                        <span className="text-gold-500">✦</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass rounded-3xl p-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Compliance</h3>
                  <dl className="space-y-2 text-sm text-cocoa-600/90 dark:text-cream-200/80">
                    <div className="flex justify-between"><dt>FSSAI</dt><dd className="font-semibold">{product.fssai}</dd></div>
                    <div className="flex justify-between"><dt>Type</dt><dd className="font-semibold">{product.veg ? "100% Vegetarian" : "Contains egg"}</dd></div>
                    <div className="flex justify-between"><dt>Gluten</dt><dd className="font-semibold">{product.glutenFree ? "Certified gluten-free (<10 ppm)" : "Contains gluten"}</dd></div>
                    <div className="flex justify-between"><dt>Shelf life</dt><dd className="font-semibold">4 months (unopened)</dd></div>
                    <div className="flex justify-between"><dt>Allergens</dt><dd className="font-semibold">Milk, nuts (see pack)</dd></div>
                  </dl>
                </div>
              </div>
            )}

            {tab === "nutrition" && (
              <div className="glass max-w-lg overflow-hidden rounded-3xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gold-400/15 text-left">
                      <th className="px-5 py-3 font-bold text-cocoa-700 dark:text-cream-100">Nutrient</th>
                      <th className="px-5 py-3 font-bold text-cocoa-700 dark:text-cream-100">Per 100 g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.nutrition.map((n) => (
                      <tr key={n.label} className="border-t border-gold-400/15">
                        <td className="px-5 py-2.5 text-cocoa-600 dark:text-cream-200">{n.label}</td>
                        <td className="px-5 py-2.5 font-semibold text-cocoa-700 dark:text-cream-100">{n.per100g}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "shipping" && (
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  ["🚚 Shipping", "Dispatched within 24 hours in nitrogen-flushed crisp-lock packs. Metro delivery 2–3 days, rest of India 3–6 days. Free above ₹999."],
                  ["↩️ Returns", "Damaged or below standard? Send a photo within 48 hours for an instant free replacement or full refund — keep the biscuits."],
                  ["💳 Payments", "UPI, cards, net banking and wallets via Razorpay. Cash on Delivery available up to ₹2,000. GST invoice on request at checkout."],
                ].map(([title, text]) => (
                  <div key={title} className="glass rounded-3xl p-6">
                    <h3 className="font-display font-bold text-cocoa-700 dark:text-cream-100">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cocoa-600/85 dark:text-cream-200/75">{text}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((r, i) => (
                  <div key={i} className="glass rounded-3xl p-6">
                    <Stars rating={r.rating} />
                    <p className="mt-3 text-sm leading-relaxed text-cocoa-600/90 dark:text-cream-200/80">{r.text}</p>
                    <p className="mt-4 text-xs font-bold text-cocoa-700 dark:text-cream-100">
                      {r.name} · {r.city} <span className="ml-1 font-semibold text-emerald-600">✔ Verified</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Frequently bought together ---------- */}
      <section className="mt-8">
        <SectionHeading eyebrow="Better Together" title="Frequently bought together" center={false} />
        <div className="glass mt-8 flex flex-col items-stretch gap-4 rounded-4xl p-6 sm:flex-row sm:items-center">
          <FbtItem name={product.name} price={weight.price} art={product.art} />
          {fbt.map((p) => (
            <div key={p.slug} className="flex items-center gap-4">
              <span className="hidden text-2xl font-bold text-gold-500 sm:block">+</span>
              <FbtItem name={p.name} price={p.weights[0].price} art={p.art} />
            </div>
          ))}
          <div className="sm:ml-auto sm:pl-4 sm:text-right">
            <p className="text-sm text-cocoa-500/70 dark:text-cream-300/60">Bundle total</p>
            <p className="text-2xl font-extrabold text-cocoa-700 dark:text-cream-100">
              {inr(weight.price + fbt.reduce((s, p) => s + p.weights[0].price, 0))}
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                addToCart(product.slug, weight.label);
                fbt.forEach((p) => addToCart(p.slug, p.weights[0].label));
              }}
              className="mt-2 w-full rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-gold-600 sm:w-auto"
            >
              Add all 3
            </motion.button>
          </div>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      <section className="mt-16">
        <SectionHeading eyebrow="Keep Browsing" title="You may also love" center={false} />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FbtItem({
  name,
  price,
  art,
}: {
  name: string;
  price: number;
  art: Product["art"];
}) {
  return (
    <div className="flex items-center gap-3">
      <BiscuitArt art={art} className="h-14 w-14 shrink-0" />
      <div>
        <p className="max-w-[160px] text-sm font-bold leading-tight text-cocoa-700 dark:text-cream-100">{name}</p>
        <p className="text-sm font-semibold text-gold-600">{inr(price)}</p>
      </div>
    </div>
  );
}
