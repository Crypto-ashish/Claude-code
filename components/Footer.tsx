import Link from "next/link";

const COLS = [
  {
    title: "Shop",
    links: [
      ["Bakery Biscuits", "/shop?category=bakery-biscuits"],
      ["Premium Cookies", "/shop?category=premium-cookies"],
      ["Gluten-Free", "/shop?category=gluten-free"],
      ["Healthy Snacks", "/shop?category=healthy-snacks"],
      ["Gift Packs", "/shop?category=gift-packs"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Manufacturing Process", "/manufacturing"],
      ["Blog & Recipes", "/blog"],
      ["Contact", "/contact"],
      ["Store Locator", "/contact#stores"],
    ],
  },
  {
    title: "Partners",
    links: [
      ["Dealer Registration", "/dealer-registration"],
      ["Bulk Orders", "/bulk-orders"],
      ["Corporate Gifting", "/bulk-orders"],
      ["Café Partnerships", "/dealer-registration"],
    ],
  },
  {
    title: "Support",
    links: [
      ["FAQ", "/faq"],
      ["Track Order", "/account"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-gold-400/20 bg-cream-200/60 dark:bg-cocoa-800/40">
      <div className="light-leak pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-xl">🍪</span>
              <span className="font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">
                Golden<span className="text-gradient-gold">Crumb</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cocoa-500/80 dark:text-cream-300/70">
              Small-batch biscuits and cookies, slow-baked in stone ovens since
              2014. FSSAI-certified bakery, Ludhiana, Punjab.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                ["Instagram", "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.44 1.44 0 1 1-2.9 0 1.44 1.44 0 0 1 2.9 0z"],
                ["YouTube", "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.5v-7L15.8 12l-6.3 3.5z"],
                ["Facebook", "M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z"],
              ].map(([label, d]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/30 text-cocoa-500 transition hover:-translate-y-0.5 hover:bg-gold-400/15 hover:text-gold-600 dark:text-cream-300"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-300">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-cocoa-500/90 transition hover:text-gold-600 dark:text-cream-300/80 dark:hover:text-gold-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold-400/20 pt-6 text-xs text-cocoa-500/70 dark:text-cream-300/60 sm:flex-row">
          <p>© {new Date().getFullYear()} GoldenCrumb Bakery Pvt. Ltd. · FSSAI Lic. 10023456789012</p>
          <p className="flex items-center gap-3">
            <span>🔒 Secured by Razorpay</span>
            <span>UPI · Cards · NetBanking · COD</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
