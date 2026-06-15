import type { Metadata } from "next";
import { Metamorphous } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/app/theme-toggle";
import MobileNav from "./mobile-nav";
import { links } from "@/components/NavigationLinks";
import { canAccessSite } from "@/utils/cookieUtils";
import DesktopLinks from "@/app/desktop-links";

const metamorphous = Metamorphous({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joel & Rosie's Wedding",
  description: "For the wedding of Joel and Rosie",
};

function ThemeScript() {
  const code = `
(function () {
  try {
    var stored = localStorage.getItem('theme'); // 'light' | 'dark' | null
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`.trim();

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const canAccess = await canAccessSite();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${metamorphous.className} antialiased`}>
        <ThemeScript />

        <div className="site">
          {/* Background layers (persistent) */}
          <div className="site-bg" aria-hidden="true">
            <div className="site-bg__base" />
            <div className="site-bg__wash" />
            <div className="site-bg__glow site-bg__glow--a" />
            <div className="site-bg__glow site-bg__glow--b" />
            <div className="site-bg__grain" />
          </div>

          {/* Header (persistent) */}
          <header className="header">
            <div className="header__inner container">
              <Link className={"brand"} href={"/"}>
                <span className={"brand__prefix"}>The Wedding of</span>
                <span className="brand__name">Joel &amp; Rosie</span>
                <span className="brand__tag">
                  A Party of Special Magnificence
                </span>
              </Link>

              {canAccess && (
                <DesktopLinks links={links} canAccess={canAccess} />
              )}
            </div>
            <MobileNav links={links} canAccess={canAccess} />
          </header>

          {/* Page content */}
          <main className="main container">{children}</main>

          {/* Footer (persistent) */}
          <footer className="footer">
            <div className="footer__inner container md:items-center">
              <span className="muted">Joel & Rosie Wedding</span>
              <div
                className={
                  "flex flex-col items-end gap-5 md:flex-row md:items-center"
                }
              >
                <span className="muted text-end">© 2026 Joel Mclean</span>
                <ThemeToggle />
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
