import { getDictionary } from "@/lib/dictionary";
import { Hero } from "@/features/landing/Hero";
import { ValueProps } from "@/features/landing/ValueProps";
import { FeaturedCollection } from "@/features/landing/FeaturedCollection";
import { BuilderTeaser } from "@/features/landing/BuilderTeaser";
import { NewsletterSection } from "@/features/landing/NewsletterSection";
import { SectionWrapper } from "@/features/landing/SectionWrapper";
import { FEATURED_PRODUCTS } from "@/features/landing/data";
import type { LandingDict, ResolvedProduct } from "@/features/landing/types";

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
      <Hero dict={dict.hero} locale={lang} />
      <SectionWrapper variant="surface" ariaLabel="Value propositions">
        <ValueProps items={dict.valueProps} />
      </SectionWrapper>
      <FeaturedCollection
        dict={dict.featured}
        products={products}
        locale={lang}
      />
      <section id="the-craft" aria-label="The Craft">
        <BuilderTeaser dict={dict.builderTeaser} locale={lang} />
      </section>
      <NewsletterSection dict={dict.newsletter} />
    </>
  );
}
