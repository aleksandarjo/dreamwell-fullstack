CREATE TYPE "public"."currency" AS ENUM('EUR', 'USD', 'GBP');--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "currency" "currency" DEFAULT 'EUR' NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "country" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "state" varchar(100);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "garage_spaces" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "cover_image" text;