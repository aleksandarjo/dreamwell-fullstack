"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, type ComponentProps } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { updateUrlQuery } from "@/lib/url";

type UrlPaginationProps = ComponentProps<typeof Pagination> & {
  page: number;
  totalPages: number;
};

function getPageItems(page: number, totalPages: number) {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])].filter(
    (item) => item >= 1 && item <= totalPages
  );

  return pages.flatMap((item, index) => {
    const gap = item - (pages[index - 1] ?? 0);

    if (gap === 1) return [item];

    return gap === 2 ? [item - 1, item] : [null, item];
  });
}

export default function UrlPagination({ page, totalPages, ...props }: UrlPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getPageHref = (target: number) =>
    updateUrlQuery({
      pathname,
      params: searchParams.toString(),
      updates: { page: target === 1 ? null : String(target) },
    });

  if (totalPages <= 1) return null;

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={page > 1 ? getPageHref(page - 1) : undefined} />
        </PaginationItem>

        {getPageItems(page, totalPages).map((item, index) => (
          <PaginationItem key={item ?? `ellipsis-${index}`}>
            {item === null ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={getPageHref(item)} isActive={item === page}>
                <span className="sr-only">Page </span>
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={page < totalPages ? getPageHref(page + 1) : undefined} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
