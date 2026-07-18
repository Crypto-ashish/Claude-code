import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GoldenCrumb Bakery collects, uses and protects your data.",
};

const SECTIONS: [string, string][] = [
  [
    "Information we collect",
    "We collect the details you share when ordering — name, contact number, email, delivery address and, if requested, GSTIN — plus order history and site preferences (like your wishlist and theme) stored on your device. Payment card details never touch our servers; they are processed entirely by Razorpay, a PCI-DSS Level 1 certified gateway.",
  ],
  [
    "How we use it",
    "To bake, pack, ship and support your orders; to send transactional email/SMS updates; and — only if you opt in — our weekly newsletter. We use aggregated, anonymised analytics to understand which bakes India loves most.",
  ],
  [
    "What we never do",
    "We never sell your personal data. We never share it with third parties beyond our delivery and payment partners, and only the minimum they need to deliver your order.",
  ],
  [
    "Cookies (the digital kind)",
    "We use essential cookies for your cart and preferences, and lightweight analytics cookies to improve the site. You can clear them any time in your browser; your cart is stored locally on your device.",
  ],
  [
    "Your rights",
    "Email privacy@goldencrumb.example.com to access, correct or delete your data, or to export your order history. We respond within 7 working days.",
  ],
  [
    "Contact",
    "Data Protection Officer, GoldenCrumb Bakery Pvt. Ltd., Industrial Area-A, Ludhiana, Punjab 141003 · privacy@goldencrumb.example.com. Last updated: July 2026.",
  ],
];

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" sub="Short version: your data is yours. We just use it to get biscuits to your door." />
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
