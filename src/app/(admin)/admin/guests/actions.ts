import { prisma } from "@/lib/prisma";
import { GuestsWithFamily } from "@/lib/prisma-types";

export async function getGuestList(): Promise<GuestsWithFamily[]> {
  return prisma.guest.findMany({
    include: {
      family: true,
    },
  });
}

export async function deleteGuests(guests: GuestsWithFamily[]) {
  const guestIds = guests.map((guest) => guest.id);
  await prisma.guest.deleteMany({
    where: {
      id: {
        in: guestIds
      }
    }
  })
  await prisma.family.deleteMany({
    where: {
      guests: {
        none: {},
      },
    },
  });
}