"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";

type Link = { href: string; label: string };

export default function MobileNav({
  links,
  canAccess,
}: {
  links: Link[];
  canAccess: boolean;
}) {
  const pathname = usePathname();
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

  if (!canAccess) {
    if (pathname.includes("rsvp")) return;
    return (
      <div className="mnav flex w-full flex-col px-4 pb-2">
        <a href={"/rsvp"} className="btn btn--primary">
          RSVP
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mnav flex w-full justify-evenly p-2">
        {links.map((l) => (
          <a
            key={l.href}
            className={`nav__link ${pathname.includes(l.href) ? "glow-soft btn--ghost-selected" : "glow-hover-soft"} btn btn--ghost`}
            href={l.href}
          >
            {l.label}
          </a>
        ))}
        <a
          className="btn btn--primary"
          href="/rsvp"
          onClick={() => setOpen(false)}
        >
          RSVP
        </a>
      </div>
      {/*<div className={"flex w-full items-center justify-center p-2"}>*/}

      {/*</div>*/}
      {/*<button*/}
      {/*  type="button"*/}
      {/*  className="btn btn--ghost btn--icon mnav__btn"*/}
      {/*  aria-label="Open menu"*/}
      {/*  aria-expanded={open}*/}
      {/*  aria-controls={panelId}*/}
      {/*  onClick={() => setOpen((v) => !v)}*/}
      {/*>*/}
      {/*  <span className="mnav__icon" aria-hidden="true">*/}
      {/*    /!* simple hamburger / close *!/*/}
      {/*    {open ? "✕" : "☰"}*/}
      {/*  </span>*/}
      {/*  <span className="btn__text">Menu</span>*/}
      {/*</button>*/}

      {/*/!* Scrim *!/*/}
      {/*{open && (*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    className="mnav__scrim"*/}
      {/*    aria-label="Close menu"*/}
      {/*    onClick={() => setOpen(false)}*/}
      {/*  />*/}
      {/*)}*/}

      {/*<div*/}
      {/*  id={panelId}*/}
      {/*  className={`mnav__panel ${open ? "mnav__panel--open" : ""}`}*/}
      {/*  role="dialog"*/}
      {/*  aria-modal="true"*/}
      {/*>*/}
      {/*  <div className="mnav__panelInner">*/}
      {/*    <div className="mnav__title">Navigation</div>*/}

      {/*    <nav className="mnav__links" aria-label="Mobile">*/}
      {/*      {links.map((l) => (*/}
      {/*        <a*/}
      {/*          key={l.href}*/}
      {/*          className="mnav__link"*/}
      {/*          href={l.href}*/}
      {/*          onClick={() => setOpen(false)}*/}
      {/*        >*/}
      {/*          {l.label}*/}
      {/*        </a>*/}
      {/*      ))}*/}
      {/*    </nav>*/}

      {/*    <a*/}
      {/*      className="btn btn--primary mnav__cta"*/}
      {/*      href="/rsvp"*/}
      {/*      onClick={() => setOpen(false)}*/}
      {/*    >*/}
      {/*      RSVP*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
