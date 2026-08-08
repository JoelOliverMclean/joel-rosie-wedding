// app/gallery/page.tsx

import UploadComponent from "@/app/gallery/UploadComponent";
import { prisma } from "@/lib/prisma";
import { getSignedPhotoUrl } from "@/lib/r2";
import GalleryClient from "@/app/gallery/GalleryClient";

export default async function GalleryPage() {
  const initialPhotos = await prisma.photo.findMany({
    where: { status: "APPROVED" },
    orderBy: { id: "desc" },
    take: 17,
  });

  const initialHits = await Promise.all(
    initialPhotos.map(async (photo) => ({
      id: photo.id,
      url: await getSignedPhotoUrl(photo.key),
      alt: "A photo shared by a wedding guest",
    })),
  );

  return (
    <>
      <main className="section mx-auto max-w-6xl px-4 py-5">
        <section className={"section"}>
          <div className={"flex flex-wrap justify-between gap-5"}>
            <h1 className="text-3xl font-semibold">Wedding Gallery</h1>
            <UploadComponent />
          </div>
        </section>
        <GalleryClient initialHits={initialHits} />
      </main>
    </>
  );
}
