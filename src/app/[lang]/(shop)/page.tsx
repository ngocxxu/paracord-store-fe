import { FeaturedCollection } from "@/features/landing/FeaturedCollection";
import { GearInTheWildSection } from "@/features/landing/GearInTheWildSection";
import { HeroCarousel } from "@/features/landing/HeroCarousel";
import { SectionWrapper } from "@/features/landing/SectionWrapper";
import { ValueProps } from "@/features/landing/ValueProps";
import { FEATURED_PRODUCTS, GEAR_IN_THE_WILD_IMAGES } from "@/features/landing/data";
import type { LandingDict, ResolvedProduct } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

function resolveProducts(dict: LandingDict): ResolvedProduct[] {
  return FEATURED_PRODUCTS.map((item) => {
    const productDict = dict.products[item.titleKey];
    return {
      id: item.id,
      slug: item.slug,
      title: productDict?.title ?? item.slug,
      description: productDict?.description ?? "",
      price: item.price,
      imageSrc: item.imageSrc,
      imageAlt: item.imageAlt,
      badge: item.badge,
      colorSwatches: item.colorSwatches,
    };
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;
  const products = resolveProducts(dict);

  return (
    <>
      <HeroCarousel dict={dict.hero} heroSlides={dict.heroSlides} locale={lang} />
      <SectionWrapper variant="surface" ariaLabel="Value propositions">
        <ValueProps items={dict.valueProps} />
      </SectionWrapper>
      <FeaturedCollection
        dict={dict.featured}
        products={products}
        locale={lang}
      />
      <section id="gear-in-the-wild" aria-label="Gear in the Wild">
        <GearInTheWildSection
          dict={dict.gearInTheWild}
          images={GEAR_IN_THE_WILD_IMAGES}
        />
      </section>
      {/* <NewsletterSection dict={dict.newsletter} /> */}
    </>
  );
}
