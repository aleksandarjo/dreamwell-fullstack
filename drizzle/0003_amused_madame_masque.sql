ALTER TABLE "properties" RENAME COLUMN "area" TO "area_sqft";--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "property_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."property_type";--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('house', 'apartment', 'villa', 'bungalow', 'townhouse', 'loft', 'office', 'land');--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "property_type" SET DATA TYPE "public"."property_type" USING "property_type"::"public"."property_type";--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "country" SET DEFAULT 'USA';--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "state" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "latitude" numeric(10, 7);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "longitude" numeric(10, 7);--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "currency";--> statement-breakpoint
DROP TYPE "public"."currency";