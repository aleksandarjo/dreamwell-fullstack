import { SearchXIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  message: string;
  action?: {
    label: string;
    href: string;
  };
};

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-20 text-center">
      <SearchXIcon aria-hidden className="text-primary size-12" />
      <h2 className="title-card text-dark-blue mt-6">{title}</h2>
      <p className="paragraph text-grey mt-3 max-w-md">{message}</p>
      {action && (
        <Link href={action.href} className={buttonVariants({ size: "lg", className: "mt-8" })}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
