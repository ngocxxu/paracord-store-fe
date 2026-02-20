"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import type { SortOption } from "./utils";

const SORT_KEYS: { value: SortOption; labelKey: string }[] = [
  { value: "featured", labelKey: "featured" },
  { value: "price-asc", labelKey: "priceAsc" },
  { value: "price-desc", labelKey: "priceDesc" },
];

interface SortSelectProps {
  currentSort: SortOption;
  labels: { sortBy: string; featured: string; priceAsc: string; priceDesc: string };
}

export function SortSelect({ currentSort, labels }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as SortOption;
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    if (sort === "featured") params.delete("sort");
    else params.set("sort", sort);
    params.set("page", "1");
    const q = params.toString();
    startTransition(() => {
      router.replace(q ? `${pathname}?${q}` : pathname);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="shop-sort" className="text-sm text-brand-text-medium">
        {labels.sortBy ?? "Sort by:"}
      </label>
      <select
        id="shop-sort"
        value={currentSort}
        onChange={handleChange}
        disabled={isPending}
        className="rounded border border-brand-border bg-brand-bg-surface px-3 py-2 text-sm font-medium uppercase text-brand-text-high focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
      >
        {SORT_KEYS.map(({ value, labelKey }) => (
          <option key={value} value={value}>
            {(labels as Record<string, string>)[labelKey] ?? value}
          </option>
        ))}
      </select>
    </div>
  );
}
