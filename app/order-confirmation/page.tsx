"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function Confirmation() {
  const params = useSearchParams();
  const id = params.get("id") ?? "GC-ORDER";

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-32 text-center sm:px-6">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-500/15 text-5xl"
      >
        ✅
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 font-display text-4xl font-bold text-cocoa-700 dark:text-cream-100"
      >
        Order confirmed! 🎉
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <p className="mt-4 text-cocoa-500/90 dark:text-cream-300/80">
          Order <span className="font-bold text-gold-600">{id}</span> is with our
          bakers. A confirmation email and SMS are on their way; your invoice
          will be available in your dashboard.
        </p>
        <div className="glass mx-auto mt-8 max-w-md rounded-3xl p-6 text-left text-sm text-cocoa-600 dark:text-cream-200">
          <p className="font-bold">What happens next</p>
          <ol className="mt-3 space-y-2">
            <li>🧑‍🍳 Baked fresh within 24 hours</li>
            <li>📦 Nitrogen-flush packed for crispness</li>
            <li>🚚 Shipped with live tracking (SMS + email)</li>
            <li>🍪 Devoured — usually within minutes of arrival</li>
          </ol>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/account" className="rounded-full border-2 border-gold-500 px-7 py-3 font-bold text-gold-600 transition hover:bg-gold-500/10">
            Track order
          </Link>
          <Link href="/shop" className="rounded-full bg-gold-500 px-7 py-3 font-bold text-white transition hover:bg-gold-600">
            Keep shopping →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <Confirmation />
    </Suspense>
  );
}
