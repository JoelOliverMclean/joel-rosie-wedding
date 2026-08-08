import { NextRequest, NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { r2Client } from "@/lib/r2";
import { getFamilyFromCookie } from "@/utils/cookieUtils";
import { prisma } from "@/lib/prisma";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  const family = await getFamilyFromCookie();
  if (!family) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("photo") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const detected = await fileTypeFromBuffer(buffer);
  if (!detected || !ALLOWED_TYPES.has(detected.mime)) {
    return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
  }

  const key = `uploads/${randomUUID()}.${detected.ext}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_GALLERY_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: detected.mime,
    }),
  );

  const photo = await prisma.photo.create({
    data: { key, familyId: family.id },
  });

  return NextResponse.json({ success: true, id: photo.id });
}
