"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "@/components/ui";

const STORES = [
  ["GoldenCrumb Flagship", "Sarabha Nagar Market, Ludhiana, Punjab", "10 AM – 9 PM"],
  ["GoldenCrumb Express", "Sector 17 Plaza, Chandigarh", "11 AM – 10 PM"],
  ["Partner Counter — Brew & Crumb Café", "Khan Market, New Delhi", "9 AM – 11 PM"],
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const input =
    "w-full rounded-2xl border border-gold-400/30 bg-cream-50/80 px-4 py-3 text-sm text-cocoa-700 outline-none transition focus:border-gold-500 dark:bg-cocoa-800/60 dark:text-cream-100";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading
        eyebrow="Say Hello"
        title="We answer faster than biscuits disappear"
        sub="Questions, wholesale enquiries, or just want to tell us which flavour changed your life — we're listening."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="glass rounded-4xl p-7 shadow-soft sm:p-9">
            {sent ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-16 text-center">
                <p className="text-6xl">💌</p>
                <h2 className="mt-4 font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">Message received!</h2>
                <p className="mt-2 text-cocoa-500/80 dark:text-cream-300/70">We reply within one working day — usually much faster.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <input required placeholder="Your name" className={input} />
                <input required type="email" placeholder="Email" className={input} />
                <input placeholder="Phone (optional)" className={input} />
                <select className={input} defaultValue="general">
                  <option value="general">General question</option>
                  <option value="order">Order support</option>
                  <option value="wholesale">Wholesale / dealer</option>
                  <option value="gifting">Corporate gifting</option>
                  <option value="press">Press & collabs</option>
                </select>
                <textarea required placeholder="Your message…" rows={5} className={`${input} sm:col-span-2`} />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-shine rounded-full bg-gold-500 py-3.5 font-bold text-white transition hover:bg-gold-600 sm:col-span-2"
                >
                  Send message →
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-cocoa-700 dark:text-cream-100">Reach us directly</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-cocoa-600 dark:text-cream-200">
                <li>💬 WhatsApp: <a className="font-semibold text-gold-600" href="https://wa.me/919876500000">+91 98765 00000</a></li>
                <li>📞 Phone: +91 161 460 0000 (10 AM – 7 PM)</li>
                <li>✉️ hello@goldencrumb.example.com</li>
                <li>🏭 GoldenCrumb Bakery, Industrial Area-A, Ludhiana, Punjab 141003</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div id="stores" className="glass rounded-3xl p-6 shadow-soft">
              <h3 className="font-display font-bold text-cocoa-700 dark:text-cream-100">🗺️ Store locator</h3>
              <ul className="mt-3 space-y-4">
                {STORES.map(([name, addr, hours]) => (
                  <li key={name} className="border-l-2 border-gold-400/50 pl-3">
                    <p className="text-sm font-bold text-cocoa-700 dark:text-cream-100">{name}</p>
                    <p className="text-xs text-cocoa-500/80 dark:text-cream-300/70">{addr}</p>
                    <p className="text-xs font-semibold text-gold-600">{hours}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
