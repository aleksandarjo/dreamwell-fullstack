import type { ReactNode } from "react";

type DataRendererProps<T> = {
  data: T[] | null | undefined;
  empty: ReactNode;
  render: (data: T[]) => ReactNode;
};

export default function DataRenderer<T>({ data, empty, render }: DataRendererProps<T>) {
  if (!data?.length) return empty;

  return render(data);
}
