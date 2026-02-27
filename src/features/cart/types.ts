export type CartItemType = "product" | "builder";

export interface CartItem {
  id: string;
  type: CartItemType;
  productId: string;
  name: string;
  unitPrice: number;
  displayPrice: string;
  imageSrc?: string;
  imageAlt?: string;
  optionsSummary: string;
  quantity: number;
}

export interface CartDict {
  title: string;
  itemSingular: string;
  itemPlural: string;
  emptyTitle: string;
  emptySubtitle: string;
  emptyCta: string;
  handmadeLabel: string;
  lifetimeGuaranteeLabel: string;
  summary: {
    title: string;
    subtotal: string;
    shipping: string;
    shippingFree: string;
    tax: string;
    total: string;
    checkoutCta: string;
    note: string;
  };
}

export type AddItemPayload = Omit<CartItem, "id" | "quantity"> & { quantity?: number };
