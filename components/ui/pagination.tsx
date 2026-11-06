import { cn } from "cn";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { PaginationLeftIcon, PaginationRightIcon } from "@/constants/icons";

type PaginationLinkProps = ComponentProps<typeof Link> & {
  isActive?: boolean;
};

type PaginationArrowProps = {
  href?: string;
  label: string;
  children: ReactNode;
};

const PAGE_ITEM = "text-grey shadow-main size-9 rounded-lg bg-white p-0 text-base font-normal sm:size-10 xl:size-11";

function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return <nav aria-label="Pagination" data-slot="pagination" className={cn("w-full", className)} {...props} />;
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 xl:gap-4 2xl:gap-6", className)}
      {...props}
    />
  );
}

function PaginationItem(props: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({ className, isActive, href, children, ...props }: PaginationLinkProps) {
  if (isActive) {
    return (
      <span
        aria-current="page"
        data-slot="pagination-link"
        className={cn(buttonVariants(), PAGE_ITEM, "bg-primary pointer-events-none text-white", className)}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      data-slot="pagination-link"
      className={cn(buttonVariants({ variant: "ghost" }), PAGE_ITEM, className)}
      {...props}
    >
      {children}
    </Link>
  );
}

function PaginationArrow({ href, label, children }: PaginationArrowProps) {
  const className = cn(buttonVariants({ variant: "ghost" }), "h-10 w-7 sm:w-10");

  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={label}
        className={cn(className, "pointer-events-none opacity-30")}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {children}
    </Link>
  );
}

function PaginationPrevious({ href }: { href?: string }) {
  return (
    <PaginationArrow href={href} label="Go to previous page">
      <PaginationLeftIcon className="size-auto" />
    </PaginationArrow>
  );
}

function PaginationNext({ href }: { href?: string }) {
  return (
    <PaginationArrow href={href} label="Go to next page">
      <PaginationRightIcon className="size-auto" />
    </PaginationArrow>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(PAGE_ITEM, "flex items-center justify-center", className)}
      {...props}
    >
      ....
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
