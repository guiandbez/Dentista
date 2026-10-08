"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = [
      [".hero-content > *", "fade-up", 55],
      [".hero-portrait", "fade-up", 0],
      [".about-photo", "fade-left", 0],
      [".about-copy > *", "fade-up", 65],
      [".clinic-photo", "fade-up", 80],
      [".treatments .center-heading > *", "fade-up", 65],
      [".treatment-card", "fade-up", 50],
      [".results .center-heading > *", "fade-up", 65],
      [".gallery figure", "fade-up", 90],
      [".contact-content > *", "fade-up", 65],
      [".footer-main > *", "fade-up", 70],
    ] as const;

    for (const [selector, animation, delayStep] of groups) {
      container.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.dataset.reveal = animation;
      element.style.setProperty("--reveal-delay", `${Math.min(index * delayStep, 200)}ms`);
      });
    }

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    container.classList.add("scroll-reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="scroll-reveal-container">{children}</div>;
}
