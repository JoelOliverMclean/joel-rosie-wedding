"use client";

import { usePathname } from "next/navigation";

type Link = { href: string; label: string };

export default function DesktopLinks({
  links,
  canAccess,
}: {
  links: Link[];
  canAccess: boolean;
}) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <nav className="nav nav--desktop items-center" aria-label="Primary">
        {canAccess &&
          links.map((l) => (
            <a
              key={l.href}
              className={`nav__link ${pathname.includes(l.href) ? "nav__link-hover glow-soft" : "glow-hover-soft"} px-2`}
              href={l.href}
            >
              {l.label}
            </a>
          ))}
        <a className="btn btn--primary rsvp--desktop" href="/rsvp">
          RSVP
        </a>
      </nav>

      {/*{!pathname.includes("rsvp") && (*/}
      {/*  <div className="header__actions">*/}
      {/*    <a className="btn btn--primary rsvp--desktop" href="/rsvp">*/}
      {/*      RSVP*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
