export type ShopCategory = "bracelets" | "lanyards" | "keychains" | "petGear";
export type CordType = "550" | "titan";
export type FilterColor =
  | "red"
  | "orange"
  | "blue"
  | "yellow"
  | "green"
  | "white"
  | "black"
  | "brown";

export interface ShopProductItem {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  price: string;
  priceNum: number;
  imageSrc?: string;
  imageAlt?: string;
  badge?: "bestseller" | "limited";
  colorSwatches: string[];
  category: ShopCategory;
  cordType?: CordType;
  filterColors: FilterColor[];
}

export interface ShopDict {
  collectionLabel: string;
  allGear: string;
  sortBy: string;
  featured: string;
  priceAsc: string;
  priceDesc: string;
  clearAll: string;
  categoryLabel: string;
  cordTypeLabel: string;
  colorLabel: string;
  priceRangeLabel: string;
  categories: Record<ShopCategory, string>;
  cordTypes: Record<CordType, string>;
  priceRange: { min: string; max: string };
  pagination: { prev: string; next: string };
}

export interface ResolvedShopProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  priceNum: number;
  imageSrc?: string;
  imageAlt?: string;
  badge?: "bestseller" | "limited";
  colorSwatches: string[];
  category: ShopCategory;
  cordType?: CordType;
  filterColors: FilterColor[];
}
