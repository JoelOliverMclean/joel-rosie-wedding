"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ronparty from "@/images/ron-party.gif";
import bababooey from "@/images/bababooey-parks.gif";

const img_prefix = "https://story-images.joelandrosie.wedding/";

type PhotoConfig = {
  src: string;
  crop?: "center" | "top" | "bottom" | "left" | "right";
};

type PhotoInput = string | PhotoConfig;

const normalise = (img: PhotoInput): PhotoConfig =>
  typeof img === "string" ? { src: img } : img;

const cropClass: Record<NonNullable<PhotoConfig["crop"]>, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
};

const uni: PhotoInput[] = [
  "uni1.jpeg",
  "uni2.jpeg",
  "uni3.jpg",
  "uni4.jpg",
  "uni5.jpg",
  "uni6.jpg",
  "uni7.jpg",
  "uni8.jpg",
  "uni9.jpg",
  "uni10.jpg",
];
const now: PhotoInput[] = [
  "now2.jpg",
  "now9.jpg",
  "now4.jpg",
  "now5.jpg",
  { src: "now1.jpeg", crop: "top" },
  "now3.jpg",
  "now11.jpg",
];
const halloween: PhotoInput[] = [
  { src: "halloween1.jpg", crop: "top" },
  { src: "ghostcake.jpg", crop: "top" },
  { src: "cupcake.jpg" },
  { src: "ghost.jpg", crop: "top" },
  { src: "gandalf.jpg", crop: "top" },
];
const xmas: PhotoInput[] = ["christmas1.jpg"];
const comiccon: PhotoInput[] = [
  "comiccon1.jpg",
  "queen.jpg",
  "king.jpg",
  "negan.jpg",
];
const holidays: PhotoInput[] = [
  { src: "holiday1.jpeg" },
  "holiday2.jpeg",
  "holiday3.jpg",
  "watermelon.jpg",
];
const cats: PhotoInput[] = ["cats2.jpg", "cats1.jpg"];
const house: PhotoInput[] = [
  "frontdoor.jpg",
  "fireplace.jpg",
  "house_christmas.jpg",
];
const dog: PhotoInput[] = [
  "ridehome.jpg",
  "spadedog.jpg",
  "dogwalk.jpg",
  "beach_dog.jpg",
  { src: "highdog.jpg", crop: "top" },
  "dogsandcats.jpg",
  "joelanddog.jpg",
  "dogback.jpg",
];
const gigs: PhotoInput[] = [
  "acaster.jpg",
  "edgamble.jpg",
  "brassholes.jpg",
  "conchords.jpg",
  "jackblack.jpg",
  "kylegass.jpg",
  "midnight.jpg",
  "offspring.jpg",
  "offpsring2.jpg",
  "radin.jpg",
  "rammstein.jpg",
  "simpleplan.jpg",
  "simpleplan2.jpg",
  "sum41.jpg",
  "tim_minchin.jpg",
  "bfs1.jpg",
  "wheatus.jpg",
  "magnoliapark.jpg",
  "paparoach.jpg",
];
const engagement: PhotoInput[] = [
  "engagement1.jpg",
  "engagement2.jpg",
  "engagement3.jpg",
];

const StoryGallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const photoSection = (images: PhotoInput[]) => (
    <div className="flex w-full flex-wrap justify-center gap-0">
      {images.map((raw, i) => {
        const { src, crop = "center" } = normalise(raw);
        return (
          <div
            key={src}
            className="group relative -m-2 aspect-square w-1/2 cursor-pointer md:w-1/3 lg:w-1/4"
            onClick={() => setSelected(src)}
          >
            <Image
              src={`${img_prefix}${src}`}
              alt={""}
              fill
              className={`${i % 2 === 0 ? "rotate-5 group-hover:-rotate-2" : "-rotate-5 group-hover:rotate-2"} border-10 border-b-40 border-gray-200 ${cropClass[crop]} object-cover shadow-lg ring-2 ring-black transition-transform duration-300 group-hover:scale-110 hover:z-10`}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`${img_prefix}${selected}`}
              alt={""}
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto rounded object-contain shadow-2xl"
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className={"section flex flex-col items-center gap-10 text-center"}>
        <h1>Yep, that&apos;s us</h1>
        {photoSection(now)}
        <p>You&apos;re probably wondering how we got here. Well...</p>
        <h2>We met in uni when we were still basically babies</h2>
        <p className={"small muted"}>I mean look at our faces...</p>
        {photoSection(uni)}
        <p>What can we say, we hit it off</p>
        <h2>
          Next thing you know we&apos;re doin&apos; halloween and christmas
        </h2>
        {photoSection([...halloween, ...xmas])}
        <h2>And nerding out at MCM London</h2>
        {photoSection(comiccon)}
        <h2>We went on holidays together and hid from the sun</h2>
        {photoSection(holidays)}
        <h2>
          Oh and can&apos;t forget our very first fur babies joining the fun
        </h2>
        {photoSection(cats)}
        <h2>Was not long after that we bought our first home together</h2>
        {photoSection(house)}
        <h2>
          And started going to more gigs, enjoying the things we like together
        </h2>
        {photoSection(gigs)}
        <p className={"small muted"}>We like music and comedy...</p>
        <h2>
          We decided soon after that Britain doesn&apos;t have enough clouds...
          so we got our own
        </h2>
        {photoSection(dog)}
        <h2>And after years of discussion</h2>
        <p>
          and mutual admission that we&apos;d basically been married for most of
          our 10 years so far together, so it was just a case of when either of
          us asked officially...
        </p>
        <p className={"small muted"}>...Joel did it</p>
        {photoSection(engagement)}
        <h2>And now we get to celebrate with all of you</h2>
        <p>and honestly, we can&apos;t wait</p>
        <div className={"card self-center overflow-clip p-0!"}>
          <Image src={ronparty} alt={""} />
          <Image src={bababooey} alt={""} />
        </div>
      </div>
    </>
  );
};

export default StoryGallery;
