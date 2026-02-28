import { z } from "zod";

const VN_PHONE_DIGITS = 10;

export interface CheckoutValidationMessages {
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
}

export function checkoutSchema(m: CheckoutValidationMessages) {
  return z.object({
    email: z
      .string()
      .min(1, m.emailRequired)
      .email(m.emailInvalid),
    phone: z
      .string()
      .min(1, m.phoneRequired)
      .refine((v) => {
        const digits = v.replaceAll(/\D/g, "");
        return digits.length === VN_PHONE_DIGITS && /^0[3-9]\d{8}$/.test(digits) || (digits.length === 11 && /^84[3-9]\d{8}$/.test(digits));
      }, m.phoneInvalid),
    firstName: z
      .string()
      .min(1, m.firstNameRequired)
      .min(2, m.nameMinLength),
    lastName: z
      .string()
      .min(1, m.lastNameRequired)
      .min(2, m.nameMinLength),
    address: z
      .string()
      .min(1, m.addressRequired)
      .min(5, m.addressMinLength),
    apartment: z.string().optional(),
    province: z.string().min(1, m.provinceRequired),
    district: z.string().min(1, m.districtRequired),
    ward: z.string().min(1, m.wardRequired),
  });
}

export type CheckoutFormValues = z.infer<ReturnType<typeof checkoutSchema>>;
