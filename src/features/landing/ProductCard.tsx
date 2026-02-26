import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ResolvedProduct } from "./types";

interface ProductCardProps extends ResolvedProduct {
  locale: string;
  detailHref?: string;
}

export function ProductCard({
  slug,
  title,
  description,
  price,
  imageSrc,
  imageAlt,
  locale,
  badge,
  colorSwatches,
  detailHref,
}: ProductCardProps) {
  const href = detailHref ?? `/${locale}/builder`;
  return (
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden border-brand-border bg-brand-bg-card shadow-card transition-transform duration-200 group-hover:scale-[1.02]">
        <CardHeader className="relative p-0">
          <div
            className={cn(
              "aspect-square w-full",
              !imageSrc && "bg-brand-bg-surface"
            )}
          >
            {imageSrc ? (
              <ImageWithFallback
                src={imageSrc}
                alt={imageAlt ?? title}
                width={400}
                height={400}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            ) : null}
            {badge ? (
              <Badge
                className={cn(
                  "absolute left-2 top-2 uppercase",
                  badge === "bestseller" && "bg-brand-accent text-brand-text-high",
                  badge === "limited" && "bg-brand-olive text-brand-text-high"
                )}
              >
                {badge === "bestseller" ? "Best Seller" : "Limited"}
              </Badge>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-brand-text-high">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-brand-text-medium">
            {description}
          </p>
          <p className="mt-2 font-medium text-brand-text-high">{price}</p>
        </CardContent>
        {colorSwatches?.length ? (
          <CardFooter className="flex gap-2 px-4 pb-4">
            {colorSwatches.map((hex, i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full border border-brand-border"
                style={{ backgroundColor: hex }}
                aria-hidden
              />
            ))}
          </CardFooter>
        ) : null}
      </Card>
    </Link>
  );
}
