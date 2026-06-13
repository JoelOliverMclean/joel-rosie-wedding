import { FamilyWithGuests, Guest } from "@/lib/prisma-types";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getFamily(id: string): Promise<FamilyWithGuests | null> {
  return prisma.family.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      guests: true,
    },
  });
}

export async function updateGuest(guest: Guest): Promise<void> {
  await prisma.guest.update({
    where: {
      id: guest.id,
    },
    data: guest,
  });
  revalidatePath(`/admin/family/${guest.familyId}`);
  revalidatePath("/admin/family");
  revalidatePath("/admin/guests");
}

export async function updateRSVPCode(
  familyId: number,
  newCode: string,
): Promise<void> {
  const conflict = await prisma.family.findFirst({
    where: {
      rsvpCode: newCode,
      NOT: { id: familyId },
    },
  });

  if (conflict) {
    throw new Error(`Code "${newCode}" is already assigned to another family.`);
  }

  await prisma.family.update({
    where: { id: familyId },
    data: { rsvpCode: newCode },
  });

  revalidatePath("/admin/family");
  revalidatePath(`/admin/family/${familyId}`);
  revalidatePath("/admin/guests");
}
