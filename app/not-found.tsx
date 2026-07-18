import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 pt-24 text-center">
      <div>
        <p className="text-7xl">🍪💔</p>
        <h1 className="mt-6 font-display text-4xl font-bold text-cocoa-700 dark:text-cream-100">
          That page crumbled away
        </h1>
        <p className="mt-3 text-cocoa-500/80 dark:text-cream-300/70">
          The link you followed is stale. Fresh batches this way —
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-3.5 font-bold text-white transition hover:bg-gold-600"
        >
          Back to the bakery
        </Link>
      </div>
    </div>
  );
}
