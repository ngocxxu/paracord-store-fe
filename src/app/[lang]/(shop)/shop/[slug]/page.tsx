import type { LandingDict } from "@/features/landing/types";
import { ProductDetailContent } from "@/features/shop/ProductDetailContent";
import type { ShopDict } from "@/features/shop/types";
import { ProductDetailGallery } from "@/features/shop/ProductDetailGallery";
import { ProductDetailInfo } from "@/features/shop/ProductDetailInfo";
import { getProductBySlug } from "@/features/shop/resolveProducts";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;
  const shopDict = dict.shop as ShopDict | undefined;

  if (!shopDict?.productDetail) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-brand-text-medium">Product detail is not available.</p>
      </div>
    );
  }

  const product = getProductBySlug(slug, dict.products);
  if (!product) notFound();

  const base = `/${lang}`;
  const categoryLabel = shopDict.categories[product.category] ?? shopDict.productDetail.breadcrumb.customGear;

  return (
    <div className="min-h-screen bg-brand-bg-primary">
      <div className="border-y border-brand-border bg-black">
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-text-medium">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href={base} className="hover:text-brand-accent hover:underline">
                  {shopDict.productDetail.breadcrumb.home}
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href={`${base}/shop`} className="hover:text-brand-accent hover:underline">
                  {categoryLabel}
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li className="text-brand-text-high font-medium" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
          <ProductDetailGallery product={product} dict={shopDict.productDetail} />
          <div className="flex h-full min-h-0 flex-col">
            <ProductDetailInfo
            product={product}
            lang={lang}
            dict={shopDict.productDetail}
            />
          </div>
        </div>

        <ProductDetailContent dict={shopDict.productDetail} />
      </div>
    </div>
  );
}
