"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui";

const TIERS = [
  ["50–199 units", "12% off", "Free branded ribbon"],
  ["200–499 units", "18% off", "+ Custom note cards"],
  ["500–999 units", "24% off", "+ Logo-printed sleeves"],
  ["1000+ units", "Let's talk", "Fully bespoke packaging"],
] as const;

export default function BulkOrdersPage() {
  const [sent, setSent] = useState(false);
  const input =
    "w-full rounded-2xl border border-gold-400/30 bg-cream-50/80 px-4 py-3 text-sm text-cocoa-700 outline-none transition focus:border-gold-500 dark:bg-cocoa-800/60 dark:text-cream-100";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading
        eyebrow="Bulk & Corporate"
        title="Gifting that gets remembered"
        sub="Diwali hampers for 2,000 employees or weekly cookie supply for your café chain — we bake at scale without baking like it."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map(([qty, off, perk], i) => (
          <Reveal key={qty} delay={i * 0.08}>
            <div className={`glass h-full rounded-3xl p-6 text-center shadow-soft transition hover:-translate-y-2 ${i === 3 ? "ring-2 ring-gold-500" : ""}`}>
              <p className="text-xs font-bold uppercase tracking-widest text-cocoa-500/70 dark:text-cream-300/60">{qty}</p>
              <p className="mt-2 font-display text-3xl font-bold text-gradient-gold">{off}</p>
              <p className="mt-2 text-sm font-semibold text-cocoa-600 dark:text-cream-200">{perk}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12" delay={0.1}>
        <div className="glass mx-auto max-w-3xl rounded-4xl p-7 shadow-soft sm:p-9">
          {sent ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 text-center">
              <p className="text-6xl">📦</p>
              <h2 className="mt-4 font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">Enquiry sent!</h2>
              <p className="mt-2 text-cocoa-500/80 dark:text-cream-300/70">
                A bulk-order specialist will share a custom quote within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <h2 className="font-display text-xl font-bold text-cocoa-700 dark:text-cream-100 sm:col-span-2">
                Request a bulk quote
              </h2>
              <input required placeholder="Company / your name" className={input} />
              <input required type="tel" pattern="[0-9]{10}" placeholder="Mobile" className={input} />
              <input required type="email" placeholder="Email" className={input} />
              <select className={input} defaultValue="">
                <option value="" disabled>Occasion</option>
                <option>Corporate gifting (festive)</option>
                <option>Employee welcome kits</option>
                <option>Café / HoReCa supply</option>
                <option>Wedding / event favours</option>
                <option>Other</option>
              </select>
              <input required placeholder="Approx. quantity (units)" className={input} />
              <input type="date" aria-label="Needed by date" className={input} />
              <textarea placeholder="Products you're interested in, budget per unit, customisation…" rows={4} className={`${input} sm:col-span-2`} />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="btn-shine rounded-full bg-gold-500 py-3.5 font-bold text-white transition hover:bg-gold-600 sm:col-span-2"
              >
                Get my quote →
              </motion.button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
