import Link from "next/link";
import { X } from "lucide-react";
import type { ShopCategory } from "./types";
import type { ShopParams } from "./utils";
import { buildShopQuery } from "./utils";
import type { ShopDict } from "./types";

interface ShopActiveFiltersProps {
  basePath: string;
  params: ShopParams;
  dict: ShopDict;
}

function removeCategory(params: ShopParams, cat: ShopCategory): string {
  const next = params.categories.filter((c) => c !== cat);
  return buildShopQuery(
    { ...params, categories: next, page: 1, ...(cat === "bracelets" ? { weaveType: null } : {}) },
    params
  );
}

function removeWeaveType(params: ShopParams): string {
  return buildShopQuery({ ...params, weaveType: null, page: 1 }, params);
}

export function ShopActiveFilters({ basePath, params, dict }: ShopActiveFiltersProps) {
  const hasFilters =
    params.categories.length > 0 ||
    params.weaveType !== null ||
    params.minPrice > 0 ||
    params.maxPrice < 100;

  if (!hasFilters) return null;

  const tags: { key: string; label: string; href: string }[] = [];

  params.categories.forEach((cat) => {
    tags.push({
      key: `cat-${cat}`,
      label: dict.categories[cat].toUpperCase(),
      href: basePath + removeCategory(params, cat),
    });
  });
  if (params.weaveType) {
    tags.push({
      key: "weave",
      label: dict.weaveTypes[params.weaveType].toUpperCase(),
      href: basePath + removeWeaveType(params),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map(({ key, label, href }) => (
        <Link
          key={key}
          href={href}
          className="inline-flex items-center gap-1 rounded bg-brand-bg-surface px-2 py-1 text-xs font-medium uppercase text-brand-text-high hover:bg-brand-border"
        >
          {label}
          <X className="h-3 w-3" aria-hidden />
        </Link>
      ))}
      <Link
        href={basePath}
        className="text-xs font-medium uppercase text-brand-text-medium hover:underline"
      >
        {dict.clearAll}
      </Link>
    </div>
  );
}
