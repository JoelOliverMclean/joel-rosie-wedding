"use client";

import Link from "next/link";
import DesktopLinks from "@/app/desktop-links";
import MobileNav from "@/app/mobile-nav";
import { links } from "@/components/NavigationLinks";
import { usePathname } from "next/navigation";

export default function WebsiteHeader({ canAccess }: { canAccess: boolean }) {
  const pathname = usePathname();

  return (
    <header className="header pb-2">
      <div className="header__inner container">
        <Link className={"brand"} href={"/"}>
          <span className={"brand__prefix"}>The Wedding of</span>
          <span className="brand__name">Joel &amp; Rosie</span>
          <span className="brand__tag">A Party of Special Magnificence</span>
        </Link>

        <DesktopLinks links={links} canAccess={canAccess} />
      </div>
      <MobileNav links={links} canAccess={canAccess} />
    </header>
  );
}
