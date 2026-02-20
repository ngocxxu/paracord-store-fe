import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildShopQuery } from "./utils";
import type { ShopParams } from "./utils";
import type { ShopDict } from "./types";

interface ShopPaginationProps {
  basePath: string;
  params: ShopParams;
  totalPages: number;
  dict: ShopDict;
}

export function ShopPagination({ basePath, params, totalPages, dict }: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  const currentPage = params.page;
  const prevQuery = buildShopQuery({ ...params, page: currentPage - 1 }, params);
  const nextQuery = buildShopQuery({ ...params, page: currentPage + 1 }, params);

  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={basePath + prevQuery}
          className="rounded p-2 text-brand-text-high hover:bg-brand-bg-card"
          aria-label={dict.pagination.prev}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </Link>
      ) : (
        <span className="rounded p-2 text-brand-text-medium" aria-hidden>
          <ChevronLeft className="h-5 w-5" />
        </span>
      )}

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`e-${i}`} className="px-2 text-brand-text-medium">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={basePath + buildShopQuery({ ...params, page: p }, params)}
              className={`flex h-9 w-9 items-center justify-center rounded text-sm font-medium ${
                p === currentPage
                  ? "bg-brand-accent text-brand-text-high"
                  : "text-brand-text-high hover:bg-brand-bg-card"
              }`}
              aria-label={p === currentPage ? `Page ${p}` : `Go to page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={basePath + nextQuery}
          className="rounded p-2 text-brand-text-high hover:bg-brand-bg-card"
          aria-label={dict.pagination.next}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </Link>
      ) : (
        <span className="rounded p-2 text-brand-text-medium" aria-hidden>
          <ChevronRight className="h-5 w-5" />
        </span>
      )}
    </nav>
  );
}
