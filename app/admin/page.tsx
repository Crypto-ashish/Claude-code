"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, categoryName } from "@/lib/products";
import { COUPONS, BLOG_POSTS } from "@/lib/content";
import { inr } from "@/lib/store";
import BiscuitArt from "@/components/BiscuitArt";

type Section = "analytics" | "products" | "orders" | "customers" | "coupons" | "blog" | "banners";

const NAV: { key: Section; label: string; icon: string }[] = [
  { key: "analytics", label: "Analytics", icon: "📊" },
  { key: "products", label: "Products & Inventory", icon: "🍪" },
  { key: "orders", label: "Orders", icon: "📦" },
  { key: "customers", label: "Customers", icon: "👥" },
  { key: "coupons", label: "Coupons", icon: "🎟️" },
  { key: "blog", label: "Blog", icon: "✍️" },
  { key: "banners", label: "Banners", icon: "🖼️" },
];

const MOCK_ORDERS = [
  ["GC1A2B3C", "Ananya Sharma", "Mumbai", 948, "Shipped"],
  ["GC4D5E6F", "Rajdeep Singh", "Ludhiana", 2799, "Baking"],
  ["GC7G8H9I", "Meera Iyer", "Bengaluru", 729, "Delivered"],
  ["GCJ1K2L3", "Kabir Malhotra", "Delhi", 1799, "Confirmed"],
  ["GCM4N5O6", "Sofia D'Souza", "Goa", 549, "Delivered"],
] as const;

const MOCK_CUSTOMERS = [
  ["Ananya Sharma", "Mumbai", 14, 12480],
  ["Rajdeep Singh (Wholesale)", "Ludhiana", 52, 184200],
  ["Meera Iyer", "Bengaluru", 9, 6120],
  ["FitCore Gym (Bulk)", "Pune", 26, 96400],
] as const;

const SALES = [42, 55, 48, 62, 71, 66, 80, 74, 88, 95, 90, 104];
const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export default function AdminPage() {
  const [section, setSection] = useState<Section>("analytics");
  const max = Math.max(...SALES);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-500">Admin Console · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-cocoa-700 dark:text-cream-100">Bakery Dashboard</h1>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
          ● Store online · 3 bakers on shift
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <nav className="glass h-fit rounded-3xl p-3">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setSection(n.key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                section === n.key
                  ? "bg-gold-500 text-white shadow-glow"
                  : "text-cocoa-600 hover:bg-gold-400/10 dark:text-cream-200"
              }`}
            >
              <span>{n.icon}</span> {n.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {section === "analytics" && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Today's revenue", "₹48,230", "+18% vs yesterday"],
                    ["Orders today", "312", "+9%"],
                    ["Avg. order value", "₹641", "+4%"],
                    ["Low-stock SKUs", "3", "needs attention"],
                  ].map(([label, value, delta]) => (
                    <div key={label} className="glass rounded-3xl p-5 shadow-soft">
                      <p className="text-xs font-semibold uppercase tracking-widest text-cocoa-500/70 dark:text-cream-300/60">{label}</p>
                      <p className="mt-2 font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">{value}</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-600">{delta}</p>
                    </div>
                  ))}
                </div>

                <div className="glass rounded-3xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Sales report — last 12 months (₹ lakh)</h2>
                  <div className="mt-6 flex h-48 items-end gap-2">
                    {SALES.map((v, i) => (
                      <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
                        <span className="text-[10px] font-bold text-gold-600 opacity-0 transition group-hover:opacity-100">{v}</span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(v / max) * 100}%` }}
                          transition={{ delay: i * 0.05, duration: 0.5 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-gold-500 to-gold-300 transition group-hover:from-caramel"
                        />
                        <span className="text-[10px] font-semibold text-cocoa-500/70 dark:text-cream-300/60">{MONTHS[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-3xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Top sellers this month</h2>
                  <ul className="mt-4 space-y-3">
                    {PRODUCTS.filter((p) => p.bestseller).map((p) => (
                      <li key={p.slug} className="flex items-center gap-3">
                        <BiscuitArt art={p.art} className="h-10 w-10" />
                        <span className="flex-1 text-sm font-semibold text-cocoa-600 dark:text-cream-200">{p.name}</span>
                        <div className="h-2 w-1/3 overflow-hidden rounded-full bg-gold-400/15">
                          <div className="h-full rounded-full bg-gold-500" style={{ width: `${p.rating * 18}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {section === "products" && (
              <div className="glass overflow-x-auto rounded-3xl shadow-soft">
                <div className="flex items-center justify-between p-5">
                  <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Products & Inventory</h2>
                  <button className="rounded-full bg-gold-500 px-5 py-2 text-xs font-bold text-white hover:bg-gold-600">+ Add product</button>
                </div>
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-gold-400/10 text-left text-xs uppercase tracking-wider text-cocoa-500 dark:text-cream-300">
                    <tr>
                      <th className="px-5 py-3">Product</th>
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3">Price</th>
                      <th className="px-5 py-3">Stock</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((p) => (
                      <tr key={p.slug} className="border-t border-gold-400/10">
                        <td className="flex items-center gap-3 px-5 py-3 font-semibold text-cocoa-700 dark:text-cream-100">
                          <BiscuitArt art={p.art} className="h-9 w-9" /> {p.name}
                        </td>
                        <td className="px-5 py-3 text-cocoa-500 dark:text-cream-300">{categoryName(p.category)}</td>
                        <td className="px-5 py-3 font-semibold">{inr(p.weights[0].price)}</td>
                        <td className="px-5 py-3">{p.stock}</td>
                        <td className="px-5 py-3">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${p.stock < 60 ? "bg-rose-500/10 text-rose-600" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}`}>
                            {p.stock < 60 ? "Low stock" : "In stock"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section === "orders" && (
              <div className="glass overflow-x-auto rounded-3xl shadow-soft">
                <h2 className="p-5 font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Recent orders</h2>
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-gold-400/10 text-left text-xs uppercase tracking-wider text-cocoa-500 dark:text-cream-300">
                    <tr>
                      <th className="px-5 py-3">Order</th>
                      <th className="px-5 py-3">Customer</th>
                      <th className="px-5 py-3">City</th>
                      <th className="px-5 py-3">Total</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map(([id, name, city, total, status]) => (
                      <tr key={id} className="border-t border-gold-400/10">
                        <td className="px-5 py-3 font-mono text-xs font-bold text-gold-600">{id}</td>
                        <td className="px-5 py-3 font-semibold text-cocoa-700 dark:text-cream-100">{name}</td>
                        <td className="px-5 py-3 text-cocoa-500 dark:text-cream-300">{city}</td>
                        <td className="px-5 py-3 font-semibold">{inr(total)}</td>
                        <td className="px-5 py-3">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                            status === "Delivered" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : status === "Shipped" ? "bg-sky-500/10 text-sky-700 dark:text-sky-300"
                            : "bg-gold-400/15 text-gold-600"
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section === "customers" && (
              <div className="glass overflow-x-auto rounded-3xl shadow-soft">
                <h2 className="p-5 font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Customers</h2>
                <table className="w-full min-w-[520px] text-sm">
                  <thead className="bg-gold-400/10 text-left text-xs uppercase tracking-wider text-cocoa-500 dark:text-cream-300">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">City</th>
                      <th className="px-5 py-3">Orders</th>
                      <th className="px-5 py-3">Lifetime value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_CUSTOMERS.map(([name, city, orders, ltv]) => (
                      <tr key={name} className="border-t border-gold-400/10">
                        <td className="px-5 py-3 font-semibold text-cocoa-700 dark:text-cream-100">{name}</td>
                        <td className="px-5 py-3 text-cocoa-500 dark:text-cream-300">{city}</td>
                        <td className="px-5 py-3">{orders}</td>
                        <td className="px-5 py-3 font-semibold">{inr(ltv)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section === "coupons" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {COUPONS.map((c) => (
                  <div key={c.code} className="glass rounded-3xl border-2 border-dashed border-gold-400/40 p-5">
                    <p className="font-mono text-lg font-extrabold text-gold-600">{c.code}</p>
                    <p className="mt-1 text-sm font-semibold text-cocoa-600 dark:text-cream-200">{c.label}</p>
                    <p className="mt-1 text-xs text-cocoa-500/70 dark:text-cream-300/60">Min order {inr(c.minOrder)}</p>
                    <span className="mt-3 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Active</span>
                  </div>
                ))}
                <button className="glass grid min-h-[140px] place-items-center rounded-3xl border-2 border-dashed border-gold-400/40 font-bold text-gold-600 hover:bg-gold-400/10">
                  + Create coupon
                </button>
              </div>
            )}

            {section === "blog" && (
              <div className="space-y-4">
                {BLOG_POSTS.map((p) => (
                  <div key={p.slug} className="glass flex items-center gap-4 rounded-3xl p-5 shadow-soft">
                    <span className="text-3xl">{p.emoji}</span>
                    <div className="flex-1">
                      <p className="font-display font-bold text-cocoa-700 dark:text-cream-100">{p.title}</p>
                      <p className="text-xs text-cocoa-500/70 dark:text-cream-300/60">{p.category} · {new Date(p.date).toLocaleDateString("en-IN")}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Published</span>
                  </div>
                ))}
              </div>
            )}

            {section === "banners" && (
              <div className="space-y-4">
                {[
                  ["Homepage hero", "Biscuits worth slowing down for", "Live"],
                  ["Shop banner", "WELCOME10 · CRUMB150 · Free shipping", "Live"],
                  ["Festive strip", "Diwali hampers pre-order", "Scheduled"],
                ].map(([slot, copy, status]) => (
                  <div key={slot} className="glass flex items-center gap-4 rounded-3xl p-5 shadow-soft">
                    <span className="text-3xl">🖼️</span>
                    <div className="flex-1">
                      <p className="font-display font-bold text-cocoa-700 dark:text-cream-100">{slot}</p>
                      <p className="text-xs text-cocoa-500/70 dark:text-cream-300/60">{copy}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${status === "Live" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-gold-400/15 text-gold-600"}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
