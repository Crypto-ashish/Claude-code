import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content";
import { Reveal, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog & Recipes",
  description:
    "Baking science, ingredient stories and five-minute recipes from the GoldenCrumb kitchen.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
      <SectionHeading
        eyebrow="The Crumb Journal"
        title="Stories from the oven"
        sub="Baking science, ingredient deep-dives and recipes that start with opening one of our boxes."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${post.slug}`}
              className="glass group flex h-full flex-col overflow-hidden rounded-4xl shadow-soft transition hover:-translate-y-2 hover:shadow-lift"
            >
              <div className="grid h-40 place-items-center bg-gradient-to-br from-gold-300/30 via-cream-200/50 to-caramel/20 text-6xl transition duration-500 group-hover:scale-105 dark:from-cocoa-600 dark:via-cocoa-700 dark:to-cocoa-800">
                {post.emoji}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600">
                  {post.category} · {post.readMins} min read
                </p>
                <h2 className="mt-2 font-display text-lg font-bold leading-snug text-cocoa-700 transition group-hover:text-gold-600 dark:text-cream-100">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa-500/80 dark:text-cream-300/70">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-cocoa-400 dark:text-cream-300/50">
                  {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
