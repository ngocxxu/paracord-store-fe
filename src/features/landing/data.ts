import type { FeaturedProductItem } from "./types";

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/ngocxxu/image/upload/v1772070687/paracord/ewbw3koxkwpezgf9hm95.png";

export const HERO_SLIDES: { imageSrc: string; imageAlt: string }[] = [
  {
    imageSrc: "/hero/slide-1.png",
    imageAlt: "Hands weaving a paracord bracelet",
  },
  {
    imageSrc: "/hero/slide-2.png",
    imageAlt: "Camo paracord bracelet on dark surface",
  },
  {
    imageSrc: "/hero/slide-3.png",
    imageAlt: "Green paracord survival straps on fabric background",
  },
];

export const FEATURED_PRODUCTS: FeaturedProductItem[] = [
  {
    id: "cobra",
    slug: "cobra-weave",
    titleKey: "cobra",
    descriptionKey: "cobra",
    price: "$24.00",
    imageSrc: PRODUCT_IMAGE,
    imageAlt: "Paracord keychain",
    badge: "bestseller",
    colorSwatches: ["#FF5E00", "#332F2C", "#4B5320"],
  },
  {
    id: "hkSnapLanyard",
    slug: "hk-snap-lanyard",
    titleKey: "hkSnapLanyard",
    descriptionKey: "hkSnapLanyard",
    price: "$18.00",
    imageSrc: PRODUCT_IMAGE,
    imageAlt: "Paracord keychain",
    colorSwatches: ["#FF5E00", "#332F2C"],
  },
  {
    id: "titanSurvivalCord",
    slug: "titan-survival-cord",
    titleKey: "titanSurvivalCord",
    descriptionKey: "titanSurvivalCord",
    price: "$32.00",
    imageSrc: PRODUCT_IMAGE,
    imageAlt: "Paracord keychain",
    badge: "limited",
    colorSwatches: ["#AFA9A4", "#4B5320"],
  },
];

export const GEAR_IN_THE_WILD_IMAGES: { src: string; alt: string }[] = [
  { src: PRODUCT_IMAGE, alt: "Paracord keychains" },
  { src: PRODUCT_IMAGE, alt: "Paracord keychains" },
  { src: PRODUCT_IMAGE, alt: "Paracord keychains" },
  { src: PRODUCT_IMAGE, alt: "Paracord keychains" },
  { src: PRODUCT_IMAGE, alt: "Paracord keychains" },
  { src: PRODUCT_IMAGE, alt: "Paracord keychains" },
];
