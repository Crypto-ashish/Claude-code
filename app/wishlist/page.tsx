"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/ui";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold text-cocoa-700 dark:text-cream-100">
          Your Wishlist 💛
        </h1>
      </Reveal>

      {products.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-7xl">🤍</p>
          <p className="mt-5 font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">
            Nothing saved yet
          </p>
          <p className="mt-2 text-cocoa-500/80 dark:text-cream-300/70">
            Tap the heart on any bake to keep it here for later.
          </p>
          <Link href="/shop" className="mt-6 inline-block rounded-full bg-gold-500 px-8 py-3.5 font-bold text-white transition hover:bg-gold-600">
            Find something to love →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
