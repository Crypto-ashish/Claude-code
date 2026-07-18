"use client";

import React from "react";
import { motion } from "framer-motion";

/** Scroll-triggered reveal wrapper. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = true,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-500">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold text-cocoa-700 dark:text-cream-100 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-2xl text-cocoa-500/80 dark:text-cream-300/70 ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold-500 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill={i <= Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
          <path d="M10 1.8l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.4l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.8z" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

export function Badge({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "green" | "red" | "cocoa";
}) {
  const tones = {
    gold: "bg-gold-400/15 text-gold-600 dark:text-gold-300 border-gold-400/30",
    green: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    red: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
    cocoa: "bg-cocoa-500/10 text-cocoa-600 dark:text-cream-200 border-cocoa-500/25",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Small veg/non-veg FSSAI-style marker. */
export function VegMark({ veg }: { veg: boolean }) {
  const color = veg ? "#0f8a3c" : "#a3272c";
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border-2 bg-white"
      style={{ borderColor: color }}
      title={veg ? "100% Vegetarian" : "Contains egg"}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    </span>
  );
}
