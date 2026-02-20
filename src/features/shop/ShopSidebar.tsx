import { Minus } from "lucide-react";
import Link from "next/link";
import { FILTER_COLORS } from "./data";
import { PriceRangeFilter } from "./PriceRangeFilter";
import type { CordType, FilterColor, ResolvedShopProduct, ShopCategory, ShopDict } from "./types";
import type { ShopParams } from "./utils";
import { buildShopQuery, getCategoryCounts } from "./utils";

const CATEGORIES: ShopCategory[] = ["bracelets", "lanyards", "keychains", "petGear"];
const CORD_TYPES: CordType[] = ["550", "titan"];

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

function toggleColor(current: FilterColor[], color: FilterColor): FilterColor[] {
  return current.includes(color) ? current.filter((c) => c !== color) : [...current, color];
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
              const q = buildShopQuery(
                { categories: nextCategories, page: 1 },
                { ...params, categories: nextCategories }
              );
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

        <section>
          <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
            <Minus className="h-4 w-4" aria-hidden />
            {dict.cordTypeLabel}
          </h3>
          <ul className="mt-3 space-y-2">
            {CORD_TYPES.map((cord) => {
              const isActive = params.cordType === cord;
              const q = buildShopQuery(
                { cordType: isActive ? null : cord, page: 1 },
                { ...params, cordType: isActive ? null : cord }
              );
              return (
                <li key={cord}>
                  <Link
                    href={`${basePath}${q}`}
                    className="flex items-center gap-2 text-sm text-brand-text-high hover:underline"
                  >
                    <span
                      className={isActive ? "h-4 w-4 rounded-full border-2 border-brand-accent bg-brand-accent" : "h-4 w-4 rounded-full border-2 border-brand-border"}
                      aria-hidden
                    />
                    {dict.cordTypes[cord]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
            <Minus className="h-4 w-4" aria-hidden />
            {dict.colorLabel}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {FILTER_COLORS.map(({ id, hex }) => {
              const colorId = id as FilterColor;
              const active = params.colors.includes(colorId);
              const nextColors = toggleColor(params.colors, colorId);
              const q = buildShopQuery(
                { colors: nextColors, page: 1 },
                { ...params, colors: nextColors }
              );
              return (
                <Link
                  key={id}
                  href={`${basePath}${q}`}
                  className={`h-8 w-8 rounded-full border-2 transition-opacity hover:opacity-90 ${active ? "border-brand-accent ring-2 ring-brand-accent" : "border-brand-border"}`}
                  style={{ backgroundColor: hex }}
                  aria-pressed={active}
                  aria-label={id}
                  title={id}
                />
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-text-high">
            <Minus className="h-4 w-4" aria-hidden />
            {dict.priceRangeLabel}
          </h3>
          <PriceRangeFilter
            lang={lang}
            basePath={basePath}
            minPrice={params.minPrice}
            maxPrice={params.maxPrice}
            priceRangeLabel={{ min: dict.priceRange.min, max: dict.priceRange.max }}
          />
        </section>
      </div>
    </aside>
  );
}
