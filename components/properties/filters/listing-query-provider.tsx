"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, use, useOptimistic, useTransition, type ReactNode } from "react";

import { updateUrlQuery } from "@/lib/url";

type ListingQuery = {
  searchParams: URLSearchParams;
  updateQuery: (updates: Parameters<typeof updateUrlQuery>[0]["updates"]) => void;
};

const ListingQueryContext = createContext<ListingQuery | null>(null);

export default function ListingQueryProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const [query, setOptimisticQuery] = useOptimistic(urlSearchParams.toString());
  const [, startTransition] = useTransition();

  const updateQuery: ListingQuery["updateQuery"] = (updates) => {
    const url = updateUrlQuery({ pathname, params: query, updates, keysToRemove: ["page"] });

    startTransition(() => {
      setOptimisticQuery(url.split("?")[1] ?? "");
      router.push(url);
    });
  };

  return (
    <ListingQueryContext value={{ searchParams: new URLSearchParams(query), updateQuery }}>
      {children}
    </ListingQueryContext>
  );
}

export function useListingQuery() {
  const context = use(ListingQueryContext);

  if (!context) throw new Error("useListingQuery must be used within ListingQueryProvider");

  return context;
}
