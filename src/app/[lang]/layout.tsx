import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import type { LandingDict } from "@/features/landing/types";
import { getDictionary } from "@/lib/dictionary";

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
