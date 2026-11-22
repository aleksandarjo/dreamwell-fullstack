"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ExpandableTextProps = {
  text: string;
  className?: string;
  collapsedClassName: string;
};

export default function ExpandableText({ text, className, collapsedClassName }: ExpandableTextProps) {
  const contentId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = textRef.current;

    if (!container || !content || isExpanded) return;

    const measure = () => setCanExpand(content.scrollHeight > container.clientHeight + 1);
    const observer = new ResizeObserver(measure);

    observer.observe(container);
    observer.observe(content);

    return () => observer.disconnect();
  }, [isExpanded]);

  const isCollapsed = !isExpanded;

  return (
    <div>
      <div
        ref={containerRef}
        id={contentId}
        className={cn(
          isCollapsed && ["overflow-hidden", collapsedClassName],
          isCollapsed && canExpand && "mask-b-from-40%"
        )}
      >
        <p ref={textRef} className={cn("whitespace-pre-line", className)}>
          {text}
        </p>
      </div>

      {canExpand && (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded((value) => !value)}
          className="text-primary focus-visible:ring-primary/50 mt-4 cursor-pointer rounded-sm text-sm font-medium underline underline-offset-4 outline-none hover:no-underline focus-visible:ring-3 sm:mt-5 sm:text-base"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
