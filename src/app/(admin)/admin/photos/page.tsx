import { prisma } from "@/lib/prisma";
import { getSignedPhotoUrl } from "@/lib/r2";
import { approvePhoto, rejectPhoto } from "./actions";
import Image from "next/image";

export default async function AdminPhotosPage() {
  const pendingPhotos = await prisma.photo.findMany({
    where: { status: "PENDING" },
    include: { family: true },
    orderBy: { createdAt: "asc" },
  });

  const photosWithUrls = await Promise.all(
    pendingPhotos.map(async (photo) => ({
      ...photo,
      url: await getSignedPhotoUrl(photo.key),
    })),
  );

  return (
    <div className={"section flex flex-col gap-5"}>
      <h1>Photos for review</h1>
      <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-3">
        {photosWithUrls.length === 0 && <p>No photos awaiting review.</p>}

        {photosWithUrls.map((photo) => (
          <div key={photo.id} className="card flex flex-col gap-2">
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={photo.url}
                alt={`Upload from ${photo.family?.familyName ?? "unknown"}`}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm">
              Uploaded by: {photo.family?.familyName ?? "Unknown family"}
            </p>
            <div className="flex gap-2">
              <form action={approvePhoto.bind(null, photo.id)}>
                <button type="submit" className="btn btn--primary">
                  Approve
                </button>
              </form>
              <form action={rejectPhoto.bind(null, photo.id)}>
                <button type="submit" className="btn btn--ghost">
                  Reject
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
