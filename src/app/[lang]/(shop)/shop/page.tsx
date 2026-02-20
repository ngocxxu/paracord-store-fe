import { getDictionary } from "@/lib/dictionary";
import type { LandingDict } from "@/features/landing/types";
import { resolveShopProducts } from "@/features/shop/resolveProducts";
import {
  parseShopParams,
  filterProducts,
  sortProducts,
  paginateProducts,
  PRODUCTS_PER_PAGE,
} from "@/features/shop/utils";
import { ShopSidebar } from "@/features/shop/ShopSidebar";
import { ShopActiveFilters } from "@/features/shop/ShopActiveFilters";
import { SortSelect } from "@/features/shop/SortSelect";
import { ShopPagination } from "@/features/shop/ShopPagination";
import { ProductCard } from "@/features/landing/ProductCard";

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  const rawParams = await searchParams;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;
  const shopDict = dict.shop;

  if (!shopDict) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-brand-text-medium">Shop content is not available.</p>
      </div>
    );
  }

  const allProducts = resolveShopProducts(dict.products);
  const shopParams = parseShopParams(rawParams);
  const filtered = filterProducts(allProducts, shopParams);
  const sorted = sortProducts(filtered, shopParams.sort);
  const { items: pageProducts, totalPages } = paginateProducts(
    sorted,
    shopParams.page,
    PRODUCTS_PER_PAGE
  );

  const basePath = `/${lang}/shop`;

  return (
    <div className="min-h-screen bg-brand-bg-primary">
      <div className="border-y border-brand-border bg-black">
        <div className="container mx-auto flex flex-wrap items-end justify-between gap-4 px-4 py-6">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest-custom text-brand-accent">
              {shopDict.collectionLabel}
            </span>
            <h1 className="mt-1 text-3xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-4xl">
              {shopDict.allGear}
            </h1>
          </div>
          <SortSelect
            currentSort={shopParams.sort}
            labels={{
              sortBy: shopDict.sortBy,
              featured: shopDict.featured,
              priceAsc: shopDict.priceAsc,
              priceDesc: shopDict.priceDesc,
            }}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">

        <div className="flex flex-col gap-6 lg:flex-row">
          <ShopSidebar
            lang={lang}
            basePath={basePath}
            params={shopParams}
            dict={shopDict}
            allProducts={allProducts}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-4">
              <ShopActiveFilters basePath={basePath} params={shopParams} dict={shopDict} />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  imageAlt={product.imageAlt}
                  badge={product.badge}
                  colorSwatches={product.colorSwatches}
                  locale={lang}
                />
              ))}
            </div>

            <ShopPagination
              basePath={basePath}
              params={shopParams}
              totalPages={totalPages}
              dict={shopDict}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
