"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { COUPONS } from "@/lib/content";
import { useStore, inr } from "@/lib/store";
import { Reveal } from "@/components/ui";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

/** Set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env to enable live Razorpay checkout. */
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";

export default function CheckoutPage() {
  const router = useRouter();
  const { resolvedCart, subtotal, clearCart, showToast } = useStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Punjab",
    pincode: "",
    gstin: "",
  });
  const [wantsGst, setWantsGst] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<(typeof COUPONS)[number] | null>(null);
  const [couponError, setCouponError] = useState("");
  const [payMethod, setPayMethod] = useState<"razorpay" | "cod">("razorpay");
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const codFee = payMethod === "cod" ? 40 : 0;
  const discount = coupon
    ? coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value
    : 0;
  const total = Math.max(0, subtotal - discount) + shipping + codFee;

  const applyCoupon = () => {
    const c = COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase(),
    );
    if (!c) return setCouponError("That code doesn't look right.");
    if (subtotal < c.minOrder)
      return setCouponError(`Needs a minimum order of ${inr(c.minOrder)}.`);
    setCoupon(c);
    setCouponError("");
    showToast(`Coupon ${c.code} applied 🎉`);
  };

  const completeOrder = (paymentId: string) => {
    const orderId = "GC" + Date.now().toString(36).toUpperCase();
    try {
      const orders = JSON.parse(localStorage.getItem("gc-orders") ?? "[]");
      orders.unshift({
        id: orderId,
        date: new Date().toISOString(),
        items: resolvedCart.map((i) => ({
          name: i.product.name,
          weight: i.weightLabel,
          qty: i.qty,
          price: i.price,
        })),
        total,
        payment: paymentId,
        status: "Confirmed",
        gstin: wantsGst ? form.gstin : null,
      });
      localStorage.setItem("gc-orders", JSON.stringify(orders));
    } catch {
      /* storage unavailable */
    }
    clearCart();
    router.push(`/order-confirmation?id=${orderId}`);
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (resolvedCart.length === 0) return;
    setPlacing(true);

    if (payMethod === "cod") {
      window.setTimeout(() => completeOrder("COD"), 900);
      return;
    }

    if (RAZORPAY_KEY && window.Razorpay) {
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY,
        amount: total * 100,
        currency: "INR",
        name: "GoldenCrumb Bakery",
        description: `${resolvedCart.length} item(s)`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#C8933B" },
        handler: (res: { razorpay_payment_id: string }) =>
          completeOrder(res.razorpay_payment_id),
        modal: { ondismiss: () => setPlacing(false) },
      });
      rzp.open();
    } else {
      // Demo mode: no key configured — simulate a successful payment.
      window.setTimeout(() => completeOrder("DEMO-" + Date.now()), 1200);
    }
  };

  const input =
    "w-full rounded-2xl border border-gold-400/30 bg-cream-50/80 px-4 py-3 text-sm text-cocoa-700 outline-none transition focus:border-gold-500 dark:bg-cocoa-800/60 dark:text-cream-100";

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Reveal>
        <h1 className="font-display text-4xl font-bold text-cocoa-700 dark:text-cream-100">Checkout</h1>
      </Reveal>

      {resolvedCart.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-6xl">🧺</p>
          <p className="mt-4 font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">Your basket is empty</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-gold-500 px-7 py-3 font-bold text-white hover:bg-gold-600">
            Back to shop
          </Link>
        </div>
      ) : (
        <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            <section className="glass rounded-3xl p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">1 · Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input required type="tel" pattern="[0-9]{10}" placeholder="Mobile (10 digits)" className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input required type="email" placeholder="Email for invoice & updates" className={`${input} sm:col-span-2`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <p className="mt-3 text-xs text-cocoa-500/70 dark:text-cream-300/60">
                📧 Order confirmation by email · 📱 delivery updates by SMS & WhatsApp
              </p>
            </section>

            <section className="glass rounded-3xl p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">2 · Delivery address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input required placeholder="House / street / landmark" className={`${input} sm:col-span-2`} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <input required placeholder="City" className={input} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <input required pattern="[0-9]{6}" placeholder="PIN code" className={input} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-semibold text-cocoa-600 dark:text-cream-200">
                <input type="checkbox" checked={wantsGst} onChange={(e) => setWantsGst(e.target.checked)} className="h-4 w-4 accent-gold-500" />
                I need a GST invoice
              </label>
              {wantsGst && (
                <input placeholder="GSTIN (e.g. 03ABCDE1234F1Z5)" className={`${input} mt-3`} value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} />
              )}
            </section>

            <section className="glass rounded-3xl p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">3 · Payment</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPayMethod("razorpay")}
                  className={`rounded-2xl border-2 p-4 text-left transition ${payMethod === "razorpay" ? "border-gold-500 bg-gold-400/10" : "border-gold-400/25 hover:border-gold-400/50"}`}
                >
                  <p className="font-bold text-cocoa-700 dark:text-cream-100">Pay Online 🔒</p>
                  <p className="mt-1 text-xs text-cocoa-500/80 dark:text-cream-300/70">
                    UPI · Cards · Net Banking · Wallets — via Razorpay
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setPayMethod("cod")}
                  className={`rounded-2xl border-2 p-4 text-left transition ${payMethod === "cod" ? "border-gold-500 bg-gold-400/10" : "border-gold-400/25 hover:border-gold-400/50"}`}
                >
                  <p className="font-bold text-cocoa-700 dark:text-cream-100">Cash on Delivery 💵</p>
                  <p className="mt-1 text-xs text-cocoa-500/80 dark:text-cream-300/70">
                    ₹40 handling fee · up to ₹2,000
                  </p>
                </button>
              </div>
            </section>
          </div>

          <aside className="glass h-fit rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">Order summary</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {resolvedCart.map((i) => (
                <li key={`${i.slug}-${i.weightLabel}`} className="flex justify-between gap-2">
                  <span className="text-cocoa-600 dark:text-cream-200">
                    {i.product.name} <span className="text-cocoa-400">× {i.qty}</span>
                  </span>
                  <span className="font-semibold">{inr(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>

            {/* Coupon */}
            <div className="mt-5">
              {coupon ? (
                <div className="flex items-center justify-between rounded-2xl bg-emerald-500/10 px-4 py-2.5 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  <span>✔ {coupon.code} applied</span>
                  <button type="button" onClick={() => setCoupon(null)} className="text-xs underline">Remove</button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className={input}
                    />
                    <button type="button" onClick={applyCoupon} className="rounded-2xl bg-cocoa-600 px-4 text-sm font-bold text-cream-50 transition hover:bg-gold-500">
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="mt-2 text-xs font-semibold text-rose-500">{couponError}</p>}
                  <p className="mt-2 text-[11px] text-cocoa-500/70 dark:text-cream-300/60">
                    Try WELCOME10 · CRUMB150 · FESTIVE20
                  </p>
                </>
              )}
            </div>

            <dl className="mt-5 space-y-2.5 border-t border-gold-400/20 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-cocoa-500 dark:text-cream-300">Subtotal</dt><dd className="font-bold">{inr(subtotal)}</dd></div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600"><dt>Coupon discount</dt><dd className="font-bold">−{inr(discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-cocoa-500 dark:text-cream-300">Shipping</dt><dd className="font-bold">{shipping === 0 ? "FREE" : inr(shipping)}</dd></div>
              {codFee > 0 && (
                <div className="flex justify-between"><dt className="text-cocoa-500 dark:text-cream-300">COD fee</dt><dd className="font-bold">{inr(codFee)}</dd></div>
              )}
              <div className="flex justify-between border-t border-gold-400/20 pt-3 text-base">
                <dt className="font-bold text-cocoa-700 dark:text-cream-100">Total</dt>
                <dd className="font-extrabold text-cocoa-700 dark:text-cream-100">{inr(total)}</dd>
              </div>
            </dl>

            <motion.button
              whileHover={{ scale: placing ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={placing}
              className="btn-shine mt-6 w-full rounded-full bg-gradient-to-r from-gold-500 to-caramel py-4 font-bold text-white shadow-glow disabled:opacity-60"
            >
              {placing
                ? "Placing order…"
                : payMethod === "cod"
                  ? `Place COD Order · ${inr(total)}`
                  : `Pay Securely · ${inr(total)}`}
            </motion.button>
            <p className="mt-3 text-center text-[11px] text-cocoa-500/70 dark:text-cream-300/60">
              By placing this order you agree to our{" "}
              <Link href="/terms" className="underline">Terms</Link> &{" "}
              <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
          </aside>
        </form>
      )}
    </div>
  );
}
