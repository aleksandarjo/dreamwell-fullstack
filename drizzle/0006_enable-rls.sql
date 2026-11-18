ALTER TABLE "properties" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "property_images" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "properties" FROM "anon", "authenticated";
REVOKE ALL ON TABLE "property_images" FROM "anon", "authenticated";
