import type { NextConfig } from "next";

import { parseSupabaseUrl, PROPERTY_IMAGES_PUBLIC_PATH } from "./lib/storage";

type RemotePatterns = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>;

// Allow next/image to optimize only objects from the public property images bucket.
// Without NEXT_PUBLIC_SUPABASE_URL no remote host is allowed (the app's previous behavior).
function getPropertyImagesPattern(): RemotePatterns {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value) return [];

  const url = parseSupabaseUrl(value);

  return [
    {
      protocol: url.protocol === "http:" ? "http" : "https",
      hostname: url.hostname,
      port: url.port,
      pathname: `${PROPERTY_IMAGES_PUBLIC_PATH}/**`,
      search: "",
    },
  ];
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: getPropertyImagesPattern(),
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
