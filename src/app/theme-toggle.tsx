// app/theme-toggle.tsx
"use client";

import { useEffect, useState } from "react";
import LightIcon from "next/dist/client/components/react-dev-overlay/ui/icons/light-icon";
import DarkIcon from "next/dist/client/components/react-dev-overlay/ui/icons/dark-icon";
import { save } from "effect/TestClock";

function getCurrentTheme(): string {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");

  // Sync initial state after hydration (ThemeScript sets data-theme before paint)
  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggle() {
    const next: string = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  const isDark = () => theme === "dark";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      if (theme !== savedTheme) {
        toggle()
      }
    }
  }, []);

  return (
    <button
      type="button"
      className="btn btn--ghost btn--icon"
      aria-label="Toggle dark mode"
      aria-pressed={isDark()}
      onClick={toggle}
    >
      <span className="btn__icon" aria-hidden="true">
        {isDark() ? <LightIcon /> : <DarkIcon />}
      </span>
      <span className="btn__text">{isDark()  ? "Dark" : "Light"}</span>
    </button>
  );
}
