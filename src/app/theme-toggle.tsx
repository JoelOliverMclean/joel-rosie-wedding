// app/theme-toggle.tsx
"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync initial state after hydration (ThemeScript sets data-theme before paint)
  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="btn btn--ghost btn--icon"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={toggle}
    >
      <span className="btn__icon" aria-hidden="true">
        {isDark ? "◑" : "◐"}
      </span>
      <span className="btn__text">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
