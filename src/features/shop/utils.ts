import type { ShopCategory, WeaveType } from "./types";
import type { FilterColor } from "./types";
import { PRICE_MAX, PRODUCTS_PER_PAGE } from "./data";
import type { ResolvedShopProduct } from "./types";

export type SortOption = "featured" | "price-asc" | "price-desc";

export interface ShopParams {
  categories: ShopCategory[];
  weaveType: WeaveType | null;
  colors: FilterColor[];
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
  page: number;
}

export const CATEGORIES: ShopCategory[] = ["bracelets", "keychains", "petGear"];
export const WEAVE_TYPES: WeaveType[] = ["cobra", "fishtail", "snakeKnot", "kingCobra"];
const COLORS: FilterColor[] = [
  "red", "orange", "blue", "yellow", "green", "white", "black", "brown",
];
const SORT_OPTIONS: SortOption[] = ["featured", "price-asc", "price-desc"];

function parseList(value: string | undefined, allowed: string[]): string[] {
  if (!value) return [];
  return value.split(",").filter((v) => allowed.includes(v.trim()));
}

function parseNum(value: string | undefined, fallback: number, min: number, max: number): number {
  const n = value ? parseInt(value, 10) : fallback;
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function parseShopParams(searchParams: Record<string, string | string[] | undefined>): ShopParams {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    categories: parseList(get("category"), CATEGORIES) as ShopCategory[],
    weaveType: (WEAVE_TYPES.includes(get("weaveType") as WeaveType) ? get("weaveType") : null) as WeaveType | null,
    colors: parseList(get("color"), COLORS) as FilterColor[],
    minPrice: parseNum(get("minPrice"), 0, 0, PRICE_MAX),
    maxPrice: parseNum(get("maxPrice"), PRICE_MAX, 0, PRICE_MAX),
    sort: SORT_OPTIONS.includes(get("sort") as SortOption) ? (get("sort") as SortOption) : "featured",
    page: Math.max(1, parseNum(get("page"), 1, 1, 999)),
  };
}

export function filterProducts(products: ResolvedShopProduct[], params: ShopParams): ResolvedShopProduct[] {
  return products.filter((p) => {
    if (params.categories.length && !params.categories.includes(p.category)) return false;
    if (params.weaveType && p.weaveType !== params.weaveType) return false;
    if (params.colors.length) {
      const match = params.colors.some((c) => p.filterColors.includes(c));
      if (!match) return false;
    }
    if (p.priceNum < params.minPrice || p.priceNum > params.maxPrice) return false;
    return true;
  });
}

export function sortProducts(products: ResolvedShopProduct[], sort: SortOption): ResolvedShopProduct[] {
  const list = [...products];
  if (sort === "price-asc") list.sort((a, b) => a.priceNum - b.priceNum);
  else if (sort === "price-desc") list.sort((a, b) => b.priceNum - a.priceNum);
  return list;
}

export function paginateProducts(
  products: ResolvedShopProduct[],
  page: number,
  perPage: number
): { items: ResolvedShopProduct[]; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const p = Math.max(1, Math.min(page, totalPages));
  const start = (p - 1) * perPage;
  return { items: products.slice(start, start + perPage), totalPages };
}

export function buildShopQuery(partial: Partial<ShopParams>, current: ShopParams): string {
  const q = new URLSearchParams();
  const categories = partial.categories !== undefined ? partial.categories : current.categories;
  const weaveType = partial.weaveType !== undefined ? partial.weaveType : current.weaveType;
  const colors = partial.colors !== undefined ? partial.colors : current.colors;
  const minPrice = partial.minPrice !== undefined ? partial.minPrice : current.minPrice;
  const maxPrice = partial.maxPrice !== undefined ? partial.maxPrice : current.maxPrice;
  const sort = partial.sort !== undefined ? partial.sort : current.sort;
  const page = partial.page !== undefined ? partial.page : current.page;

  if (categories.length) q.set("category", categories.join(","));
  if (weaveType) q.set("weaveType", weaveType);
  if (colors.length) q.set("color", colors.join(","));
  if (minPrice > 0) q.set("minPrice", String(minPrice));
  if (maxPrice < PRICE_MAX) q.set("maxPrice", String(maxPrice));
  if (sort !== "featured") q.set("sort", sort);
  if (page > 1) q.set("page", String(page));

  const s = q.toString();
  return s ? `?${s}` : "";
}

export function getCategoryCounts(products: ResolvedShopProduct[]): Record<ShopCategory, number> {
  const counts = { bracelets: 0, lanyards: 0, keychains: 0, petGear: 0 } as Record<ShopCategory, number>;
  for (const p of products) counts[p.category]++;
  return counts;
}

export { PRODUCTS_PER_PAGE };
