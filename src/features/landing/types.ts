export interface LandingDict {
  topBar: string;
  nav: { shop: string; customBuild: string; lookbook: string; theCraft: string };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  valueProps: Array<{ title: string; description: string }>;
  featured: { label: string; title: string; viewAll: string };
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
  };
  footer: {
    shop: string;
    about: string;
    faq: string;
    contact: string;
    copyright: string;
  };
  navAria: { search: string; cart: string };
  products: Record<string, { title: string; description: string }>;
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
