import { FamilyWithGuests, Guest } from "@/lib/prisma-types";
import { prisma } from "@/lib/prisma";

export async function getFamily(id: string): Promise<FamilyWithGuests | null> {
  return prisma.family.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      guests: true
    }
  })
}

export async function updateGuest(guest: Guest): Promise<void> {
  await prisma.guest.update({
    where: {
      id: guest.id
    },
    data: guest
  })
}