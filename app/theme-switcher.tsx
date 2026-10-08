"use client";

import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { restoreThemePreference, saveThemePreference, themeOptions, type Theme } from "./theme-preference";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("main");
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(restoreThemePreference(document.documentElement, window.localStorage));
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function selectTheme(nextTheme: Theme) {
    document.documentElement.classList.add("theme-transition");
    saveThemePreference(nextTheme, document.documentElement, window.localStorage);
    setTheme(nextTheme);
    setOpen(false);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition"), 350);
  }

  return (
    <div className="theme-switcher" ref={switcherRef}>
      <button
        type="button"
        className="theme-switcher-trigger"
        aria-label="Escolher tema do site"
        aria-expanded={open}
        aria-controls="theme-switcher-options"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <Palette size={17} strokeWidth={1.7} aria-hidden="true" />
      </button>
      {open && (
        <div className="theme-switcher-options" id="theme-switcher-options" role="group" aria-label="Temas disponíveis">
          {themeOptions.map((option) => (
            <button
              type="button"
              className="theme-option"
              key={option.id}
              aria-pressed={theme === option.id}
              onClick={() => selectTheme(option.id)}
            >
              <span className={`theme-swatch theme-swatch-${option.id}`} aria-hidden="true" />
              <span>{option.label}</span>
              {theme === option.id && <span className="theme-option-check" aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
