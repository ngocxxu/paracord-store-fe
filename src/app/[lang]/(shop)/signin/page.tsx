import { SignInPage } from "@/features/auth/SignInPage";
import type { LandingDict } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

export default async function SignInRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;

  if (!dict.auth?.signIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-brand-text-medium">Sign in is not available.</p>
      </div>
    );
  }

  return <SignInPage lang={lang} dict={dict.auth.signIn} />;
}
