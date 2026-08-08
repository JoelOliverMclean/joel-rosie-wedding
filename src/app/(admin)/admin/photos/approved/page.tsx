// src/app/admin/photos/approved/page.tsx
import { prisma } from "@/lib/prisma";
import { getSignedPhotoUrl } from "@/lib/r2";
import { deleteApprovedPhoto } from "../actions";
import Image from "next/image";

export default async function ApprovedPhotosPage() {
  const approvedPhotos = await prisma.photo.findMany({
    where: { status: "APPROVED" },
    include: { family: true },
    orderBy: { id: "desc" },
  });

  const photosWithUrls = await Promise.all(
    approvedPhotos.map(async (photo) => ({
      ...photo,
      url: await getSignedPhotoUrl(photo.key),
    })),
  );

  return (
    <div className="section grid grid-cols-2 gap-4 p-6 md:grid-cols-3">
      {photosWithUrls.length === 0 && <p>No approved photos yet.</p>}

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
          <form action={deleteApprovedPhoto.bind(null, photo.id)}>
            <button type="submit" className="btn btn--ghost">
              Remove from gallery
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
