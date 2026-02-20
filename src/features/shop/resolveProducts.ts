import { SHOP_PRODUCTS } from "./data";
import type { ResolvedShopProduct, ShopProductItem } from "./types";

type ProductsDict = Record<string, { title: string; description: string }>;

export function resolveShopProducts(dict: ProductsDict): ResolvedShopProduct[] {
  return SHOP_PRODUCTS.map((item: ShopProductItem) => {
    const productDict = dict[item.titleKey];
    return {
      id: item.id,
      slug: item.slug,
      title: productDict?.title ?? item.slug,
      description: productDict?.description ?? "",
      price: item.price,
      priceNum: item.priceNum,
      imageSrc: item.imageSrc,
      imageAlt: item.imageAlt,
      badge: item.badge,
      colorSwatches: item.colorSwatches,
      category: item.category,
      cordType: item.cordType,
      filterColors: item.filterColors,
    };
  });
}
