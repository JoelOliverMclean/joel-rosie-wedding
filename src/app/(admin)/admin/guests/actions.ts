import { prisma } from "@/lib/prisma";
import { GuestsWithFamily } from "@/lib/prisma-types";

export async function getGuestList(): Promise<GuestsWithFamily[]> {
  return prisma.guest.findMany({
    include: {
      family: true,
    },
  });
}