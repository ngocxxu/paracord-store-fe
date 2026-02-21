import type { BuckleOption, ColorOption, WeaveOption } from "./types";

export const BUILDER_MODELS = ["bracelet", "keychain"] as const;

const PLACEHOLDER_IMAGE = "https://placehold.co/800x600/2C2724/FF5E00?text=Bracelet";

export const WEAVE_OPTIONS: WeaveOption[] = [
  { id: "cobra", labelKey: "cobra", imageSrc: PLACEHOLDER_IMAGE },
  { id: "fishtail", labelKey: "fishtail", imageSrc: PLACEHOLDER_IMAGE },
  { id: "snakeKnot", labelKey: "snakeKnot", imageSrc: PLACEHOLDER_IMAGE },
  { id: "kingCobra", labelKey: "kingCobra", imageSrc: PLACEHOLDER_IMAGE },
];

export const BUCKLE_OPTIONS: BuckleOption[] = [
  { id: "matteBlack", labelKey: "matteBlack" },
  { id: "stainless", labelKey: "stainless" },
];

export const COLOR_OPTIONS: ColorOption[] = [
  { id: "black", hex: "#000000", labelKey: "black" },
  { id: "orange", hex: "#ea580c", labelKey: "orange" },
  { id: "green", hex: "#4B5320", labelKey: "odGreen" },
  { id: "grey", hex: "#6b7280", labelKey: "grey" },
  { id: "red", hex: "#dc2626", labelKey: "red" },
  { id: "yellow", hex: "#ca8a04", labelKey: "yellow" },
  { id: "blue", hex: "#2563eb", labelKey: "blue" },
  { id: "white", hex: "#fafafa", labelKey: "white" },
];

export const BASE_PRICE = 24;
export const CUSTOMIZATION_PRICE = 5;
