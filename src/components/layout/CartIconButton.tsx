"use client";

import { useCartStore } from "@/features/cart/store";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartIconButtonProps {
  basePath: string;
  ariaLabel: string;
  className?: string;
}

export function CartIconButton({ basePath, ariaLabel, className }: Readonly<CartIconButtonProps>) {
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const label = itemCount > 0 ? `${ariaLabel} (${itemCount})` : ariaLabel;

  return (
    <Link
      href={`${basePath}/cart`}
      className={cn(
        "relative rounded p-2 text-brand-text-high hover:bg-brand-bg-card",
        className
      )}
      aria-label={label}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {itemCount > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-accent px-1 text-[0.65rem] font-bold text-white"
          aria-hidden
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
