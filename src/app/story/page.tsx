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
import img13 from "@/images/story/img_13.jpg";
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
const images = [
  { src: img24, label: "Cozy" },
  { src: img25, label: "Ready" },
  { src: img26, label: "Kitties" },
  { src: img5, label: "Ice Cream" },
  { src: img6, label: "Lazy Dog" },
  { src: img7, label: "Winter Cozy" },
  { src: img13, label: "Beach Chillin'" },
  { src: img14, label: "The Midnight" },
  { src: img2, label: "Major Head Tilt" },
  { src: img3, label: "Big pond. Big Hat" },
  { src: img4, label: "The Start" },
  { src: img8, label: "Cold. Brr" },
  { src: img9, label: "First Christmas" },
  { src: img10, label: "Going somewhere?" },
  { src: img11, label: "Ah yes, here" },
  { src: img12, label: "First Halloween" },
  { src: img15, label: "Definitely the real Negan" },
  { src: img16, label: "King" },
  { src: img17, label: "Queen" },
  { src: img18, label: "The Goat" },
  { src: img19, label: "First Holiday" },
  { src: img20, label: "Asda days" },
  { src: img21, label: "Us" },
  { src: img22, label: "Party" },
  { src: img23, label: "Hmm" },
];

export default async function StoryPage() {
  const canAccess = await canAccessSite();
  if (!canAccess) {
    redirect("/rsvp");
  }
  return (
    <div className={"section flex flex-col gap-10"}>
      <h1>Our Story</h1>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {images.map((image, i) => (
          <div key={i} className="relative mb-4 break-inside-avoid">
            <Image
              src={image.src}
              alt={image.label}
              className="h-auto w-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-end rounded-lg bg-gradient-to-t from-black/60 to-transparent p-2">
              <span className="text-sm font-medium text-white">
                {image.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
