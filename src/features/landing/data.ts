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

export const GEAR_IN_THE_WILD_IMAGES: { src: string; alt: string }[] = [
  { src: "https://placehold.co/600x450/2C2724/AFA9A4?text=1", alt: "Gear in the wild" },
  { src: "https://placehold.co/600x450/2C2724/AFA9A4?text=2", alt: "Gear in the wild" },
  { src: "https://placehold.co/600x450/2C2724/AFA9A4?text=3", alt: "Gear in the wild" },
  { src: "https://placehold.co/600x450/2C2724/AFA9A4?text=4", alt: "Gear in the wild" },
  { src: "https://placehold.co/600x450/2C2724/AFA9A4?text=5", alt: "Gear in the wild" },
  { src: "https://placehold.co/600x450/2C2724/AFA9A4?text=6", alt: "Gear in the wild" },
];
