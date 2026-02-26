import Link from "next/link";
import type { ProductDetailDict } from "./types";

interface ProductDetailContentProps {
  readonly dict: ProductDetailDict;
}

export function ProductDetailContent({ dict }: ProductDetailContentProps) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 border-t border-brand-border pt-12 md:grid-cols-3">
      <section>
        <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high">
          {dict.material.title}
        </h2>
        <p className="mt-3 text-sm text-brand-text-medium">{dict.material.body}</p>
        <Link
          href="#"
          className="mt-2 inline-block text-sm font-medium uppercase text-brand-accent hover:underline"
        >
          {dict.material.exploreLink} →
        </Link>
      </section>
      <section>
        <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high">
          {dict.hardware.title}
        </h2>
        <p className="mt-3 text-sm text-brand-text-medium">{dict.hardware.body}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {dict.hardware.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-border bg-brand-bg-surface px-3 py-1 text-xs font-medium uppercase text-brand-text-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high">
          {dict.builtToOrder.title}
        </h2>
        <p className="mt-3 text-sm text-brand-text-medium">{dict.builtToOrder.body}</p>
        <p className="mt-3 text-xs font-medium uppercase text-brand-accent">
          {dict.builtToOrder.handmadeLabel}
        </p>
      </section>
    </div>
  );
}
