import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { ProductCard } from "./ProductCard";
import type { LandingDict, ResolvedProduct } from "./types";

interface FeaturedCollectionProps {
  readonly dict: LandingDict["featured"];
  readonly products: ResolvedProduct[];
  readonly locale: string;
  readonly variant?: "primary" | "surface";
}

export function FeaturedCollection({
  dict,
  products,
  locale,
  variant = "primary",
}: FeaturedCollectionProps) {
  return (
    <SectionWrapper variant={variant} ariaLabel={dict.title}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest-custom text-brand-accent">
              {dict.label}
            </span>
            <h2 className="mt-1 text-3xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-4xl">
              {dict.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-sm font-medium uppercase text-brand-accent hover:underline"
          >
            {dict.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              {...product}
              locale={locale}
              detailHref={`/${locale}/shop/${product.slug}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
