import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedPhotoUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_GALLERY_BUCKET_NAME!,
    Key: key,
  });
  return getSignedUrl(r2Client, command, { expiresIn: 3600 });
}

export async function deletePhotoObject(key: string) {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_GALLERY_BUCKET_NAME!,
      Key: key,
    }),
  );
}
