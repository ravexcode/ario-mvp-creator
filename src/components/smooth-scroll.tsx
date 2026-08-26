"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      REDUCED_MOTION_QUERY
    ).matches;

    // Don't initialize smooth scrolling when the user
    // explicitly prefers reduced motion.
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      autoRaf: true,
    });

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;

      // Don't interfere with modified clicks.
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (!href || href === "#") return;

      let targetElement: HTMLElement | null = null;

      try {
        targetElement = document.querySelector<HTMLElement>(href);
      } catch {
        // Invalid CSS selector in href.
        return;
      }

      if (!targetElement) return;

      event.preventDefault();

      lenis.scrollTo(targetElement, {
        offset: -72,
      });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
