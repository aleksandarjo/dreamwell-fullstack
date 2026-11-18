export const PROPERTY_IMAGES_BUCKET = "property-images";

/** URL path under which Supabase serves objects of the public property images bucket. */
export const PROPERTY_IMAGES_PUBLIC_PATH = `/storage/v1/object/public/${PROPERTY_IMAGES_BUCKET}`;

/** Parses NEXT_PUBLIC_SUPABASE_URL, accepting only a bare http(s) origin such as https://<ref>.supabase.co. */
export function parseSupabaseUrl(value: string): URL {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`NEXT_PUBLIC_SUPABASE_URL is not a valid URL: "${value}"`);
  }

  const isHttp = url.protocol === "https:" || url.protocol === "http:";
  const isBareOrigin = url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;

  if (!isHttp || !isBareOrigin) {
    throw new Error(
      `NEXT_PUBLIC_SUPABASE_URL must be a bare origin like https://<project-ref>.supabase.co, got "${value}"`
    );
  }

  return url;
}

export function getPropertyImageUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
  }

  const segments = path.split("/");

  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`Invalid property image path: "${path}"`);
  }

  if (segments[0] === PROPERTY_IMAGES_BUCKET) {
    throw new Error(
      `Property image path must be relative to the bucket, without "${PROPERTY_IMAGES_BUCKET}/": "${path}"`
    );
  }

  const { origin } = parseSupabaseUrl(supabaseUrl);

  return `${origin}${PROPERTY_IMAGES_PUBLIC_PATH}/${segments.map(encodeURIComponent).join("/")}`;
}
