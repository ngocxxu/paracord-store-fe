import { z } from "zod";

export interface TrackOrderValidationMessages {
  phoneRequired: string;
  phoneInvalid: string;
}

const PHONE_REGEX = /^[\d\s\-+()]{9,20}$/;

export function trackOrderSchema(m: TrackOrderValidationMessages) {
  return z.object({
    phone: z
      .string({ required_error: m.phoneRequired })
      .min(1, m.phoneRequired)
      .regex(PHONE_REGEX, m.phoneInvalid),
  });
}

export type TrackOrderFormValues = z.infer<ReturnType<typeof trackOrderSchema>>;
