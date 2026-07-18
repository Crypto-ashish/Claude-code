import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/content";
import { Reveal } from "@/components/ui";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-8 pt-28 sm:px-6">
      <Reveal>
        <Link href="/blog" className="text-sm font-semibold text-gold-600 hover:underline">
          ← All stories
        </Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-gold-500">
          {post.category} · {post.readMins} min read ·{" "}
          {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-cocoa-700 dark:text-cream-100 sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-8 grid h-52 place-items-center rounded-4xl bg-gradient-to-br from-gold-300/30 via-cream-200/50 to-caramel/20 text-8xl dark:from-cocoa-600 dark:via-cocoa-700 dark:to-cocoa-800">
          {post.emoji}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="prose-lg mt-10 space-y-6 leading-relaxed text-cocoa-600/95 dark:text-cream-200/85">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">Keep reading</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="glass group rounded-3xl p-5 shadow-soft transition hover:-translate-y-1">
              <span className="text-3xl">{p.emoji}</span>
              <p className="mt-2 text-sm font-bold leading-snug text-cocoa-700 group-hover:text-gold-600 dark:text-cream-100">
                {p.title}
              </p>
            </Link>
          ))}
        </div>
      </Reveal>
    </article>
  );
}
