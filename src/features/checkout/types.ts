import type { CartItem } from "@/features/cart/types";

export interface CheckoutDict {
  title: string;
  subtitle: string;
  breadcrumb: {
    cart: string;
    information: string;
    shipping: string;
    payment: string;
  };
  contact: {
    title: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    loginPrompt: string;
    loginLink: string;
  };
  shipping: {
    title: string;
    fullNameLabel: string;
    firstNameLabel: string;
    lastNameLabel: string;
    addressLabel: string;
    apartmentPlaceholder: string;
    provinceLabel: string;
    districtLabel: string;
    wardLabel: string;
    selectProvince: string;
    selectDistrict: string;
    selectWard: string;
  };
  payment: {
    title: string;
    body: string;
    cardNameLabel: string;
    cardNumberLabel: string;
    expiryLabel: string;
    cvcLabel: string;
  };
  orderNotes: {
    label: string;
    placeholder: string;
  };
  summary: {
    orderSummaryTitle: string;
    subtotal: string;
    shippingLabel: string;
    shippingCalculatedNextStep: string;
    estimatedTaxes: string;
    total: string;
    placeOrderCta: string;
    reviewOrderCta: string;
    disclaimer: string;
  };
  returnToCart: string;
  proceedToPayment: string;
  guarantee: {
    secureCheckout: string;
    freeBuildShip: string;
  };
  emptyTitle: string;
  emptySubtitle: string;
  emptyCta: string;
  validation: {
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    phoneInvalid: string;
    firstNameRequired: string;
    lastNameRequired: string;
    nameMinLength: string;
    addressRequired: string;
    addressMinLength: string;
    provinceRequired: string;
    districtRequired: string;
    wardRequired: string;
  };
}

export interface OrderThankYouDict {
  title: string;
  message: string;
  confirmationNumber: string;
  printReceipt: string;
  orderSummary: string;
  subtotal: string;
  shippingCalculatedOnConfirmation: string;
  totalCharged: string;
  contactInformation: string;
  primaryEmail: string;
  confirmationPhone: string;
  shippingTo: string;
  whatsNextTitle: string;
  whatsNextBody: string;
  backToShop: string;
  needHelp: string;
  supportEmail: string;
}

export interface OrderConfirmationPayload {
  orderId: string;
  email: string;
  phone?: string;
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    province: string;
    district: string;
    ward: string;
  };
  items: CartItem[];
  subtotal: number;
  total: number;
}

