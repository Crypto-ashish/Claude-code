import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use and sale for GoldenCrumb Bakery.",
};

const SECTIONS: [string, string][] = [
  [
    "1. General",
    "By using goldencrumb.example.com you agree to these terms. Products are sold by GoldenCrumb Bakery Pvt. Ltd. (FSSAI Lic. 10023456789012), Ludhiana, Punjab. We may update these terms; the version published at the time of your order applies.",
  ],
  [
    "2. Orders & pricing",
    "All prices are in INR and inclusive of GST. An order is confirmed once payment succeeds (or COD is verified by OTP). We reserve the right to cancel orders due to stock, pricing errors or delivery constraints — with a full refund within 5–7 working days.",
  ],
  [
    "3. Payments",
    "Online payments are processed by Razorpay (UPI, cards, net banking, wallets). Cash on Delivery is available up to ₹2,000 with a ₹40 handling fee. GST invoices are issued when a valid GSTIN is provided at checkout.",
  ],
  [
    "4. Shipping",
    "Dispatch within 24 hours of baking; delivery 2–6 working days depending on location. Free shipping above ₹999. Risk passes to you on delivery; please record unboxing for damage claims.",
  ],
  [
    "5. Returns & refunds",
    "Being perishable food, products cannot be returned. If items arrive damaged or below standard, share photos within 48 hours for a free replacement or full refund — no need to send anything back.",
  ],
  [
    "6. Coupons & offers",
    "One coupon per order, not combinable, no cash value. We may withdraw offers at any time. Abuse (multiple accounts, resale) may lead to order cancellation.",
  ],
  [
    "7. Liability & jurisdiction",
    "Our liability is limited to the value of the order. Allergen information is printed on every pack — please read it. Disputes are subject to the courts of Ludhiana, Punjab. Last updated: July 2026.",
  ],
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading eyebrow="Legal" title="Terms & Conditions" />
      <div className="mt-12 space-y-6">
        {SECTIONS.map(([title, body]) => (
          <section key={title} className="glass rounded-3xl p-6 shadow-soft">
            <h2 className="font-display text-lg font-bold text-cocoa-700 dark:text-cream-100">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-cocoa-500/90 dark:text-cream-300/80">{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
