import type { SignInValidationMessages, SignUpValidationMessages } from "@/lib/validations/auth";

export interface SignInDict {
  backToHome: string;
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submit: string;
  or: string;
  continueWithGoogle: string;
  forgotPassword: string;
  newUser: string;
  createAccount: string;
  footerTagline: string;
  validation: SignInValidationMessages;
}

export interface SignUpDict {
  backToHome: string;
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  submit: string;
  or: string;
  continueWithGoogle: string;
  alreadyHaveAccount: string;
  signIn: string;
  footerTagline: string;
  validation: SignUpValidationMessages;
}
