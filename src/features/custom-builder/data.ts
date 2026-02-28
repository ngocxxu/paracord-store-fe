import type { BuckleOption, ColorOption, WeaveOption } from "./types";

export const BUILDER_MODELS = ["bracelet", "keychain"] as const;

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/ngocxxu/image/upload/v1772070687/paracord/ewbw3koxkwpezgf9hm95.png";

export const WEAVE_OPTIONS: WeaveOption[] = [
  { id: "cobra", labelKey: "cobra", imageSrc: PRODUCT_IMAGE },
  { id: "fishtail", labelKey: "fishtail", imageSrc: PRODUCT_IMAGE },
  { id: "snakeKnot", labelKey: "snakeKnot", imageSrc: PRODUCT_IMAGE },
  { id: "kingCobra", labelKey: "kingCobra", imageSrc: PRODUCT_IMAGE },
];

export const KEYCHAIN_WEAVE_OPTIONS: WeaveOption[] = [
  { id: "adn", labelKey: "adn", imageSrc: PRODUCT_IMAGE },
  { id: "box", labelKey: "box", imageSrc: PRODUCT_IMAGE },
  { id: "snake", labelKey: "snake", imageSrc: PRODUCT_IMAGE },
  { id: "butterfly", labelKey: "butterfly", imageSrc: PRODUCT_IMAGE },
  { id: "circleStick", labelKey: "circleStick", imageSrc: PRODUCT_IMAGE },
  { id: "monkeysFist", labelKey: "monkeysFist", imageSrc: PRODUCT_IMAGE },
];

export const BRACELET_WEAVE_IDS = WEAVE_OPTIONS.map((w) => w.id);
export const KEYCHAIN_WEAVE_IDS = KEYCHAIN_WEAVE_OPTIONS.map((w) => w.id);

export const SIZE_PRESETS = [
  { id: "s", labelKey: "s" },
  { id: "m", labelKey: "m" },
  { id: "l", labelKey: "l" },
  { id: "xl", labelKey: "xl" },
] as const;

export const SIZE_CUSTOM_ID = "custom" as const;

export const MEASURE_VIDEO_ID =
  (typeof process.env.NEXT_PUBLIC_MEASURE_VIDEO_ID === "string" && process.env.NEXT_PUBLIC_MEASURE_VIDEO_ID) ||
  "";

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

export const BASE_PRICE = 60000;
export const CUSTOMIZATION_PRICE = 12500;
