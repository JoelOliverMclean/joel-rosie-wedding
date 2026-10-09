// src/app/admin/photos/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deletePhotoObject } from "@/lib/r2";

export async function approvePhoto(photoId: number) {
  await prisma.photo.update({
    where: { id: photoId },
    data: { status: "APPROVED", reviewedAt: new Date() },
  });
  revalidatePath("/admin/photos");
}

export async function rejectPhoto(photoId: number) {
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) return;

  await deletePhotoObject(photo.key);
  await prisma.photo.delete({ where: { id: photoId } });

  revalidatePath("/admin/photos");
}

export async function deleteApprovedPhoto(photoId: number) {
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) return;

  await deletePhotoObject(photo.key);
  await prisma.photo.delete({ where: { id: photoId } });

  revalidatePath("/admin/photos");
  revalidatePath("/gallery"); // or whatever your gallery route actually is
}
