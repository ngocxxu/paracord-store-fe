"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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

  const handleSelect = (sort: SortOption) => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    if (sort === "featured") params.delete("sort");
    else params.set("sort", sort);
    params.set("page", "1");
    const q = params.toString();
    startTransition(() => {
      router.replace(q ? `${pathname}?${q}` : pathname);
    });
  };

  const currentLabel =
    (labels as Record<string, string>)[SORT_KEYS.find((k) => k.value === currentSort)?.labelKey ?? "featured"] ??
    "NEWEST FIRST";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-brand-text-medium" id="shop-sort-label">
        {labels.sortBy ?? "Sort by:"}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isPending}
            aria-labelledby="shop-sort-label"
            aria-haspopup="listbox"
            aria-expanded={undefined}
            className="inline-flex h-9 min-w-[8rem] items-center justify-between gap-2 rounded-md border-2 border-brand-bg-primary bg-brand-bg-surface px-3 py-2 text-sm font-medium uppercase text-brand-text-high focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg-primary disabled:opacity-50"
          >
            {currentLabel}
            <ChevronDown className="h-4 w-4 shrink-0 text-brand-text-high" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="min-w-[8rem] border-brand-border bg-brand-bg-surface text-brand-text-high"
        >
          {SORT_KEYS.map(({ value, labelKey }) => {
            const label = (labels as Record<string, string>)[labelKey] ?? value;
            const isActive = currentSort === value;
            return (
              <DropdownMenuItem
                key={value}
                onClick={() => handleSelect(value)}
                className={isActive ? "text-brand-accent" : ""}
              >
                {isActive ? <Check className="mr-2 h-4 w-4" aria-hidden /> : <span className="mr-2 w-4" />}
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
