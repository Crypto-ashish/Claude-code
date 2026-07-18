import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, SectionHeading } from "@/components/ui";
import { StatsSection } from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The GoldenCrumb story — a family stone-oven bakery in Ludhiana that grew into one of India's most loved D2C biscuit brands.",
};

const TIMELINE = [
  ["2014", "Bébé's stone oven", "Our founder's grandmother's recipes and a single stone oven in Ludhiana. First customer: the neighbourhood chai stall."],
  ["2017", "The first 100 stores", "Word travelled with the tiffin boxes. We reached 100 kirana stores across Punjab, still baking every biscuit by hand."],
  ["2020", "Going D2C", "Lockdown closed our counters, so we shipped nationwide instead. 40,000 orders in the first year — and the nitrogen-flush crisp-lock pack was born."],
  ["2022", "Dedicated gluten-free wing", "A physically separate GF facility, lab-tested below 10 ppm — because 'mostly gluten-free' isn't a thing."],
  ["2024", "50,000 happy customers", "Cafés, gyms, corporates and families across 800+ pin codes. Still small-batch. Still stone ovens."],
  ["2026", "The next chapter", "A carbon-neutral bakery roof, farmer-direct wheat contracts, and flavours we can't talk about yet. 🤫"],
] as const;

const TEAM = [
  ["Simran Gill", "Founder & Head Baker", "👩‍🍳"],
  ["Arjun Mehta", "Master of Chocolate", "🍫"],
  ["Dr. Nisha Rao", "Nutrition Lead", "🥼"],
  ["Gurpreet Bajwa", "Wholesale Partnerships", "🤝"],
] as const;

export default function AboutPage() {
  return (
    <div className="pb-8 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Story"
          title="From one stone oven to 800 pin codes"
          sub="GoldenCrumb began with a grandmother's recipe book and a stubborn belief: biscuits taste better when nobody hurries them."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <span className="absolute bottom-4 left-[19px] top-4 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-caramel sm:left-1/2 sm:-translate-x-1/2" />
          {TIMELINE.map(([year, title, text], i) => (
            <Reveal key={year} delay={0.05 * i}>
              <div className={`relative mb-10 flex gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right sm:flex-row-reverse"}`}>
                <span className={`z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-extrabold text-white shadow-glow sm:absolute sm:top-0 ${i % 2 ? "sm:-left-5" : "sm:-right-5"}`}>
                  {year.slice(2)}
                </span>
                <div className="glass flex-1 rounded-3xl p-5 shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-600">{year}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cocoa-500/85 dark:text-cream-300/75">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <StatsSection />
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="The People" title="Bakers, nerds & chocolate obsessives" />
        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {TEAM.map(([name, role, emoji], i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div className="glass group rounded-3xl p-6 text-center shadow-soft transition hover:-translate-y-2 hover:shadow-lift">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold-300/40 to-caramel/30 text-4xl transition group-hover:scale-110">
                  {emoji}
                </span>
                <h3 className="mt-4 font-display font-bold text-cocoa-700 dark:text-cream-100">{name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-600">{role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <div className="light-leak glass mx-auto max-w-3xl rounded-5xl p-10">
            <h2 className="font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100 sm:text-3xl">
              Taste the difference twelve years makes
            </h2>
            <Link href="/shop" className="btn-shine mt-6 inline-block rounded-full bg-gold-500 px-8 py-3.5 font-bold text-white transition hover:bg-gold-600">
              Shop bestsellers →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
