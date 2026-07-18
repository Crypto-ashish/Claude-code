import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { BLOG_POSTS } from "@/lib/content";

const BASE = "https://goldencrumb.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/shop",
    "/about",
    "/manufacturing",
    "/blog",
    "/contact",
    "/dealer-registration",
    "/bulk-orders",
    "/faq",
    "/privacy-policy",
    "/terms",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const products = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const posts = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...products, ...posts];
}
