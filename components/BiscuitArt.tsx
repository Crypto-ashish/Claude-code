import React from "react";
import type { Product } from "@/lib/products";

/**
 * Procedural SVG artwork for products. In production these render slots are
 * swapped for Cloudinary-hosted photography via next/image; the SVG keeps the
 * design fully self-contained and instant-loading.
 */
export default function BiscuitArt({
  art,
  className = "",
  seed = 7,
}: {
  art: Product["art"];
  className?: string;
  seed?: number;
}) {
  const { base, accent, variant } = art;
  const chips = Array.from({ length: 9 }, (_, i) => {
    const a = (i * 137.5 + seed * 31) % 360;
    const r = 14 + ((i * 53 + seed * 17) % 26);
    return {
      cx: 60 + r * Math.cos((a * Math.PI) / 180),
      cy: 60 + r * Math.sin((a * Math.PI) / 180),
      rr: 3.2 + ((i * 29) % 10) / 4,
    };
  });

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Biscuit illustration"
    >
      <defs>
        <radialGradient id={`g-${base.slice(1)}-${variant}`} cx="38%" cy="32%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="45%" stopColor={base} />
          <stop offset="100%" stopColor={accent} />
        </radialGradient>
      </defs>

      {variant === "round" && (
        <>
          <circle cx="60" cy="60" r="52" fill={`url(#g-${base.slice(1)}-${variant})`} />
          <circle cx="60" cy="60" r="52" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          {chips.map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r={c.rr} fill={accent} opacity="0.85" />
          ))}
        </>
      )}

      {variant === "square" && (
        <>
          <rect x="12" y="12" width="96" height="96" rx="20" fill={`url(#g-${base.slice(1)}-${variant})`} />
          <rect x="12" y="12" width="96" height="96" rx="20" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <circle key={`${r}-${c}`} cx={36 + c * 24} cy={36 + r * 24} r="3.4" fill={accent} opacity="0.8" />
            )),
          )}
        </>
      )}

      {variant === "heart" && (
        <>
          <path
            d="M60 104 C24 78 12 56 22 38 C30 24 50 24 60 40 C70 24 90 24 98 38 C108 56 96 78 60 104 Z"
            fill={`url(#g-${base.slice(1)}-${variant})`}
            stroke={accent}
            strokeOpacity="0.45"
            strokeWidth="3"
          />
          {chips.slice(0, 5).map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy - 4} r={c.rr * 0.8} fill={accent} opacity="0.8" />
          ))}
        </>
      )}

      {variant === "bar" && (
        <>
          <rect x="18" y="30" width="84" height="60" rx="14" fill={`url(#g-${base.slice(1)}-${variant})`} />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={34 + i * 18} y1="36" x2={30 + i * 18} y2="84" stroke={accent} strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
          ))}
          <path d="M18 44 q42 -14 84 0" fill="none" stroke="#3E2415" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
        </>
      )}

      {variant === "box" && (
        <>
          <rect x="16" y="34" width="88" height="70" rx="10" fill={`url(#g-${base.slice(1)}-${variant})`} />
          <rect x="10" y="24" width="100" height="20" rx="8" fill={accent} />
          <rect x="54" y="24" width="12" height="80" fill="#F3E2B8" />
          <circle cx="60" cy="24" r="9" fill="none" stroke="#F3E2B8" strokeWidth="4" />
          <circle cx="49" cy="18" r="7" fill="none" stroke="#F3E2B8" strokeWidth="4" />
          <circle cx="71" cy="18" r="7" fill="none" stroke="#F3E2B8" strokeWidth="4" />
        </>
      )}
    </svg>
  );
}
