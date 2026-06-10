"use client";

import posthog from "posthog-js";
import type { ReactNode } from "react";

interface WaCtaProps {
  href: string;
  section: string;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}

export function WaCta({ href, section, className, "aria-label": ariaLabel, children }: WaCtaProps) {
  const handleClick = () => {
    posthog.capture("whatsapp_cta_clicked", {
      section,
      page: "home",
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
