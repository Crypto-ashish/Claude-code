"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore, inr } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/ui";

interface StoredOrder {
  id: string;
  date: string;
  items: { name: string; weight: string; qty: number; price: number }[];
  total: number;
  payment: string;
  status: string;
  gstin: string | null;
}

type Tab = "orders" | "addresses" | "wishlist" | "profile";

const input =
  "w-full rounded-2xl border border-gold-400/30 bg-cream-50/80 px-4 py-3 text-sm text-cocoa-700 outline-none transition focus:border-gold-500 dark:bg-cocoa-800/60 dark:text-cream-100";

export default function AccountPage() {
  const { wishlist, addToCart, showToast } = useStore();
  const [user, setUser] = useState<{ phone: string; name: string } | null>(null);
  const [phone, setPhone] = useState("");
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState("");
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("gc-user");
      if (u) setUser(JSON.parse(u));
      setOrders(JSON.parse(localStorage.getItem("gc-orders") ?? "[]"));
    } catch {
      /* fresh visitor */
    }
    setHydrated(true);
  }, []);

  const login = () => {
    const u = { phone, name: "Biscuit Lover" };
    setUser(u);
    localStorage.setItem("gc-user", JSON.stringify(u));
    showToast("Welcome back! 🍪");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("gc-user");
  };

  const downloadInvoice = (order: StoredOrder) => {
    const lines = [
      "GOLDENCRUMB BAKERY PVT. LTD.",
      "Industrial Area-A, Ludhiana, Punjab 141003",
      "FSSAI Lic. 10023456789012 · GSTIN 03AABCG0000A1Z5",
      "----------------------------------------",
      `TAX INVOICE · Order ${order.id}`,
      `Date: ${new Date(order.date).toLocaleDateString("en-IN")}`,
      order.gstin ? `Buyer GSTIN: ${order.gstin}` : "",
      "----------------------------------------",
      ...order.items.map(
        (i) => `${i.name} (${i.weight}) x${i.qty}  ₹${i.price * i.qty}`,
      ),
      "----------------------------------------",
      `TOTAL (incl. GST): ₹${order.total}`,
      `Payment ref: ${order.payment}`,
      "Thank you for choosing GoldenCrumb!",
    ].filter(Boolean);
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `invoice-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const reorder = (order: StoredOrder) => {
    order.items.forEach((item) => {
      const p = PRODUCTS.find((pr) => pr.name === item.name);
      if (p) addToCart(p.slug, item.weight, item.qty);
    });
  };

  if (!hydrated) return <div className="min-h-screen" />;

  /* ---------- Login / OTP ---------- */
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 pb-16 pt-32 sm:px-6">
        <Reveal>
          <div className="glass rounded-4xl p-8 shadow-lift">
            <p className="text-center text-5xl">🍪</p>
            <h1 className="mt-4 text-center font-display text-2xl font-bold text-cocoa-700 dark:text-cream-100">
              {otpStage ? "Enter the OTP" : "Login or Register"}
            </h1>
            <p className="mt-2 text-center text-sm text-cocoa-500/80 dark:text-cream-300/70">
              {otpStage
                ? `We sent a 6-digit code to +91 ${phone} (demo: any 6 digits work)`
                : "One number, zero passwords — we'll text you an OTP."}
            </p>

            {otpStage ? (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (otp.length === 6) login();
                }}
              >
                <input
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="● ● ● ● ● ●"
                  className={`${input} text-center text-2xl tracking-[0.5em]`}
                  inputMode="numeric"
                />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={otp.length !== 6}
                  className="btn-shine w-full rounded-full bg-gold-500 py-3.5 font-bold text-white transition hover:bg-gold-600 disabled:opacity-50"
                >
                  Verify & Login →
                </motion.button>
                <button type="button" onClick={() => setOtpStage(false)} className="w-full text-center text-sm font-semibold text-gold-600 hover:underline">
                  ← Change number
                </button>
              </form>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (/^\d{10}$/.test(phone)) setOtpStage(true);
                }}
              >
                <div className="flex items-center gap-2 rounded-2xl border border-gold-400/30 bg-cream-50/80 px-4 dark:bg-cocoa-800/60">
                  <span className="text-sm font-bold text-cocoa-500 dark:text-cream-300">+91</span>
                  <input
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="w-full bg-transparent py-3 text-sm outline-none dark:text-cream-100"
                    inputMode="numeric"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={phone.length !== 10}
                  className="btn-shine w-full rounded-full bg-gold-500 py-3.5 font-bold text-white transition hover:bg-gold-600 disabled:opacity-50"
                >
                  Send OTP 📲
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    );
  }

  /* ---------- Dashboard ---------- */
  const wishProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-cocoa-700 dark:text-cream-100 sm:text-4xl">
              Hi, {user.name} 👋
            </h1>
            <p className="mt-1 text-sm text-cocoa-500/80 dark:text-cream-300/70">+91 {user.phone}</p>
          </div>
          <button onClick={logout} className="rounded-full border border-gold-400/40 px-5 py-2 text-sm font-bold text-cocoa-600 transition hover:bg-gold-400/10 dark:text-cream-200">
            Logout
          </button>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["orders", "📦 Orders"],
            ["addresses", "🏠 Addresses"],
            ["wishlist", "💛 Wishlist"],
            ["profile", "👤 Profile"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              tab === key
                ? "border-gold-500 bg-gold-500 text-white"
                : "border-gold-400/40 text-cocoa-600 hover:bg-gold-400/10 dark:text-cream-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          {tab === "orders" &&
            (orders.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <p className="text-5xl">🧾</p>
                <p className="mt-4 font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">No orders yet</p>
                <Link href="/shop" className="mt-5 inline-block rounded-full bg-gold-500 px-7 py-3 font-bold text-white hover:bg-gold-600">
                  Place your first order →
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {orders.map((o) => (
                  <li key={o.id} className="glass rounded-3xl p-6 shadow-soft">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-display font-bold text-cocoa-700 dark:text-cream-100">Order {o.id}</p>
                        <p className="text-xs text-cocoa-500/70 dark:text-cream-300/60">
                          {new Date(o.date).toLocaleString("en-IN")} · {o.payment === "COD" ? "Cash on Delivery" : `Paid · ${o.payment}`}
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        ● {o.status}
                      </span>
                    </div>

                    {/* Track order progress */}
                    <div className="mt-5 flex items-center gap-1">
                      {["Confirmed", "Baking", "Shipped", "Delivered"].map((step, i) => (
                        <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
                          <div className={`h-2 w-full rounded-full ${i === 0 ? "bg-emerald-500" : "bg-gold-400/20"}`} />
                          <span className="text-[10px] font-semibold text-cocoa-500/70 dark:text-cream-300/60">{step}</span>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-4 space-y-1 text-sm text-cocoa-600 dark:text-cream-200">
                      {o.items.map((i, idx) => (
                        <li key={idx}>
                          {i.name} ({i.weight}) × {i.qty} — <span className="font-semibold">{inr(i.price * i.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gold-400/20 pt-4">
                      <p className="font-extrabold text-cocoa-700 dark:text-cream-100">Total: {inr(o.total)}</p>
                      <div className="flex gap-2">
                        <button onClick={() => downloadInvoice(o)} className="rounded-full border border-gold-400/40 px-4 py-2 text-xs font-bold text-cocoa-600 transition hover:bg-gold-400/10 dark:text-cream-200">
                          ⬇ Invoice
                        </button>
                        <button onClick={() => reorder(o)} className="rounded-full bg-gold-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-gold-600">
                          ↻ Reorder
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ))}

          {tab === "addresses" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="glass rounded-3xl p-6 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-widest text-gold-600">Default · Home</p>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-600 dark:text-cream-200">
                  Biscuit Lover<br />42 Cookie Lane, Model Town<br />Ludhiana, Punjab 141002<br />+91 {user.phone}
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-full border border-gold-400/40 px-4 py-1.5 text-xs font-bold text-cocoa-600 dark:text-cream-200">Edit</button>
                  <button className="rounded-full border border-rose-400/40 px-4 py-1.5 text-xs font-bold text-rose-500">Delete</button>
                </div>
              </div>
              <button className="glass grid min-h-[160px] place-items-center rounded-3xl border-2 border-dashed border-gold-400/40 p-6 font-bold text-gold-600 transition hover:bg-gold-400/10">
                + Add new address
              </button>
            </div>
          )}

          {tab === "wishlist" &&
            (wishProducts.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <p className="text-5xl">🤍</p>
                <p className="mt-4 font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">Wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {wishProducts.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            ))}

          {tab === "profile" && (
            <div className="glass max-w-lg rounded-3xl p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Profile details</h2>
              <div className="mt-4 space-y-4">
                <input defaultValue={user.name} className={input} aria-label="Name" />
                <input defaultValue={`+91 ${user.phone}`} disabled className={`${input} opacity-60`} aria-label="Phone" />
                <input placeholder="Email for invoices" className={input} aria-label="Email" />
                <button
                  onClick={() => showToast("Profile saved ✔")}
                  className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-gold-600"
                >
                  Save changes
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
