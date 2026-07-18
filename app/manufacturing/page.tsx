import type { Metadata } from "next";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Manufacturing Process",
  description:
    "Inside the GoldenCrumb bakery — 14-hour dough rests, stone ovens, nitrogen-flush packing and a dedicated gluten-free facility.",
};

const STEPS = [
  ["01", "🌾", "Sourcing", "Wheat from contracted Punjab farms, butter from a single Gujarat dairy, Belgian chocolate flown in weekly. Every lot is sampled before it enters the bakery."],
  ["02", "⏳", "The 14-hour rest", "Dough is mixed, folded and rested overnight in temperature-controlled chambers. Hydrated flour and relaxed gluten are the secret to the clean snap."],
  ["03", "🔥", "Stone-oven bake", "A 210°C start for lift, easing to 160°C to dry the crumb evenly. Curves tuned per recipe, monitored by both sensors and bakers' noses."],
  ["04", "🧪", "Quality lab", "Moisture, water activity, texture analysis and — for the GF wing — sub-10 ppm gluten testing. Each batch's certificate is printed on the sleeve."],
  ["05", "❄️", "Cooling tunnels", "Biscuits cool on open racks for 40 minutes. Packing warm biscuits traps steam and murders crunch. We don't murder crunch."],
  ["06", "📦", "Nitrogen crisp-lock", "Packs are flushed with food-grade nitrogen and heat-sealed. Your biscuits travel in a private, oxygen-free first-class cabin."],
] as const;

const CERTS = ["FSSAI Licensed", "ISO 22000:2018", "HACCP Certified", "GMP Compliant", "Halal Certified", "GF Facility <10 ppm"];

export default function ManufacturingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading
        eyebrow="Our Craft"
        title="Slow baking, obsessive science"
        sub="Six stages between a wheat field and your chai — none of them rushed."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map(([num, emoji, title, text], i) => (
          <Reveal key={num} delay={i * 0.07}>
            <div className="glass group relative h-full overflow-hidden rounded-4xl p-7 shadow-soft transition hover:-translate-y-2 hover:shadow-lift">
              <span className="absolute -right-3 -top-6 font-display text-8xl font-bold text-gold-400/15 transition group-hover:text-gold-400/30">
                {num}
              </span>
              <span className="text-4xl">{emoji}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-500/85 dark:text-cream-300/75">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <div className="glass rounded-5xl p-10 text-center shadow-soft">
          <h2 className="font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">Certifications & audits</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {CERTS.map((c) => (
              <span key={c} className="rounded-full border border-gold-400/40 bg-gold-400/10 px-5 py-2.5 text-sm font-bold text-gold-600 dark:text-gold-300">
                ✔ {c}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-cocoa-500/80 dark:text-cream-300/70">
            Our facility is audited twice a year by independent food-safety bodies, and we run
            factory visits for wholesale partners every first Saturday. Want a tour? Ask us on WhatsApp.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
