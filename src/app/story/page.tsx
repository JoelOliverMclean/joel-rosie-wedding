import React from "react";
import { canAccessSite } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";
import Image from "next/image";
import img2 from "@/images/story/img_2.jpg";
import img3 from "@/images/story/img_3.jpg";
import img4 from "@/images/story/img_4.jpg";
import img5 from "@/images/story/img_5.jpg";
import img6 from "@/images/story/img_6.jpg";
import img7 from "@/images/story/img_7.jpg";
import img8 from "@/images/story/img_8.jpg";
import img9 from "@/images/story/img_9.jpg";
import img10 from "@/images/story/img_10.jpg";
import img11 from "@/images/story/img_11.jpg";
import img12 from "@/images/story/img_12.jpg";
import img14 from "@/images/story/img_14.jpg";
import img15 from "@/images/story/img_15.jpg";
import img16 from "@/images/story/img_16.jpg";
import img17 from "@/images/story/img_17.jpg";
import img18 from "@/images/story/img_18.jpg";
import img19 from "@/images/story/img_19.jpg";
import img20 from "@/images/story/img_20.jpg";
import img21 from "@/images/story/img_21.jpg";
import img22 from "@/images/story/img_22.jpg";
import img23 from "@/images/story/img_23.jpg";
import img24 from "@/images/story/img_24.jpg";
import img25 from "@/images/story/img_25.jpg";
import img26 from "@/images/story/img_26.jpg";
import img27 from "@/images/story/img_27.jpeg";
import img28 from "@/images/story/img_28.jpeg";
import img29 from "@/images/story/img_29.jpeg";
import img30 from "@/images/story/img_30.jpeg";
import img31 from "@/images/story/img_31.jpeg";
import img32 from "@/images/story/img_32.jpg";
import img33 from "@/images/story/img_33.jpg";
import img34 from "@/images/story/img_34.jpg";
import img35 from "@/images/story/img_35.jpg";
import img36 from "@/images/story/img_36.jpg";
import img37 from "@/images/story/img_37.jpg";
import img38 from "@/images/story/img_38.jpg";
import img39 from "@/images/story/img_39.jpg";
import img40 from "@/images/story/img_40.jpg";

import offspring from "@/images/story/offspring.jpg";
import radin from "@/images/story/radin.jpg";
import rammstein from "@/images/story/rammstein.jpg";
import simpleplanm from "@/images/story/simpleplanm.jpg";
import tim_minchin from "@/images/story/tim_minchin.jpg";
import tom_mcquire from "@/images/story/tom_mcquire.jpg";

enum Tag {
  UNI = "UNI",
  HALLOWEEN = "HALLOWEEN",
  XMAS = "XMAS",
  COMIC_CON = "COMIC_CON",
  HOLIDAYS = "HOLIDAYS",
  CATS = "CATS",
  HOUSE = "HOUSE",
  DOG = "DOG",
  GIGS = "GIGS",
  ENGAGEMENT = "ENGAGEMENT",
  NOW = "NOW",
}

const img13 = "https://story-images.joelandrosie.wedding/img_13.jpg";

const images = [
  // { src: img20, label: "Asda days", tag: Tag.UNI },
  { src: img22, label: "Party", tag: Tag.UNI },
  // { src: img23, label: "Hmm", tag: Tag.UNI },
  { src: img18, label: "The Goat", tag: Tag.UNI },
  { src: img24, label: "Cozy", tag: Tag.NOW },
  { src: img25, label: "Ready", tag: Tag.GIGS },
  { src: img26, label: "Kitties", tag: Tag.CATS },
  { src: img5, label: "Ice Cream", tag: Tag.NOW },
  { src: img6, label: "Lazy Dog", tag: Tag.DOG },
  { src: img7, label: "Winter Cozy", tag: Tag.NOW },
  { src: img13, label: "Beach Chillin'", tag: Tag.DOG },
  { src: img14, label: "The Midnight", tag: Tag.GIGS },
  { src: img2, label: "Major Head Tilt", tag: Tag.UNI },
  { src: img3, label: "Big pond. Big Hat", tag: Tag.COMIC_CON },
  { src: img4, label: "The Start", tag: Tag.UNI },
  { src: img8, label: "Cold. Brr", tag: Tag.UNI },
  { src: img9, label: "First Christmas", tag: Tag.XMAS },
  { src: img10, label: "Going somewhere?", tag: Tag.GIGS },
  { src: img11, label: "Ah yes, here", tag: Tag.GIGS },
  { src: img12, label: "First Halloween", tag: Tag.XMAS },
  { src: img15, label: "Definitely the real Negan", tag: Tag.COMIC_CON },
  { src: img16, label: "King", tag: Tag.COMIC_CON },
  { src: img17, label: "Queen", tag: Tag.COMIC_CON },
  { src: img19, label: "First Holiday", tag: Tag.HOLIDAYS },
  { src: img21, label: "Us", tag: Tag.UNI },

  { src: img27, label: "Coach", tag: Tag.HOLIDAYS },
  { src: img28, label: "Radin", tag: Tag.GIGS },
  { src: img29, label: "Us", tag: Tag.UNI },
  { src: img30, label: "Us", tag: Tag.HOLIDAYS },
  // { src: img31, label: "Us", tag: Tag.UNI },
  { src: img34, label: "Us", tag: Tag.HOUSE },
  { src: img32, label: "Us", tag: Tag.HOUSE },
  { src: img33, label: "Us", tag: Tag.HOUSE },
  { src: rammstein, label: "Us", tag: Tag.GIGS },
  { src: radin, label: "Us", tag: Tag.GIGS },

  { src: img35, label: "Us", tag: Tag.GIGS },
  { src: offspring, label: "Us", tag: Tag.GIGS },
  { src: img37, label: "Us", tag: Tag.GIGS },
  { src: img36, label: "Us", tag: Tag.GIGS },
  { src: img38, label: "Us", tag: Tag.GIGS },
  { src: img39, label: "Us", tag: Tag.GIGS },
  { src: simpleplanm, label: "Us", tag: Tag.GIGS },
  { src: img40, label: "Us", tag: Tag.GIGS },
  { src: tom_mcquire, label: "Us", tag: Tag.GIGS },
  { src: tim_minchin, label: "Us", tag: Tag.GIGS },
];

import ronparty from "@/images/ron-party.gif";

const grouped = images.reduce<Record<string, typeof images>>((acc, image) => {
  const tag = image.tag;
  if (!acc[tag]) acc[tag] = [];
  acc[tag].push(image);
  return acc;
}, {});

const colsClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const photoSection = (tag: Tag, maxColumns: number = 4) => (
  <div className="flex w-full flex-wrap justify-center gap-10">
    {grouped[tag]?.map((image, i) => (
      <div
        key={i}
        className="group relative aspect-square w-1/2 md:w-1/3 lg:w-1/4"
      >
        <Image
          src={image.src}
          alt={image.label}
          fill
          className={`${i % 2 == 0 ? "rotate-3 group-hover:-rotate-3" : "-rotate-3 group-hover:rotate-3"} z-10 border-20 border-amber-950 object-cover shadow-lg transition-transform duration-300 group-hover:scale-110`}
        />
      </div>
    ))}
  </div>
);
// const photoSection = (tag: Tag, maxColumns: number = 4) => (
//   <div
//     className={`grid w-full ${colsClass[Math.min(2, maxColumns)]} gap-0 overflow-clip md:${colsClass[Math.min(3, maxColumns)]} lg:${colsClass[Math.min(4, maxColumns)]}`}
//   >
//     {grouped[tag]?.map((image, i) => (
//       <div key={i} className="group relative aspect-square overflow-hidden">
//         <Image
//           src={image.src}
//           alt={image.label}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         {/*<div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2">*/}
//         {/*  <span className="text-xs font-medium text-white">{image.label}</span>*/}
//         {/*</div>*/}
//       </div>
//     ))}
//   </div>
// );

export default async function StoryPage() {
  const canAccess = await canAccessSite();
  if (!canAccess) {
    redirect("/rsvp");
  }

  return (
    <div className={"section flex flex-col items-center gap-5 text-center"}>
      {/*<h1>Our Story</h1>*/}
      <h1>Yep, that&apos;s us</h1>
      {photoSection(Tag.NOW)}
      <p>You&apos;re probably wondering how we got here. Well...</p>
      <h2>We met in uni when we were still basically babies</h2>
      <p className={"small muted"}>I mean look at our faces...</p>
      {photoSection(Tag.UNI)}
      <p>What can we say, we hit it off</p>
      <h2>Next thing you know we&apos;re doin&apos; halloween and christmas</h2>
      {/*<div className={"grid max-w-2xl grid-cols-2"}>*/}
      {/*{photoSection(Tag.HALLOWEEN, 1)}*/}
      {photoSection(Tag.XMAS)}
      {/*</div>*/}
      <h2>And nerding out at MCM London</h2>
      {photoSection(Tag.COMIC_CON)}
      <h2>We went on holidays together and hid from the sun</h2>
      {photoSection(Tag.HOLIDAYS)}
      <h2>
        Oh and can&apos;t forget our very first fur babies joining the fun
      </h2>
      {photoSection(Tag.CATS)}
      <h2>Was not long after that we bought our first home together</h2>
      {photoSection(Tag.HOUSE)}
      <h2>
        And started going to more gigs, enjoying the music we like together
      </h2>
      {photoSection(Tag.GIGS)}
      <p className={"small muted"}>We like music and comedy...</p>
      <h2>
        We decided soon after that britain doesn&apos;t have enough clouds, so
        we adopted our own
      </h2>
      {photoSection(Tag.DOG)}
      <h2>And after years of discussion</h2>
      <p>
        and mutual admission that we&apos;d basically been married for most of
        our 10 years so far together, so it was just a case of when either of us
        asked officially...
      </p>
      <p className={"small muted"}>...Joel did it</p>
      {photoSection(Tag.ENGAGEMENT)}
      <h2>And now we get to celebrate with all of you</h2>
      <p>and honestly, we can&apos;t wait!</p>
      <div className={"card self-center overflow-clip p-0!"}>
        <Image src={ronparty} alt={""} />
      </div>
    </div>
  );
}
