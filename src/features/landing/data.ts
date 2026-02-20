import type { FeaturedProductItem } from "./types";

export const FEATURED_PRODUCTS: FeaturedProductItem[] = [
  {
    id: "cobra",
    slug: "cobra-weave",
    titleKey: "cobra",
    descriptionKey: "cobra",
    price: "$24.00",
    badge: "bestseller",
    colorSwatches: ["#FF5E00", "#332F2C", "#4B5320"],
  },
  {
    id: "hkSnapLanyard",
    slug: "hk-snap-lanyard",
    titleKey: "hkSnapLanyard",
    descriptionKey: "hkSnapLanyard",
    price: "$18.00",
    colorSwatches: ["#FF5E00", "#332F2C"],
  },
  {
    id: "titanSurvivalCord",
    slug: "titan-survival-cord",
    titleKey: "titanSurvivalCord",
    descriptionKey: "titanSurvivalCord",
    price: "$32.00",
    badge: "limited",
    colorSwatches: ["#AFA9A4", "#4B5320"],
  },
];
