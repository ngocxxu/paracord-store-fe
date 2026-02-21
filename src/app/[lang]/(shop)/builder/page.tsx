import { getDictionary } from "@/lib/dictionary";
import { BuilderCanvas } from "@/features/custom-builder/components/BuilderCanvas";
import { BuilderConfigBar } from "@/features/custom-builder/components/BuilderConfigBar";
import { BuilderSidebar } from "@/features/custom-builder/components/BuilderSidebar";
import type { BuilderDict } from "@/features/custom-builder/types";

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const builderDict = dict.builder as BuilderDict;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-brand-bg-primary">
      <div className="border-y border-brand-border bg-black">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-heading font-bold uppercase tracking-tight text-brand-text-high md:text-2xl">
            {builderDict.title}
          </h1>
        </div>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row">
        <BuilderSidebar dict={builderDict} />
        <BuilderCanvas dict={builderDict} />
      </div>
      <BuilderConfigBar lang={lang} dict={builderDict} />
    </div>
  );
}
