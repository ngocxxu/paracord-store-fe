"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { PRICE_MAX } from "./data";

interface PriceRangeFilterProps {
  lang: string;
  basePath: string;
  minPrice: number;
  maxPrice: number;
  priceRangeLabel: { min: string; max: string };
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

  const updateRange = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
      if (min > 0) params.set("minPrice", String(min));
      else params.delete("minPrice");
      if (max < PRICE_MAX) params.set("maxPrice", String(max));
      else params.delete("maxPrice");
      params.delete("page");
      const q = params.toString();
      startTransition(() => {
        router.replace(q ? `${pathname}?${q}` : pathname);
      });
    },
    [pathname, router]
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = Math.min(Number(e.target.value), initialMax - 1);
    updateRange(min, initialMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = Math.max(Number(e.target.value), initialMin + 1);
    updateRange(initialMin, max);
  };

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-2">
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={initialMin}
          onChange={handleMinChange}
          className="flex-1 accent-brand-accent"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          value={initialMax}
          onChange={handleMaxChange}
          className="flex-1 accent-brand-accent"
          aria-label="Maximum price"
        />
      </div>
      <p className="text-sm text-brand-text-medium">
        ${initialMin} – {initialMax >= PRICE_MAX ? priceRangeLabel.max : `$${initialMax}`}
      </p>
    </div>
  );
}
