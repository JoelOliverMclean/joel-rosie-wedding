// app/gallery/page.tsx
import GalleryClient from "./GalleryClient";

type PixabayHit = {
  id: number;
  pageURL: string;
  tags: string;
  webformatURL: string;
};

async function getInitialImages(): Promise<PixabayHit[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/pixabay?q=wedding&page=1&per_page=17`,
    { cache: "no-store" }
  );

  // If you don't want NEXT_PUBLIC_BASE_URL, you can fetch Pixabay directly here
  // and keep the route only for subsequent client requests. See note below.

  if (!res.ok) throw new Error("Failed to fetch initial images");
  const data = (await res.json()) as { hits: PixabayHit[] };
  return data.hits;
}

export default async function GalleryPage() {
  const initialHits = await getInitialImages();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className={"section"}>
        <h1 className="text-3xl font-semibold">Wedding Gallery</h1>
      </section>
      <GalleryClient initialHits={initialHits} />
    </main>
  );
}


// // app/gallery/page.tsx
// import Image from "next/image";
//
// type PixabayHit = {
//   id: number;
//   pageURL: string;
//   tags: string;
//   webformatURL: string;
// };
//
// type PixabayResponse = {
//   hits: PixabayHit[];
// };
//
// async function getWeddingImages(): Promise<PixabayHit[]> {
//   const key = process.env.PIXABAY_API_KEY;
//   if (!key) throw new Error("Missing PIXABAY_API_KEY");
//
//   const url =
//     "https://pixabay.com/api/?" +
//     new URLSearchParams({
//       key,
//       q: "wedding",
//       image_type: "photo",
//       per_page: "17",
//       safesearch: "true",
//       order: "popular",
//     });
//
//   const res = await fetch(url, { next: { revalidate: 86400 } });
//   if (!res.ok) throw new Error("Failed to fetch images from Pixabay");
//
//   const data = (await res.json()) as PixabayResponse;
//   return data.hits;
// }
//
// // Base: 2 columns on mobile; spans vary between 1 and 2 columns.
// // md+: 6 columns with the richer offset pattern.
// const spanClasses = [
//   "col-span-2 row-span-6 md:col-span-4 md:row-span-5",
//   "col-span-1 row-span-5 md:col-span-2 md:row-span-4",
//   "col-span-1 row-span-5 md:col-span-3 md:row-span-4",
//   "col-span-2 row-span-6 md:col-span-3 md:row-span-6",
//   "col-span-1 row-span-5 md:col-span-2 md:row-span-5",
//   "col-span-1 row-span-5 md:col-span-4 md:row-span-5",
// ];
//
// function randomThreeWithMin(min: number): [number, number, number] {
//   if (min * 3 > 1) {
//     throw new Error("Minimum too large — no valid distribution possible.");
//   }
//
//   const remaining = 1 - min * 3;
//
//   const r1 = Math.random();
//   const r2 = Math.random();
//   const [a, b] = [r1, r2].sort();
//
//   const extra1 = a * remaining;
//   const extra2 = (b - a) * remaining;
//   const extra3 = (1 - b) * remaining;
//
//   return [min + extra1, min + extra2, min + extra3];
// }
//
//
//
// export default async function GalleryPage() {
//   const images = await getWeddingImages();
//
//   const groupsOfThree = Math.ceil(images.length / 3);
//
//   return (
//     <main className="mx-auto max-w-6xl px-4 py-10">
//       <h1 className="text-2xl font-semibold">Wedding Gallery</h1>
//
//       <section className={"mt-6 flex-col gap-3 hidden md:flex"}>
//         {Array.from({ length: groupsOfThree }).map((_, i) => {
//           const weights = randomThreeWithMin(0.25);
//           console.log(weights);
//           return (
//             <div key={i} className={"flex gap-3"}>
//               {Array.from({ length: 3 }).map((_, j) => {
//                 console.log(`flex-[${weights[j] * 100}%]`);
//                 const hit = images[i * 3 + j];
//                 return (
//                   <div key={j} style={{ flexGrow: weights[j], flexBasis: 0 }}>
//                     {images.length > i * 3 + j ? (
//                       <div className={"bg-blue-500"}>
//                         <figure
//                           key={hit.id}
//                           className={[
//                             "group relative h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50",
//                             spanClasses[i % spanClasses.length],
//                           ].join(" ")}
//                         >
//                           <Image
//                             src={hit.webformatURL}
//                             alt={hit.tags || "Wedding photo"}
//                             fill
//                             className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//                             sizes="(min-width: 768px) 33vw, 50vw"
//                             priority={i < 2}
//                           />
//                           <a
//                             href={hit.pageURL}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="absolute inset-0"
//                             aria-label="Open source on Pixabay"
//                           />
//                         </figure>
//                       </div>
//                     ) : (
//                       <></>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </section>
//
//       <section className={"mt-6 flex-col gap-3 flex md:hidden"}>
//         {images.map((hit, i) => (
//           <figure
//             key={hit.id}
//             className={[
//               "group relative h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50",
//               spanClasses[i % spanClasses.length],
//             ].join(" ")}
//           >
//             <Image
//               src={hit.webformatURL}
//               alt={hit.tags || "Wedding photo"}
//               fill
//               className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//               sizes="(min-width: 768px) 33vw, 50vw"
//               priority={i < 2}
//             />
//             <a
//               href={hit.pageURL}
//               target="_blank"
//               rel="noreferrer"
//               className="absolute inset-0"
//               aria-label="Open source on Pixabay"
//             />
//           </figure>
//         ))}
//       </section>
//
//       {/*<section className="mt-6 grid grid-flow-row-dense auto-rows-[44px] grid-cols-2 gap-3 md:auto-rows-[52px] md:grid-cols-6">*/}
//       {/*  {images.map((hit, i) => (*/}
//       {/*    <figure*/}
//       {/*      key={hit.id}*/}
//       {/*      className={[*/}
//       {/*        "group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50",*/}
//       {/*        spanClasses[i % spanClasses.length],*/}
//       {/*      ].join(" ")}*/}
//       {/*    >*/}
//       {/*      <Image*/}
//       {/*        src={hit.webformatURL}*/}
//       {/*        alt={hit.tags || "Wedding photo"}*/}
//       {/*        fill*/}
//       {/*        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"*/}
//       {/*        sizes="(min-width: 768px) 33vw, 50vw"*/}
//       {/*        priority={i < 2}*/}
//       {/*      />*/}
//       {/*      <a*/}
//       {/*        href={hit.pageURL}*/}
//       {/*        target="_blank"*/}
//       {/*        rel="noreferrer"*/}
//       {/*        className="absolute inset-0"*/}
//       {/*        aria-label="Open source on Pixabay"*/}
//       {/*      />*/}
//       {/*    </figure>*/}
//       {/*  ))}*/}
//       {/*</section>*/}
//     </main>
//   );
// }
