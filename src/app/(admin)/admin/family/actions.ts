import { prisma } from "@/lib/prisma";
import random from "random-string-generator";
import { revalidatePath } from "next/cache";

export async function regenerateRSVPCodes(): Promise<void> {
  const families = await prisma.family.findMany({ select: { id: true } });

  // 1. Generate a collision-free set of codes upfront
  const codes = generateUniqueCodes(families.length, 6);

  // 2. Write them all in a transaction
  await prisma.$transaction(
    families.map((family, i) =>
      prisma.family.update({
        where: { id: family.id },
        data: { rsvpCode: codes[i] },
      }),
    ),
  );

  revalidatePath("/admin/family");
}

function generateUniqueCodes(count: number, length: number): string[] {
  const codes = new Set<string>();
  while (codes.size < count) {
    codes.add(random(length));
  }
  return [...codes];
}
