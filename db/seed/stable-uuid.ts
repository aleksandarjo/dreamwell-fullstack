import { createHash } from "node:crypto";

const SEED_NAMESPACE = "dc6d222c-9e4c-4654-b4e0-959d8aba35d2";

/** Name-based UUID (version 5): the same name always yields the same id. */
export function stableUuid(name: string): string {
  const hash = createHash("sha1")
    .update(Buffer.from(SEED_NAMESPACE.replaceAll("-", ""), "hex"))
    .update(name)
    .digest();

  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;

  const hex = hash.subarray(0, 16).toString("hex");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
