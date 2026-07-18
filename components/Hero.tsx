"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import BiscuitArt from "./BiscuitArt";

/* Floating biscuits that drift across the hero. */
const DRIFTERS = [
  { base: "#DDA341", accent: "#8A5A36", variant: "round", size: 64, top: "16%", dur: 30, delay: 0 },
  { base: "#5C3A21", accent: "#2B1810", variant: "round", size: 48, top: "34%", dur: 38, delay: -14 },
  { base: "#E3C083", accent: "#8A5A36", variant: "square", size: 54, top: "58%", dur: 34, delay: -6 },
  { base: "#A8B36A", accent: "#C4708A", variant: "heart", size: 42, top: "72%", dur: 42, delay: -22 },
  { base: "#C99A54", accent: "#6B4226", variant: "round", size: 36, top: "8%", dur: 46, delay: -30 },
] as const;

/* Canvas particle field: falling crumbs + floating flour. */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1 + Math.random() * 2.6,
      vy: 0.0004 + Math.random() * 0.0012,
      vx: (Math.random() - 0.5) * 0.0005,
      flour: Math.random() > 0.55,
      wob: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.wob += 0.015;
        p.y += p.flour ? -p.vy * 0.4 : p.vy;
        p.x += p.vx + Math.sin(p.wob) * 0.0004;
        if (p.y > 1.05) p.y = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.x < -0.05) p.x = 1.05;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = p.flour
          ? "rgba(255, 250, 238, 0.55)"
          : "rgba(138, 90, 54, 0.4)";
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

function Steam({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex gap-2 ${className}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-14 w-1.5 animate-steam rounded-full bg-gradient-to-t from-transparent via-cream-50/80 to-transparent blur-[2px]"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
    </div>
  );
}

/* CSS-3D rotating premium gift box (structured so a Three.js scene can drop in later). */
function GiftBox3D() {
  const faces = [
    "rotateY(0deg) translateZ(70px)",
    "rotateY(90deg) translateZ(70px)",
    "rotateY(180deg) translateZ(70px)",
    "rotateY(-90deg) translateZ(70px)",
    "rotateX(90deg) translateZ(70px)",
    "rotateX(-90deg) translateZ(70px)",
  ];
  return (
    <div className="scene-3d" aria-hidden>
      <div className="box-3d relative h-[140px] w-[140px]">
        {faces.map((t, i) => (
          <div
            key={i}
            className="box-face border border-gold-300/50 shadow-inner"
            style={{
              transform: t,
              background:
                i === 4
                  ? "linear-gradient(135deg, #E8C878, #C8933B)"
                  : "linear-gradient(135deg, #6B4226 0%, #54331D 60%, #3E2415 100%)",
            }}
          >
            {i < 4 && (
              <div className="grid h-full w-full place-items-center">
                <div className="text-center">
                  <span className="block text-3xl">🍪</span>
                  <span className="mt-1 block font-display text-[10px] font-bold tracking-[0.25em] text-gold-300">
                    GOLDENCRUMB
                  </span>
                </div>
              </div>
            )}
            <span className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-gold-400/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 120, damping: 18 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Animated bakery backdrop */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <div className="light-leak absolute inset-0" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, rgba(221,178,90,0.5) 0 2px, transparent 3px), radial-gradient(circle at 75% 60%, rgba(176,107,47,0.4) 0 2px, transparent 3px), radial-gradient(circle at 50% 85%, rgba(138,90,54,0.35) 0 1.5px, transparent 2.5px)",
            backgroundSize: "140px 140px, 180px 180px, 110px 110px",
          }}
        />
      </motion.div>

      <Particles />

      {/* Drifting biscuits */}
      {DRIFTERS.map((d, i) => (
        <div
          key={i}
          className="pointer-events-none absolute left-0 animate-drift opacity-70"
          style={{ top: d.top, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}
          aria-hidden
        >
          <div style={{ width: d.size, height: d.size }}>
            <BiscuitArt
              art={{ base: d.base, accent: d.accent, variant: d.variant }}
              className="h-full w-full drop-shadow-md"
              seed={i * 13 + 3}
            />
          </div>
        </div>
      ))}

      <motion.div
        style={{ y: yMid, opacity }}
        className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-20"
      >
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold-600 dark:text-gold-300"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-gold-500" />
            Baked fresh at 6 AM daily
          </motion.p>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-cocoa-700 dark:text-cream-100 sm:text-6xl lg:text-7xl">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Biscuits worth
            </motion.span>
            <motion.span
              className="text-gradient-gold block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              slowing down for.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cocoa-500/90 dark:text-cream-300/80 sm:text-lg lg:mx-0"
          >
            Small-batch bakery biscuits, chunky premium cookies, certified
            gluten-free bakes and protein-packed snacks — stone-oven baked in
            Punjab, delivered crisp across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Link href="/shop">
              <motion.span
                whileHover={{ scale: 1.05, boxShadow: "0 0 46px rgba(221,178,90,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="btn-shine inline-block rounded-full bg-gradient-to-r from-gold-500 to-caramel px-8 py-4 font-bold text-white shadow-glow"
              >
                Shop the Bakery 🍪
              </motion.span>
            </Link>
            <Link href="/shop?category=gift-packs">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="glass inline-block rounded-full px-8 py-4 font-bold text-cocoa-700 transition hover:border-gold-400/60 dark:text-cream-100"
              >
                Explore Gift Packs
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-cocoa-500/80 dark:text-cream-300/70 lg:justify-start"
          >
            <span>✔ FSSAI Certified</span>
            <span>✔ No Palm Oil</span>
            <span>✔ 220,000+ orders delivered</span>
            <span>✔ COD available</span>
          </motion.div>
        </div>

        {/* Visual: hero cookie + steam + 3D box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
          style={{ perspective: 900 }}
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY }}
            className="glass relative rounded-5xl p-8 shadow-lift"
          >
            <Steam className="absolute left-1/2 top-2 -translate-x-1/2" />
            <div className="relative mx-auto w-fit">
              <div className="absolute inset-0 scale-90 rounded-full bg-gold-400/30 blur-3xl" />
              <BiscuitArt
                art={{ base: "#5C3A21", accent: "#2B1810", variant: "round" }}
                className="relative h-56 w-56 animate-float drop-shadow-2xl sm:h-64 sm:w-64"
                seed={21}
              />
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">This week's star</p>
                <p className="font-display text-xl font-bold text-cocoa-700 dark:text-cream-100">
                  Triple Chocolate Chunk
                </p>
                <p className="text-sm text-cocoa-500/80 dark:text-cream-300/70">₹349 · Box of 4 · ★ 4.9</p>
              </div>
              <Link
                href="/product/triple-chocolate-chunk-cookies"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-500 text-xl text-white shadow-glow transition hover:rotate-12 hover:bg-gold-600"
                aria-label="View Triple Chocolate Chunk Cookies"
              >
                →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="absolute -bottom-14 -left-10 hidden sm:block"
          >
            <GiftBox3D />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cocoa-500/60 dark:text-cream-300/50"
        aria-hidden
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path strokeLinecap="round" d="M12 4v16m0 0 6-6m-6 6-6-6" /></svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
