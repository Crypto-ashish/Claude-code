"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui";

const PERKS = [
  ["📈", "Trade margins", "Category-leading dealer margins with quarterly volume bonuses."],
  ["🚛", "Reliable supply", "Weekly dispatch, 99.2% fill rate, freshness-dated stock only."],
  ["🖼️", "Branding support", "Free counter displays, shelf-talkers and launch sampling kits."],
  ["🧑‍💼", "Dedicated manager", "One WhatsApp number for orders, claims and market feedback."],
] as const;

export default function DealerRegistrationPage() {
  const [sent, setSent] = useState(false);
  const input =
    "w-full rounded-2xl border border-gold-400/30 bg-cream-50/80 px-4 py-3 text-sm text-cocoa-700 outline-none transition focus:border-gold-500 dark:bg-cocoa-800/60 dark:text-cream-100";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading
        eyebrow="Partner With Us"
        title="Stock the biscuits people cross town for"
        sub="600+ retailers, cafés and gyms already partner with GoldenCrumb. Registration takes two minutes; our team responds within one working day."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid content-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {PERKS.map(([emoji, title, text], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="glass flex gap-4 rounded-3xl p-5 shadow-soft">
                <span className="text-3xl">{emoji}</span>
                <div>
                  <h3 className="font-display font-bold text-cocoa-700 dark:text-cream-100">{title}</h3>
                  <p className="mt-1 text-sm text-cocoa-500/85 dark:text-cream-300/75">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="glass rounded-4xl p-7 shadow-soft sm:p-9">
            {sent ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-16 text-center">
                <p className="text-6xl">🤝</p>
                <h2 className="mt-4 font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">Application received!</h2>
                <p className="mt-2 text-cocoa-500/80 dark:text-cream-300/70">
                  Our partnerships team will call you within one working day with trade pricing and a sample box.
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
                  Dealer application
                </h2>
                <input required placeholder="Business name" className={input} />
                <select className={input} defaultValue="">
                  <option value="" disabled>Business type</option>
                  <option>Retail store / supermarket</option>
                  <option>Café / restaurant</option>
                  <option>Gym / fitness studio</option>
                  <option>Distributor / super-stockist</option>
                  <option>Online reseller</option>
                </select>
                <input required placeholder="Contact person" className={input} />
                <input required type="tel" pattern="[0-9]{10}" placeholder="Mobile (10 digits)" className={input} />
                <input required type="email" placeholder="Email" className={input} />
                <input required placeholder="City & state" className={input} />
                <input placeholder="GSTIN (optional)" className={input} />
                <select className={input} defaultValue="">
                  <option value="" disabled>Expected monthly volume</option>
                  <option>Under ₹25,000</option>
                  <option>₹25,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹5,00,000</option>
                  <option>Above ₹5,00,000</option>
                </select>
                <textarea placeholder="Tell us about your outlet(s)…" rows={3} className={`${input} sm:col-span-2`} />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-shine rounded-full bg-gold-500 py-3.5 font-bold text-white transition hover:bg-gold-600 sm:col-span-2"
                >
                  Apply for dealership →
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
