"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { INSTAGRAM_POSTS, REVIEWS, STATS } from "@/lib/content";
import { useStore, inr } from "@/lib/store";
import BiscuitArt from "./BiscuitArt";
import ProductCard from "./ProductCard";
import { Reveal, SectionHeading, Stars } from "./ui";

/* ---------------- Animated statistics ---------------- */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="glass grid grid-cols-2 gap-6 rounded-4xl p-8 shadow-soft md:grid-cols-4 md:p-10">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <p className="font-display text-3xl font-bold text-gradient-gold sm:text-4xl lg:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-cocoa-500/80 dark:text-cream-300/70 sm:text-sm">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Category grid ---------------- */
export function CategoriesSection() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="Our Range"
        title="Five ways to treat yourself"
        sub="From everyday chai companions to keepsake gift hampers — every range baked in small batches."
      />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              href={`/shop?category=${c.slug}`}
              className="glass group flex h-full flex-col items-center rounded-3xl p-6 text-center shadow-soft transition hover:-translate-y-2 hover:shadow-lift"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-400/15 text-3xl transition duration-500 group-hover:rotate-12 group-hover:bg-gold-400/30">
                {c.emoji}
              </span>
              <h3 className="mt-4 font-display font-bold text-cocoa-700 dark:text-cream-100">
                {c.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-cocoa-500/70 dark:text-cream-300/60">
                {c.blurb}
              </p>
              <span className="mt-auto pt-3 text-xs font-bold text-gold-600 opacity-0 transition group-hover:opacity-100">
                Explore →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Featured products ---------------- */
export function FeaturedSection() {
  const featured = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="Customer Favourites"
        title="The bakes everyone reorders"
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link
          href="/shop"
          className="inline-block rounded-full border-2 border-gold-500 px-8 py-3.5 font-bold text-gold-600 transition hover:bg-gold-500 hover:text-white"
        >
          View all products →
        </Link>
      </Reveal>
    </section>
  );
}

/* ---------------- Infinite marquee showcase ---------------- */
export function MarqueeSection() {
  const items = [...PRODUCTS, ...PRODUCTS];
  return (
    <section className="mt-24 overflow-hidden border-y border-gold-400/20 bg-gold-400/5 py-8">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((p, i) => (
          <Link
            key={`${p.slug}-${i}`}
            href={`/product/${p.slug}`}
            className="group flex shrink-0 items-center gap-3"
          >
            <BiscuitArt art={p.art} className="h-12 w-12 transition group-hover:rotate-12" seed={i} />
            <span className="whitespace-nowrap font-display text-lg font-semibold text-cocoa-600/80 transition group-hover:text-gold-600 dark:text-cream-200/80">
              {p.name}
            </span>
            <span className="text-gold-400">✦</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Reviews carousel ---------------- */
export function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(
      () => setIdx((i) => (i + 1) % REVIEWS.length),
      4500,
    );
    return () => window.clearInterval(t);
  }, [paused]);

  const r = REVIEWS[idx];

  return (
    <section className="mx-auto mt-24 max-w-4xl px-4 sm:px-6">
      <SectionHeading eyebrow="Loved Across India" title="50,000 sweet-toothed fans" />
      <div
        className="relative mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="glass relative min-h-[230px] overflow-hidden rounded-4xl p-8 shadow-soft sm:p-10">
          <span className="absolute -top-2 left-6 font-display text-8xl text-gold-400/30">"</span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="relative"
            >
              <Stars rating={r.rating} />
              <blockquote className="mt-4 font-display text-lg leading-relaxed text-cocoa-600 dark:text-cream-200 sm:text-xl">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-bold text-white">
                  {r.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-bold text-cocoa-700 dark:text-cream-100">
                    {r.name} · {r.city}
                  </span>
                  <span className="text-xs text-cocoa-500/70 dark:text-cream-300/60">
                    Verified buyer · {r.product}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-gold-500" : "w-2 bg-gold-400/40 hover:bg-gold-400/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Recently viewed ---------------- */
export function RecentlyViewedSection() {
  const { recentlyViewed } = useStore();
  const products = recentlyViewed
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);
  if (products.length === 0) return null;
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <SectionHeading eyebrow="Pick up where you left off" title="Recently viewed" />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Instagram feed ---------------- */
export function InstagramSection() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="@goldencrumb.bakery"
        title="Fresh from the oven, fresh on the feed"
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
        {INSTAGRAM_POSTS.map((post, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <a
              href="#"
              className="group relative block aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gold-300/40 via-cream-200 to-caramel/30 shadow-soft dark:from-cocoa-600 dark:via-cocoa-700 dark:to-cocoa-800"
              aria-label={`Instagram: ${post.caption}`}
            >
              <span className="grid h-full w-full place-items-center text-5xl transition duration-500 group-hover:scale-125 group-hover:rotate-6">
                {post.emoji}
              </span>
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-cocoa-900/70 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                <span className="text-sm font-bold text-white">♥ {post.likes}</span>
                <span className="px-3 text-center text-xs text-cream-200">{post.caption}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */
export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6">
      <div className="light-leak glass relative overflow-hidden rounded-5xl p-10 text-center shadow-lift sm:p-14">
        <motion.span
          className="absolute -right-6 -top-6 text-8xl opacity-20"
          animate={{ rotate: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          aria-hidden
        >
          🍪
        </motion.span>
        <SectionHeading
          eyebrow="The Crumb Letter"
          title="First dibs on fresh batches"
          sub="New flavours, subscriber-only discounts and the occasional recipe. One email a week, never stale."
        />
        {sent ? (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mt-8 max-w-md rounded-full bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-700 dark:text-emerald-300"
          >
            🎉 You're in! Check your inbox for a welcome treat — code WELCOME10.
          </motion.p>
        ) : (
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-gold-400/40 bg-cream-50/80 px-5 py-3.5 text-cocoa-700 outline-none transition focus:border-gold-500 dark:bg-cocoa-800/60 dark:text-cream-100"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-shine rounded-full bg-gold-500 px-8 py-3.5 font-bold text-white transition hover:bg-gold-600"
            >
              Subscribe
            </motion.button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- USP strip ---------------- */
export function UspSection() {
  const usps = [
    { icon: "🔥", title: "Stone-Oven Baked", text: "Slow curves, deep flavour — never flash-baked." },
    { icon: "🌿", title: "Clean Ingredients", text: "No palm oil, no trans fats, no preservatives." },
    { icon: "🚚", title: "Crisp Delivery", text: "Nitrogen-flushed packs, 2–6 day pan-India shipping." },
    { icon: "🤝", title: "Wholesale Friendly", text: "Trade pricing for cafés, gyms and retailers." },
  ];
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {usps.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.08}>
            <div className="glass group h-full rounded-3xl p-6 shadow-soft transition hover:-translate-y-1.5 hover:shadow-lift">
              <span className="text-3xl transition duration-500 group-hover:scale-125 inline-block">{u.icon}</span>
              <h3 className="mt-3 font-display font-bold text-cocoa-700 dark:text-cream-100">{u.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cocoa-500/80 dark:text-cream-300/70">{u.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
