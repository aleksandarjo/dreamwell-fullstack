"use client";

import type { MouseEvent } from "react";

import { OPEN_SCHEDULE_TOUR_EVENT, SCHEDULE_TOUR_SECTION_ID } from "@/constants";
import { ArrowRightIcon } from "@/constants/icons";

type ScheduleTourLinkProps = {
  className?: string;
};

export default function ScheduleTourLink({ className }: ScheduleTourLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.dispatchEvent(new Event(OPEN_SCHEDULE_TOUR_EVENT));
  }

  return (
    <a href={`#${SCHEDULE_TOUR_SECTION_ID}`} aria-label="Schedule a tour" onClick={handleClick} className={className}>
      <ArrowRightIcon />
    </a>
  );
}
