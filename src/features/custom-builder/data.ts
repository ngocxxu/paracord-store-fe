import type {
  BuckleOption,
  ColorOption,
  WeaveCanvasConfig,
  WeaveOption,
} from './types';

export const BUILDER_MODELS = ['bracelet', 'keychain'] as const;

const PRODUCT_IMAGE =
  'https://res.cloudinary.com/ngocxxu/image/upload/v1772070687/paracord/ewbw3koxkwpezgf9hm95.png';

const DEFAULT_IMAGE_FALLBACK =
  'https://res.cloudinary.com/ngocxxu/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1772070687/paracord/ewbw3koxkwpezgf9hm95.png';

export const DEFAULT_BRACELET_CANVAS: WeaveCanvasConfig = {
  imageSrc: DEFAULT_IMAGE_FALLBACK,
  parts: {
    buckle: { top: 18, right: 0 },
    innerCore: { top: 44, left: 0 },
    outerEdge: { top: 48, right: 0 },
  },
};

export const BRACELET_WEAVE_CANVAS: Record<string, WeaveCanvasConfig> = {
  origin: {
    imageSrc: '/builder/origin.png',
    parts: {
      buckle: { top: 85, right: 0 },
      innerCore: { top: 30, left: -15 },
      outerEdge: { top: 17, right: -20 },
    },
  },
};

export const WEAVE_OPTIONS: WeaveOption[] = [
  { id: 'origin', labelKey: 'origin', imageSrc: '/builder/origin.png' },
  { id: 'fishtail', labelKey: 'fishtail', imageSrc: PRODUCT_IMAGE },
  { id: 'snakeKnot', labelKey: 'snakeKnot', imageSrc: PRODUCT_IMAGE },
  { id: 'kingCobra', labelKey: 'kingCobra', imageSrc: PRODUCT_IMAGE },
];

export const KEYCHAIN_WEAVE_OPTIONS: WeaveOption[] = [
  { id: 'adn', labelKey: 'adn', imageSrc: PRODUCT_IMAGE },
  { id: 'box', labelKey: 'box', imageSrc: PRODUCT_IMAGE },
  { id: 'snake', labelKey: 'snake', imageSrc: PRODUCT_IMAGE },
  { id: 'butterfly', labelKey: 'butterfly', imageSrc: PRODUCT_IMAGE },
  { id: 'circleStick', labelKey: 'circleStick', imageSrc: PRODUCT_IMAGE },
  { id: 'monkeysFist', labelKey: 'monkeysFist', imageSrc: PRODUCT_IMAGE },
];

export const BRACELET_WEAVE_IDS = WEAVE_OPTIONS.map((w) => w.id);
export const KEYCHAIN_WEAVE_IDS = KEYCHAIN_WEAVE_OPTIONS.map((w) => w.id);

export const SIZE_PRESETS = [
  { id: 's', labelKey: 's' },
  { id: 'm', labelKey: 'm' },
  { id: 'l', labelKey: 'l' },
  { id: 'xl', labelKey: 'xl' },
] as const;

export const SIZE_CUSTOM_ID = 'custom' as const;

export const MEASURE_VIDEO_ID =
  (typeof process.env.NEXT_PUBLIC_MEASURE_VIDEO_ID === 'string' &&
    process.env.NEXT_PUBLIC_MEASURE_VIDEO_ID) ||
  '';

export const BUCKLE_OPTIONS: BuckleOption[] = [
  {
    id: 'matteBlack',
    labelKey: 'matteBlack',
    imageSrc: '/builder/buckle-matte-black.png',
  },
  {
    id: 'stainless',
    labelKey: 'stainless',
    imageSrc: '/builder/buckle-stainless.png',
  },
];

const CLOUDINARY_COLORS = 'https://res.cloudinary.com/ngocxxu/image/upload';

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'yellow', imageSrc: `${CLOUDINARY_COLORS}/v1772381537/paracord/colors/yellow.png`, labelKey: 'yellow' },
  { id: 'whiteSilverBlueStripes', imageSrc: `${CLOUDINARY_COLORS}/v1772381537/paracord/colors/white-silver-blue-stripes.png`, labelKey: 'whiteSilverBlueStripes' },
  { id: 'whiteRedBlueStripes', imageSrc: `${CLOUDINARY_COLORS}/v1772381536/paracord/colors/white-red-blue-stripes.png`, labelKey: 'whiteRedBlueStripes' },
  { id: 'white', imageSrc: `${CLOUDINARY_COLORS}/v1772381537/paracord/colors/white.png`, labelKey: 'white' },
  { id: 'silverDot', imageSrc: `${CLOUDINARY_COLORS}/v1772381536/paracord/colors/silver-dot.png`, labelKey: 'silverDot' },
  { id: 'redDot', imageSrc: `${CLOUDINARY_COLORS}/v1772381536/paracord/colors/red-dot.png`, labelKey: 'redDot' },
  { id: 'redAndBlackStripes', imageSrc: `${CLOUDINARY_COLORS}/v1772381536/paracord/colors/red-and-black-stripes.png`, labelKey: 'redAndBlackStripes' },
  { id: 'red', imageSrc: `${CLOUDINARY_COLORS}/v1772381536/paracord/colors/red.png`, labelKey: 'red' },
  { id: 'purple', imageSrc: `${CLOUDINARY_COLORS}/v1772381536/paracord/colors/purple.png`, labelKey: 'purple' },
  { id: 'pink', imageSrc: `${CLOUDINARY_COLORS}/v1772381535/paracord/colors/pink.png`, labelKey: 'pink' },
  { id: 'orange', imageSrc: `${CLOUDINARY_COLORS}/v1772381535/paracord/colors/orange.png`, labelKey: 'orange' },
  { id: 'neonGreenDot', imageSrc: `${CLOUDINARY_COLORS}/v1772381535/paracord/colors/neon-green-dot.png`, labelKey: 'neonGreenDot' },
  { id: 'neonGreen', imageSrc: `${CLOUDINARY_COLORS}/v1772381535/paracord/colors/neon%20green.png`, labelKey: 'neonGreen' },
  { id: 'lightKhaki', imageSrc: `${CLOUDINARY_COLORS}/v1772381534/paracord/colors/light-khaki.png`, labelKey: 'lightKhaki' },
  { id: 'lightBlue', imageSrc: `${CLOUDINARY_COLORS}/v1772381533/paracord/colors/light-blue.png`, labelKey: 'lightBlue' },
  { id: 'fireStripes', imageSrc: `${CLOUDINARY_COLORS}/v1772381532/paracord/colors/fire-stripes.png`, labelKey: 'fireStripes' },
  { id: 'darkSilver', imageSrc: `${CLOUDINARY_COLORS}/v1772381534/paracord/colors/dark-silver.png`, labelKey: 'darkSilver' },
  { id: 'darkKhaki', imageSrc: `${CLOUDINARY_COLORS}/v1772381532/paracord/colors/dark-khaki.png`, labelKey: 'darkKhaki' },
  { id: 'camouflageStripes', imageSrc: `${CLOUDINARY_COLORS}/v1772381535/paracord/colors/camouflage-stripes.png`, labelKey: 'camouflageStripes' },
  { id: 'blueWithRedAndWhiteAccents', imageSrc: `${CLOUDINARY_COLORS}/v1772381533/paracord/colors/blue-with-red-and-white-accents.png`, labelKey: 'blueWithRedAndWhiteAccents' },
  { id: 'blueAndWhite', imageSrc: `${CLOUDINARY_COLORS}/v1772381534/paracord/colors/blue-and-white.png`, labelKey: 'blueAndWhite' },
  { id: 'blue', imageSrc: `${CLOUDINARY_COLORS}/v1772381533/paracord/colors/blue.png`, labelKey: 'blue' },
  { id: 'blackAndWhite', imageSrc: `${CLOUDINARY_COLORS}/v1772381532/paracord/colors/black-and-white.png`, labelKey: 'blackAndWhite' },
  { id: 'blackAndRed', imageSrc: `${CLOUDINARY_COLORS}/v1772381532/paracord/colors/black-and-red.png`, labelKey: 'blackAndRed' },
  { id: 'black', imageSrc: `${CLOUDINARY_COLORS}/v1772381532/paracord/colors/black.png`, labelKey: 'black' },
  { id: 'beigeWithBrownAndBlackAccents', imageSrc: `${CLOUDINARY_COLORS}/v1772381533/paracord/colors/beige-with%20brown-and-black-accents.png`, labelKey: 'beigeWithBrownAndBlackAccents' },
  { id: 'armyGreen', imageSrc: `${CLOUDINARY_COLORS}/v1772381533/paracord/colors/army-green.png`, labelKey: 'armyGreen' },
];

export const BASE_PRICE = 60000;
export const CUSTOMIZATION_PRICE = 12500;
