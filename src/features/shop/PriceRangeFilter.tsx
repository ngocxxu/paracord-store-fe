"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useState, useTransition } from "react";
import { PRICE_MAX } from "./data";

interface PriceRangeFilterProps {
  lang: string;
  basePath: string;
  minPrice: number;
  maxPrice: number;
  priceRangeLabel: { min: string; max: string; from: string; to: string; apply: string };
}

function valueFromClientX(trackRef: React.RefObject<HTMLDivElement | null>, clientX: number): number {
  const el = trackRef.current;
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  return Math.round(pct * PRICE_MAX);
}

export function PriceRangeFilter({
  basePath,
  minPrice: initialMin,
  maxPrice: initialMax,
  priceRangeLabel,
}: PriceRangeFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateRange = useCallback(
    (newMin: number, newMax: number) => {
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      if (newMin > 0) params.set("minPrice", String(newMin));
      else params.delete("minPrice");
      if (newMax < PRICE_MAX) params.set("maxPrice", String(newMax));
      else params.delete("maxPrice");
      params.delete("page");
      const q = params.toString();
      startTransition(() => {
        router.replace(q ? `${pathname}?${q}` : pathname);
      });
    },
    [pathname, router]
  );

  const clamp = (n: number) => Math.min(PRICE_MAX, Math.max(0, n));

  const handleThumbDrag = useCallback(
    (kind: "min" | "max", clientX: number) => {
      const apply = (x: number) => {
        const v = valueFromClientX(trackRef, x);
        if (kind === "min") setMin((m) => Math.min(Math.max(v, 0), max));
        else setMax((m) => Math.max(Math.min(v, PRICE_MAX), min));
      };
      apply(clientX);
      const onMove = (e: MouseEvent) => apply(e.clientX);
      const onMoveTouch = (e: TouchEvent) => {
        if (e.touches.length) apply(e.touches[0].clientX);
      };
      const cleanup = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", cleanup);
        document.removeEventListener("touchmove", onMoveTouch);
        document.removeEventListener("touchend", cleanup);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", cleanup);
      document.addEventListener("touchmove", onMoveTouch, { passive: true });
      document.addEventListener("touchend", cleanup);
    },
    [min, max]
  );

  const handleFromBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = clamp(Number(e.target.value) || 0);
    setMin(Math.min(v, max));
  };

  const handleToBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = clamp(Number(e.target.value) ?? PRICE_MAX);
    setMax(Math.max(v, min));
  };

  const handleApply = () => {
    updateRange(min, max);
  };

  const minPct = (min / PRICE_MAX) * 100;
  const maxPct = (max / PRICE_MAX) * 100;
  const fillWidth = maxPct - minPct;

  const thumb =
    "absolute top-1/2 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab flex-col items-center rounded-full border-2 border-white bg-brand-accent touch-none active:cursor-grabbing";
  const thumbLabel =
    "absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-brand-bg-card px-1.5 py-0.5 text-xs font-medium text-brand-text-high shadow";

  return (
    <div className="mt-3 flex flex-col gap-5">
      <div ref={trackRef} className="relative h-8 touch-none pt-12">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-border" aria-hidden />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-accent"
          style={{ left: `${minPct}%`, width: `${fillWidth}%` }}
          aria-hidden
        />
        <button
          type="button"
          className={thumb}
          style={{ left: `${minPct}%` }}
          aria-label="Minimum price"
          onMouseDown={(e) => {
            e.preventDefault();
            handleThumbDrag("min", e.clientX);
          }}
          onTouchStart={(e) => {
            if (e.touches.length) handleThumbDrag("min", e.touches[0].clientX);
          }}
        >
          <span className={thumbLabel}>${min}</span>
        </button>
        <button
          type="button"
          className={thumb}
          style={{ left: `${maxPct}%` }}
          aria-label="Maximum price"
          onMouseDown={(e) => {
            e.preventDefault();
            handleThumbDrag("max", e.clientX);
          }}
          onTouchStart={(e) => {
            if (e.touches.length) handleThumbDrag("max", e.touches[0].clientX);
          }}
        >
          <span className={thumbLabel}>{max >= PRICE_MAX ? priceRangeLabel.max : `$${max}`}</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-brand-text-medium">{priceRangeLabel.from}</span>
          <input
            type="number"
            min={0}
            max={PRICE_MAX}
            value={min}
            onChange={(e) => setMin(clamp(Number(e.target.value) || 0))}
            onBlur={handleFromBlur}
            className="h-10 rounded-md border border-brand-border bg-brand-bg-card px-3 text-sm text-brand-text-high outline-none transition-colors placeholder:text-brand-text-muted focus:border-brand-accent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-label={priceRangeLabel.from}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs font-medium text-brand-text-medium">{priceRangeLabel.to}</span>
          <input
            type="number"
            min={0}
            max={PRICE_MAX}
            value={max}
            onChange={(e) => setMax(clamp(Number(e.target.value) ?? PRICE_MAX))}
            onBlur={handleToBlur}
            className="h-10 rounded-md border border-brand-border bg-brand-bg-card px-3 text-sm text-brand-text-high outline-none transition-colors placeholder:text-brand-text-muted focus:border-brand-accent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-label={priceRangeLabel.to}
          />
        </label>
      </div>
      <button
        type="button"
        onClick={handleApply}
        className="w-full rounded-md bg-brand-accent py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg-primary"
      >
        {priceRangeLabel.apply}
      </button>
    </div>
  );
}
