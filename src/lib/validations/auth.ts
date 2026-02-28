import { z } from "zod";

export interface SignInValidationMessages {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
}

export interface SignUpValidationMessages extends SignInValidationMessages {
  confirmRequired: string;
  passwordMismatch: string;
}

const MIN_PASSWORD_LENGTH = 8;

export function signInSchema(m: SignInValidationMessages) {
  return z.object({
    email: z
      .string({ required_error: m.emailRequired })
      .min(1, m.emailRequired)
      .email(m.emailInvalid),
    password: z
      .string({ required_error: m.passwordRequired })
      .min(1, m.passwordRequired)
      .min(MIN_PASSWORD_LENGTH, m.passwordMin),
  });
}

export function signUpSchema(m: SignUpValidationMessages) {
  return z
    .object({
      email: z
        .string({ required_error: m.emailRequired })
        .min(1, m.emailRequired)
        .email(m.emailInvalid),
      password: z
        .string({ required_error: m.passwordRequired })
        .min(1, m.passwordRequired)
        .min(MIN_PASSWORD_LENGTH, m.passwordMin),
      confirmPassword: z
        .string({ required_error: m.confirmRequired })
        .min(1, m.confirmRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: m.passwordMismatch,
      path: ["confirmPassword"],
    });
}

export type SignInFormValues = z.infer<ReturnType<typeof signInSchema>>;
export type SignUpFormValues = z.infer<ReturnType<typeof signUpSchema>>;
