import { z } from "zod";

export interface NewsletterValidationMessages {
  emailRequired: string;
  emailInvalid: string;
}

export function newsletterSchema(m: NewsletterValidationMessages) {
  return z.object({
    email: z
      .string({ required_error: m.emailRequired })
      .min(1, m.emailRequired)
      .email(m.emailInvalid),
  });
}

export type NewsletterFormValues = z.infer<ReturnType<typeof newsletterSchema>>;
