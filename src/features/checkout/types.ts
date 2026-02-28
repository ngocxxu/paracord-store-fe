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
    newsletterCheckbox: string;
  };
  shipping: {
    title: string;
    fullNameLabel: string;
    firstNameLabel: string;
    lastNameLabel: string;
    addressLabel: string;
    apartmentPlaceholder: string;
    cityLabel: string;
    stateLabel: string;
    postalCodeLabel: string;
    countryLabel: string;
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
    totalUsd: string;
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
}

