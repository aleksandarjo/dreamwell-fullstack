import { readFile } from "node:fs/promises";
import path from "node:path";

import { config } from "dotenv";

import { getPropertyImageUrl, parseSupabaseUrl, PROPERTY_IMAGES_BUCKET } from "../../lib/storage";
import { seedImagePaths } from "./property-images";

config({ path: ".env.local", quiet: true });

const ASSETS_DIR = path.join(process.cwd(), "db/seed/assets");

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

async function isPubliclyAvailable(storagePath: string): Promise<boolean> {
  const response = await fetch(getPropertyImageUrl(storagePath), { method: "HEAD" });

  return response.ok && response.headers.get("content-type") === "image/webp";
}

async function readError(response: Response): Promise<string> {
  const body = await response.text();

  try {
    const { error, message } = JSON.parse(body) as { error?: string; message?: string };
    return `${response.status} ${error ?? ""} ${message ?? ""}`.trim();
  } catch {
    return `${response.status} ${body.slice(0, 200)}`;
  }
}

async function uploadSeedImages() {
  const { origin } = parseSupabaseUrl(getEnv("NEXT_PUBLIC_SUPABASE_URL"));
  const secretKey = getEnv("SUPABASE_SECRET_KEY");

  const uploaded: string[] = [];
  const skipped: string[] = [];
  const failed: { path: string; reason: string }[] = [];

  for (const storagePath of seedImagePaths) {
    try {
      if (await isPubliclyAvailable(storagePath)) {
        skipped.push(storagePath);
        continue;
      }

      const file = await readFile(path.join(ASSETS_DIR, storagePath));
      const objectPath = storagePath.split("/").map(encodeURIComponent).join("/");

      const response = await fetch(`${origin}/storage/v1/object/${PROPERTY_IMAGES_BUCKET}/${objectPath}`, {
        method: "POST",
        headers: {
          apikey: secretKey,
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "image/webp",
          "x-upsert": "false",
        },
        body: file,
      });

      if (response.ok) {
        uploaded.push(storagePath);
        continue;
      }

      const reason = await readError(response);

      if (response.status === 409 || /duplicate|already exists/i.test(reason)) {
        skipped.push(storagePath);
      } else {
        failed.push({ path: storagePath, reason });
      }
    } catch (error) {
      failed.push({ path: storagePath, reason: error instanceof Error ? error.message : String(error) });
    }
  }

  const unavailable: string[] = [];

  for (const storagePath of seedImagePaths) {
    if (!(await isPubliclyAvailable(storagePath))) {
      unavailable.push(storagePath);
    }
  }

  console.log(`Uploaded: ${uploaded.length}`);
  console.log(`Skipped (already in storage): ${skipped.length}`);
  console.log(`Failed: ${failed.length}`);
  failed.forEach(({ path, reason }) => console.log(`  ${path}: ${reason}`));
  console.log(`Publicly available: ${seedImagePaths.length - unavailable.length}/${seedImagePaths.length}`);
  unavailable.forEach((storagePath) => console.log(`  not available: ${storagePath}`));

  if (failed.length > 0 || unavailable.length > 0) {
    process.exitCode = 1;
  }
}

uploadSeedImages().catch((error) => {
  console.error("Seed image upload failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
