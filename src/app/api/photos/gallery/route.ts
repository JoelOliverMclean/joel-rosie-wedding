// src/app/api/photos/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSignedPhotoUrl } from "@/lib/r2";

const PAGE_SIZE = 17;

export async function GET(request: NextRequest) {
  const cursor = request.nextUrl.searchParams.get("cursor");

  const photos = await prisma.photo.findMany({
    where: { status: "APPROVED" },
    orderBy: { id: "desc" },
    take: PAGE_SIZE + 1,
    ...(cursor ? { cursor: { id: Number(cursor) }, skip: 1 } : {}),
  });

  const hasMore = photos.length > PAGE_SIZE;
  const page = photos.slice(0, PAGE_SIZE);

  const hits = await Promise.all(
    page.map(async (photo) => ({
      id: photo.id,
      url: await getSignedPhotoUrl(photo.key),
      alt: "A photo shared by a wedding guest",
    })),
  );

  const nextCursor = page.length > 0 ? page[page.length - 1].id : null;

  return NextResponse.json({ hits, hasMore, nextCursor });
}
