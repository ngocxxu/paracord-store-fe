"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { PRICE_MAX } from "./data";

interface PriceRangeFilterProps {
  lang: string;
  basePath: string;
  minPrice: number;
  maxPrice: number;
  priceRangeLabel: { min: string; max: string; from: string; to: string; apply: string };
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

  const handleMinSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setMin(Math.min(v, max));
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setMax(Math.max(v, min));
  };

  const clamp = (n: number) => Math.min(PRICE_MAX, Math.max(0, n));

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

  const thumbClass =
    "h-8 w-full appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-accent";

  return (
    <div className="space-y-4">
      <div className="relative pt-6 pb-2">
        <div className="absolute left-0 right-0 top-6 h-8" aria-hidden>
          <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-border" aria-hidden />
          <div
            className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-accent"
            style={{ left: `${minPct}%`, width: `${fillWidth}%` }}
            aria-hidden
          />
        </div>
        <div
          className="absolute top-6 z-10 h-8"
          style={{ left: 0, width: `${maxPct}%` }}
        >
          <input
            type="range"
            min={0}
            max={Math.max(max, 1)}
            value={min}
            onChange={handleMinSlider}
            className={thumbClass}
            aria-label="Minimum price"
          />
        </div>
        <div
          className="absolute top-6 z-20 h-8"
          style={{ left: `${minPct}%`, width: `${100 - minPct}%` }}
        >
          <input
            type="range"
            min={min}
            max={PRICE_MAX}
            value={max}
            onChange={handleMaxSlider}
            className={thumbClass}
            aria-label="Maximum price"
          />
        </div>
        <span
          className="absolute top-0 rounded bg-brand-bg-card px-1.5 py-0.5 text-xs font-medium text-brand-text-high"
          style={{ left: `${minPct}%`, transform: "translateX(-50%)" }}
        >
          ${min}
        </span>
        <span
          className="absolute top-0 rounded bg-brand-bg-card px-1.5 py-0.5 text-xs font-medium text-brand-text-high"
          style={{ left: `${maxPct}%`, transform: "translateX(-50%)" }}
        >
          {max >= PRICE_MAX ? priceRangeLabel.max : `$${max}`}
        </span>
        <span className="absolute left-0 top-14 text-xs text-brand-text-medium">{priceRangeLabel.min}</span>
        <span className="absolute right-0 top-14 text-xs text-brand-text-medium">{priceRangeLabel.max}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-brand-text-high">{priceRangeLabel.from}</span>
          <input
            type="number"
            min={0}
            max={PRICE_MAX}
            value={min}
            onChange={(e) => setMin(clamp(Number(e.target.value) || 0))}
            onBlur={handleFromBlur}
            className="rounded border border-brand-border bg-brand-bg-card px-2 py-1.5 text-sm text-brand-text-high [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-label={priceRangeLabel.from}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-brand-text-high">{priceRangeLabel.to}</span>
          <input
            type="number"
            min={0}
            max={PRICE_MAX}
            value={max}
            onChange={(e) => setMax(clamp(Number(e.target.value) ?? PRICE_MAX))}
            onBlur={handleToBlur}
            className="rounded border border-brand-border bg-brand-bg-card px-2 py-1.5 text-sm text-brand-text-high [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            aria-label={priceRangeLabel.to}
          />
        </label>
      </div>

      <button
        type="button"
        onClick={handleApply}
        className="w-full rounded bg-brand-accent py-2 text-sm font-medium text-brand-text-high hover:bg-brand-accent-hover"
      >
        {priceRangeLabel.apply}
      </button>
    </div>
  );
}
