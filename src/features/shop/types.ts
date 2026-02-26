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

export interface ProductDetailDict {
  breadcrumb: { home: string; customGear: string };
  featuredBuildPrice: string;
  featuredBuildTag: string;
  reviews: string;
  selectWristSize: string;
  howToMeasure: string;
  orEnterExactSize: string;
  customSizePlaceholder: string;
  resetSelection: string;
  precisionFitNote: string;
  wristSizes: { s: string; m: string; l: string; xl: string };
  addToCart: string;
  shipping: string;
  customizer: {
    tagline: string;
    title: string;
    description: string;
    openCustomizer: string;
  };
  guarantees: {
    lifetimeGuarantee: string;
    lifetimeGuaranteeDesc: string;
    expressBuild: string;
    expressBuildDesc: string;
  };
  material: { title: string; body: string; exploreLink: string };
  hardware: { title: string; body: string; tags: string[] };
  builtToOrder: { title: string; body: string; handmadeLabel: string };
  dragToExploreMacroDetails: string;
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
  priceRange: { min: string; max: string; from: string; to: string; apply: string };
  pagination: { prev: string; next: string };
  productDetail?: ProductDetailDict;
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
