import { getDictionary } from "@/lib/dictionary";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { LandingDict } from "@/features/landing/types";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)) as unknown as LandingDict;
  return (
    <>
      <TopBar text={dict.topBar} />
      <Header lang={lang} dict={dict} />
      <main>{children}</main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
