export interface CheckoutDict {
  title: string;
  subtitle: string;
  contact: {
    title: string;
    emailLabel: string;
    phoneLabel: string;
    phonePlaceholder: string;
  };
  shipping: {
    title: string;
    fullNameLabel: string;
    addressLabel: string;
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
    placeOrderCta: string;
    reviewOrderCta: string;
    disclaimer: string;
  };
}

