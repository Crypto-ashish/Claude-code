# 🍪 GoldenCrumb — Premium Biscuit E-Commerce

A premium, animated, mobile-first D2C bakery storefront built with **Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion**. Warm cream-and-gold design language, glassmorphism cards, and a fully client-side shopping flow (cart, wishlist, coupons, checkout with Razorpay, OTP login, order history, admin console).

## ✨ Highlights

**Animated home page** — rotating-biscuit preloader, canvas crumb/flour particle field, drifting biscuits, steam animation, mouse-tilt hero card, CSS-3D rotating gift box, parallax scrolling, scroll-triggered reveals, count-up statistics, infinite product marquee, auto-playing review carousel, Instagram grid, newsletter, floating WhatsApp button, dark mode, smooth page transitions.

**Commerce** — advanced search (navbar overlay + shop page), category/price/GF/veg filters, sorting, quick-view modal, wishlist, recently viewed, weight variants, quantity selection, stock indicators, coupons (`WELCOME10`, `CRUMB150`, `FESTIVE20`), frequently-bought-together bundles, related products, image zoom + drag-to-spin gallery, nutrition/ingredients/FSSAI tabs, veg & gluten-free badges.

**Checkout** — Razorpay Checkout integration (UPI/cards/net banking/wallets) with demo fallback, Cash on Delivery, GST invoice capture, shipping calculation, free-shipping threshold, order confirmation page.

**Accounts** — OTP-style login (demo), order history with tracking timeline, invoice download, one-click reorder, saved addresses, profile.

**Admin console** (`/admin`, demo data) — analytics with animated sales chart, product/inventory table, orders, customers, coupons, blog and banner management.

**Pages** — Home, Shop (5 categories), Product detail, Cart, Checkout, Order confirmation, About, Manufacturing Process, Blog + posts, Contact + store locator, Dealer Registration, Bulk Orders, FAQ, Privacy Policy, Terms, Wishlist, Account, Admin, custom 404.

**SEO & performance** — per-page metadata, Open Graph, JSON-LD (Bakery + Product schema), `sitemap.xml`, `robots.txt`, system-optimised fonts with `display=swap`, zero image payload (procedural SVG product art), `prefers-reduced-motion` support, mobile-first responsive layouts.

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## 🔑 Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay key. When unset, checkout runs in demo mode (simulated payment). |

## 🏗️ Architecture notes

- `lib/products.ts` / `lib/content.ts` — typed catalog & content; swap for Firebase/Supabase collections without touching the UI.
- `lib/store.tsx` — cart/wishlist/recently-viewed/theme context persisted to `localStorage`.
- `components/BiscuitArt.tsx` — procedural SVG product renders; replace with Cloudinary `next/image` photography in production.
- The CSS-3D hero gift box is isolated in `Hero.tsx` so a Three.js scene can drop in behind the same slot.
- Deploy on **Vercel** — no server dependencies required.
