import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { PriceRangeFilter } from "./PriceRangeFilter";
import type { ResolvedShopProduct, ShopCategory, ShopDict } from "./types";
import type { ShopParams } from "./utils";
import { buildShopQuery, CATEGORIES, getCategoryCounts, WEAVE_TYPES } from "./utils";

interface ShopSidebarProps {
  lang: string;
  basePath: string;
  params: ShopParams;
  dict: ShopDict;
  allProducts: ResolvedShopProduct[];
}

function toggleCategory(current: ShopCategory[], cat: ShopCategory): ShopCategory[] {
  return current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat];
}

export function ShopSidebar({ lang, basePath, params, dict, allProducts }: ShopSidebarProps) {
  const categoryCounts = getCategoryCounts(allProducts);

  return (
    <aside
      className="w-full shrink-0 border-r border-brand-border bg-brand-bg-primary lg:w-64"
      aria-label="Filters"
    >
      <div className="sticky top-14 space-y-6 p-4">
        <section>
          <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
            <Minus className="h-4 w-4" aria-hidden />
            {dict.categoryLabel}
          </h3>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat];
              const active = params.categories.includes(cat);
              const nextCategories = toggleCategory(params.categories, cat);
              const partial: Parameters<typeof buildShopQuery>[0] = { categories: nextCategories, page: 1 };
              if (!nextCategories.includes("bracelets")) partial.weaveType = null;
              const q = buildShopQuery(partial, { ...params, ...partial });
              return (
                <li key={cat}>
                  <Link
                    href={`${basePath}${q}`}
                    className="flex items-center gap-2 text-sm text-brand-text-high hover:underline"
                  >
                    <span
                      className={active ? "flex h-4 w-4 items-center justify-center rounded border border-brand-accent bg-brand-accent" : "flex h-4 w-4 items-center justify-center rounded border border-brand-border"}
                      aria-hidden
                    >
                      {active ? (
                        <span className="text-brand-text-high">✓</span>
                      ) : null}
                    </span>
                    {dict.categories[cat]} ({count})
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {params.categories.includes("bracelets") ? (
          <section>
            <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
              <Minus className="h-4 w-4" aria-hidden />
              {dict.weaveTypeLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              {WEAVE_TYPES.map((weave) => {
                const isActive = params.weaveType === weave;
                const q = buildShopQuery(
                  { weaveType: isActive ? null : weave, page: 1 },
                  { ...params, weaveType: isActive ? null : weave }
                );
                return (
                  <li key={weave}>
                    <Link
                      href={`${basePath}${q}`}
                      className="flex items-center gap-2 text-sm text-brand-text-high hover:underline"
                    >
                      <span
                        className={isActive ? "flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-accent bg-brand-accent text-brand-bg-primary" : "h-4 w-4 rounded-full border-2 border-brand-border"}
                        aria-hidden
                      >
                        {isActive ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                      </span>
                      <span className={isActive ? "text-brand-accent" : undefined}>
                        {dict.weaveTypes[weave]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section>
          <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
            <Minus className="h-4 w-4" aria-hidden />
            {dict.priceRangeLabel}
          </h3>
          <PriceRangeFilter
            key={`${params.minPrice}-${params.maxPrice}`}
            lang={lang}
            basePath={basePath}
            minPrice={params.minPrice}
            maxPrice={params.maxPrice}
            priceRangeLabel={{
              min: dict.priceRange.min,
              max: dict.priceRange.max,
              from: dict.priceRange.from,
              to: dict.priceRange.to,
              apply: dict.priceRange.apply,
            }}
          />
        </section>
      </div>
    </aside>
  );
}
