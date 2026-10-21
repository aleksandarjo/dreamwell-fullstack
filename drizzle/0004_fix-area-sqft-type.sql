ALTER TABLE "properties"
ALTER COLUMN "area_sqft"
TYPE integer
USING ROUND("area_sqft")::integer;