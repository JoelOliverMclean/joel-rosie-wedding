"use client";

import { useEffect, useId, useState } from "react";

type Link = { href: string; label: string };

export default function MobileNav({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Optional: prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mnav">
      <button
        type="button"
        className="btn btn--ghost btn--icon mnav__btn"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mnav__icon" aria-hidden="true">
          {/* simple hamburger / close */}
          {open ? "✕" : "☰"}
        </span>
        <span className="btn__text">Menu</span>
      </button>

      {/* Scrim */}
      {open && (
        <button
          type="button"
          className="mnav__scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        id={panelId}
        className={`mnav__panel ${open ? "mnav__panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mnav__panelInner">
          <div className="mnav__title">Navigation</div>

          <nav className="mnav__links" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                className="mnav__link"
                href={l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            className="btn btn--primary mnav__cta"
            href="#rsvp"
            onClick={() => setOpen(false)}
          >
            RSVP
          </a>
        </div>
      </div>
    </div>
  );
}
