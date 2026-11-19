ALTER TABLE "properties" ADD COLUMN "postal_code" varchar(10);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "neighborhood" varchar(100);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "garage_area_sqft" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "year_built" smallint;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "features" text[] DEFAULT '{}' NOT NULL;