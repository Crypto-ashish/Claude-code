"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore, inr } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import BiscuitArt from "./BiscuitArt";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/manufacturing", label: "Our Craft" },
  { href: "/blog", label: "Blog" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/contact", label: "Contact" },
];

const LANGS = ["EN", "हिं", "ਪੰ"];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, dark, toggleDark, setCartOpen, wishlist } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase())),
      ).slice(0, 5)
    : [];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-soft py-2" : "bg-transparent py-4"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <motion.span
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-xl shadow-glow"
            >
              🍪
            </motion.span>
            <span className="font-display text-xl font-bold tracking-tight text-cocoa-700 dark:text-cream-100">
              Golden<span className="text-gradient-gold">Crumb</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-gold-600 dark:hover:text-gold-300 ${
                    pathname === l.href
                      ? "text-gold-600 dark:text-gold-300"
                      : "text-cocoa-600 dark:text-cream-200"
                  }`}
                >
                  {l.label}
                  {pathname === l.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setLang((l) => (l + 1) % LANGS.length)}
              className="hidden h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold text-cocoa-600 transition hover:bg-gold-400/15 dark:text-cream-200 sm:flex"
              title="Language — English / Hindi / Punjabi"
            >
              {LANGS[lang]}
            </button>

            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
            </IconBtn>

            <IconBtn label="Toggle dark mode" onClick={toggleDark}>
              {dark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="12" r="4" /><path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" strokeLinejoin="round" /></svg>
              )}
            </IconBtn>

            <Link href="/wishlist" className="relative hidden sm:block">
              <IconBtn label="Wishlist" as="span">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M12 21C7 16.5 3 13.2 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.1-4 7.4-9 11.9Z" strokeLinejoin="round" /></svg>
              </IconBtn>
              {wishlist.length > 0 && <CountBubble n={wishlist.length} />}
            </Link>

            <Link href="/account">
              <IconBtn label="Account" as="span">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" strokeLinecap="round" /></svg>
              </IconBtn>
            </Link>

            <button onClick={() => setCartOpen(true)} className="relative" aria-label="Open cart">
              <IconBtn label="Cart" as="span">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M5 8h14l-1.3 11.1A2 2 0 0 1 15.7 21H8.3a2 2 0 0 1-2-1.9L5 8Z" strokeLinejoin="round" /><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" strokeLinecap="round" /></svg>
              </IconBtn>
              <AnimatePresence>
                {cartCount > 0 && <CountBubble key={cartCount} n={cartCount} pop />}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-full text-cocoa-600 transition hover:bg-gold-400/15 dark:text-cream-200 lg:hidden"
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                {menuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />}
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="glass-strong overflow-hidden lg:hidden"
            >
              <ul className="space-y-1 px-6 py-4">
                {NAV_LINKS.concat([
                  { href: "/dealer-registration", label: "Become a Dealer" },
                  { href: "/faq", label: "FAQ" },
                ]).map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={l.href}
                      className="block rounded-xl px-3 py-2.5 font-medium text-cocoa-600 transition hover:bg-gold-400/15 dark:text-cream-200"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cocoa-900/50 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="glass-strong mx-auto mt-24 w-[92%] max-w-xl rounded-3xl p-4 shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 rounded-2xl border border-gold-400/30 bg-cream-50/70 px-4 py-3 dark:bg-cocoa-800/60">
                <span className="text-gold-500">🔎</span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(`/shop?q=${encodeURIComponent(query)}`);
                      setSearchOpen(false);
                    }
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  placeholder="Search cookies, gluten-free, gifts…"
                  className="w-full bg-transparent text-cocoa-700 outline-none placeholder:text-cocoa-400/60 dark:text-cream-100"
                />
                <button
                  className="text-xs font-semibold text-gold-600"
                  onClick={() => setSearchOpen(false)}
                >
                  ESC
                </button>
              </div>
              {results.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/product/${p.slug}`}
                        className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-gold-400/10"
                        onClick={() => setSearchOpen(false)}
                      >
                        <BiscuitArt art={p.art} className="h-10 w-10" />
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-cocoa-700 dark:text-cream-100">{p.name}</span>
                          <span className="text-xs text-cocoa-500/70 dark:text-cream-300/60">{p.tagline}</span>
                        </span>
                        <span className="text-sm font-bold text-gold-600">{inr(p.weights[0].price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {query && results.length === 0 && (
                <p className="p-4 text-center text-sm text-cocoa-500/70 dark:text-cream-300/60">
                  No crumbs found for “{query}” — try “chocolate” or “gluten-free”.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  as,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  as?: "span";
}) {
  const cls =
    "grid h-9 w-9 place-items-center rounded-full text-cocoa-600 transition hover:bg-gold-400/15 hover:text-gold-600 dark:text-cream-200 dark:hover:text-gold-300";
  if (as === "span") return <span className={cls}>{children}</span>;
  return (
    <button onClick={onClick} aria-label={label} className={cls}>
      {children}
    </button>
  );
}

function CountBubble({ n, pop }: { n: number; pop?: boolean }) {
  return (
    <motion.span
      initial={pop ? { scale: 0.4 } : false}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="absolute -right-0.5 -top-0.5 grid h-4.5 min-w-[18px] place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-white shadow"
    >
      {n}
    </motion.span>
  );
}
