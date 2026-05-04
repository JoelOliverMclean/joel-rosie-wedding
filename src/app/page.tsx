import { Map } from "lucide-react";
import Link from "next/link";
import WeddingCountdown from "@/components/WeddingCountdown";
import { links } from "@/components/NavigationLinks";
import Image from "next/image";

const weddingDate = "2026-10-31T13:00:00Z";

import photo from "@/images/homepagephoto.jpeg"
import { canAccessSite } from "@/utils/cookieUtils";

export default async function HomePage() {
  const canAccess = await canAccessSite();

  return (
    <div className="stack">
      <section className="hero flex flex-col gap-10 py-5">
        <div className={"hero__grid"}>
          <div className="hero__left text-center">
            <h1 className="h1">
              You are invited
              <span className="h1__sub">to celebrate with us in</span>
            </h1>
            <div className={"pt-5"}>
              <WeddingCountdown targetIso={weddingDate} />
            </div>
            <div className={"muted small p-2"}>31st October 2026</div>

            <div className="quote">
              <span className="quote__line" />
              <p className="quote__text">
                {'"There and back again... together"'}
              </p>
              <span className="quote__line" />
            </div>
          </div>

          <aside>
            <div className={"card self-center overflow-clip p-0! mx-25 lg:mx-auto"}>
              <Image src={photo} alt={"us"} />
            </div>
          </aside>
        </div>
      </section>

      { canAccess && <section id="links" className={"section"}>
        <div
          className={
            "flex flex-col justify-center gap-5 text-center sm:flex-row sm:justify-around sm:gap-0"
          }
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <h2 className="h2 nav__link glow-hover-soft">{link.label}</h2>
            </Link>
          ))}
        </div>
      </section>}
    </div>
  );
}
