import { Map } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="stack">
      {/* Hero */}
      <section className="hero">
        {/*<div className="pill">*/}
        {/*  Autumn • Lanternlight • Cosy Evening*/}
        {/*</div>*/}

        <div className="hero__grid">
          <div className="hero__left text-center">
            <h1 className="h1">
              You are invited
              <span className="h1__sub">to celebrate with us</span>
            </h1>

            {/*<p className="lead">*/}
            {/*  Join us beneath turning leaves for an evening of warmth,*/}
            {/*  candlelight, and quiet storybook magic.*/}
            {/*</p>*/}

            {/*<div className="actions">*/}
            {/*  <a className="btn btn--ghost" href="#info">*/}
            {/*    Day details*/}
            {/*  </a>*/}
            {/*  <a className="btn btn--ghost" href="#gallery">*/}
            {/*    Photos*/}
            {/*  </a>*/}
            {/*</div>*/}

            <div className="quote">
              <span className="quote__line" />
              <p className="quote__text">
                {/*“All we have to decide is what to do with the time that is given us.”*/}
                {'"There and back again... together"'}
              </p>
              <span className="quote__line" />
            </div>
          </div>

          {/* Storybook card */}
          <aside className="card card--hero">
            <div className="eyebrow">The Gathering</div>
            <h2 className="h2">Saturday 31st October 2026</h2>
            <p className="small muted">
              Ceremony at <strong>1:00pm</strong> <br />
              Food &amp; drinks to follow <br />
              Party starts at <strong>7:00pm</strong>
            </p>

            <div className="card__grid">
              <div className="panel">
                <div className="panel__title">Location</div>
                <div className="small muted flex items-center gap-5">
                  <div className={"flex-1"}>
                    <strong>Rufford Mill Wedding Venue, Nottinghamshire</strong>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/MUXG9KmrqbtSbXqL7"
                    target={"_blank"}
                  >
                    <div className={"btn btn--primary"}>
                      <Map />
                    </div>
                  </a>
                </div>
              </div>
              <div className="panel">
                <div className="panel__title">Dress</div>
                <div className="small muted">
                  Day: <strong>Formal</strong> <br />
                  Evening: <strong>Optional Fancy Dress</strong>
                </div>
              </div>
            </div>

            <a className="btn btn--primary card__cta" href="/rsvp">
              RSVP here
            </a>

            <span className="seal" aria-hidden="true" />
          </aside>
        </div>
      </section>

      <section id="links" className={"section"}>
        <div
          className={
            "flex flex-col justify-center gap-5 text-center sm:flex-row sm:justify-around sm:gap-0"
          }
        >
          <Link href={"/story"}>
            <h2 className="h2 nav__link glow-hover-soft">Our Story</h2>
          </Link>
          <Link href={"/info"}>
            <h2 className="h2 nav__link glow-hover-soft">Information</h2>
          </Link>
          <Link href={"/gallery"}>
            <h2 className="h2 nav__link glow-hover-soft">Photos</h2>
          </Link>
          <Link href={"/rsvp"}>
            <h2 className="h2 nav__link glow-hover-soft">RSVP</h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
