import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop — Bakery Biscuits, Cookies, Gluten-Free & Gifts",
  description:
    "Browse the full GoldenCrumb range: bakery biscuits, premium cookies, certified gluten-free bakes, healthy snacks and gift hampers.",
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopClient />
    </Suspense>
  );
}
