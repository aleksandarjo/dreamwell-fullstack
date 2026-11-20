import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSiteUrl } from "@/lib/url";

export type BreadcrumbEntry = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbEntry[];
  className?: string;
};

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = siteUrl && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ label, href }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: label,
      item: new URL(href, siteUrl).href,
    })),
  };

  return (
    <>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {items.map(({ label, href }, index) => {
            const isCurrentPage = index === items.length - 1;

            return (
              <Fragment key={href}>
                {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
                <BreadcrumbItem className={isCurrentPage ? "max-w-full min-w-0" : undefined}>
                  {isCurrentPage ? (
                    <BreadcrumbPage className="truncate">{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink render={<Link href={href} />}>{label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />}
    </>
  );
}
