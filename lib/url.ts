type QueryValue = string | string[] | null;

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
