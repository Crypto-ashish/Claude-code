"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/content";
import { SectionHeading } from "@/components/ui";

export default function FaqPage() {
  const topics = Array.from(new Set(FAQS.map((f) => f.topic)));
  const [topic, setTopic] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(0);

  const list = FAQS.filter((f) => topic === "All" || f.topic === topic);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading
        eyebrow="Help Centre"
        title="Frequently asked questions"
        sub="Can't find your answer? The WhatsApp button is right there — a human replies in minutes."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {["All", ...topics].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTopic(t);
              setOpen(0);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              topic === t
                ? "border-gold-500 bg-gold-500 text-white"
                : "border-gold-400/40 text-cocoa-600 hover:bg-gold-400/10 dark:text-cream-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {list.map((f, i) => (
          <div key={f.q} className="glass overflow-hidden rounded-3xl shadow-soft">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display font-bold text-cocoa-700 dark:text-cream-100">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-400/15 text-lg font-bold text-gold-600"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-cocoa-500/90 dark:text-cream-300/80">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
