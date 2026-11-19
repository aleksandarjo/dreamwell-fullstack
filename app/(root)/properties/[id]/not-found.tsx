import EmptyState from "@/components/shared/empty-state";
import { ROUTES } from "@/constants/routes";
import { PROPERTY_NOT_FOUND } from "@/constants/states";

export default function PropertyNotFound() {
  return (
    <div className="container">
      <EmptyState {...PROPERTY_NOT_FOUND} action={{ label: "Browse properties", href: ROUTES.LISTING }} />
    </div>
  );
}
