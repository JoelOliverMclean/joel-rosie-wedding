import WeddingCountdown from "@/components/WeddingCountdown";
import { links } from "@/components/NavigationLinks";
import Image from "next/image";
import photo from "@/images/framed_portrait.png";
import { canAccessSite } from "@/utils/cookieUtils";

const weddingDate = "2026-10-31T13:00:00Z";

export default async function HomePage() {
  const canAccess = await canAccessSite();

  return (
    <div className="stack">
      <section className="hero flex flex-col items-center gap-10 py-5">
        <div className="text-center">
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

        <div className={"mx-10 max-w-lg self-center overflow-clip p-0!"}>
          <Image src={photo} alt={"us"} />
        </div>
      </section>

      {canAccess && (
        <section id="links" className={"section"}>
          <div
            className={
              "flex flex-col justify-center gap-5 text-center sm:flex-row sm:justify-around sm:gap-0"
            }
          >
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                <h2 className={`h2 nav__link glow-hover-soft`}>{link.label}</h2>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
