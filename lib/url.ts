type QueryValue = string | string[] | null;

export function getSiteUrl(): URL | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL;

  if (!value) return null;

  const url = URL.parse(value);
  const isHttp = url?.protocol === "https:" || url?.protocol === "http:";
  const isBareOrigin = url?.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;

  if (!url || !isHttp || !isBareOrigin) {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be a bare origin like https://example.com, got "${value}"`);
  }

  return url;
}

type UpdateUrlQueryParams = {
  pathname: string;
  params: string;
  updates: Record<string, QueryValue>;
  keysToRemove?: string[];
};

export function updateUrlQuery({ pathname, params, updates, keysToRemove = [] }: UpdateUrlQueryParams) {
  const searchParams = new URLSearchParams(params);

  for (const [key, value] of Object.entries(updates)) {
    searchParams.delete(key);

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== "") searchParams.append(key, item);
      }
    } else if (value !== null && value !== "") {
      searchParams.set(key, value);
    }
  }

  for (const key of keysToRemove) {
    searchParams.delete(key);
  }

  const query = searchParams.toString();

  return query ? `${pathname}?${query}` : pathname;
}
