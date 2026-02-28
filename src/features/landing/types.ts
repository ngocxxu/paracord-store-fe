import type { SignInDict, SignUpDict } from "@/features/auth/types";
import type { CartDict } from "@/features/cart/types";
import type { CheckoutDict } from "@/features/checkout/types";
import type { ShopDict } from "@/features/shop/types";

export interface LandingDict {
  topBar: string;
  nav: {
    shop: string;
    customBuild: string;
    lookbook: string;
    theCraft: string;
    trackOrder: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  heroSlides?: Array<{
    badge: string;
    headline: string;
    subheadline: string;
  }>;
  valueProps: Array<{ title: string; description: string }>;
  featured: { label: string; title: string; viewAll: string };
  keychain: { label: string; title: string; viewAll: string };
  gearInTheWild: {
    title: string;
    subtitleBefore: string;
    hashtag: string;
    subtitleAfter: string;
    cta: string;
    instagramUrl: string;
  };
  newsletter: {
    headline: string;
    description: string;
    placeholder: string;
    submit: string;
    privacyNote: string;
    validation: { emailRequired: string; emailInvalid: string };
  };
  footer: {
    shop: string;
    about: string;
    faq: string;
    contact: string;
    copyright: string;
  };
  navAria: { search: string; cart: string; signIn: string; signUp: string };
  auth?: { signIn: SignInDict; signUp: SignUpDict };
  products: Record<string, { title: string; description: string }>;
  trackOrder: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    phonePlaceholder: string;
    trackCta: string;
    validation: { phoneRequired: string; phoneInvalid: string };
    orderIdLabel: string;
    currentStatusLabel: string;
    statuses: {
      confirmed: string;
      inProduction: string;
      shipped: string;
      delivered: string;
    };
    orderSummaryLabel: string;
    estimatedCompletionLabel: string;
    totalAmountLabel: string;
    helpText: string;
    contactSupport: string;
    shippingPolicy: string;
    exampleOrder: {
      id: string;
      productTitle: string;
      productSubtitle: string;
      estimatedCompletion: string;
      totalAmount: string;
      priceLabel: string;
      quantityLabel: string;
    };
  };
  shop?: ShopDict;
  cart?: CartDict;
  checkout?: CheckoutDict;
}

export interface FeaturedProductItem {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: "bestseller" | "limited";
  colorSwatches?: string[];
}

export interface ResolvedProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: "bestseller" | "limited";
  colorSwatches?: string[];
}
