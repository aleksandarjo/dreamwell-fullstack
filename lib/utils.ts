export { cn } from "cn";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

export function formatArea(areaSqft: number) {
  return `${areaSqft.toLocaleString("en-US")} sqft`;
}
