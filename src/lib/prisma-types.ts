import { Prisma } from "../../generated/prisma/client";

export * from "../../generated/prisma/client";

export type FamilyWithGuests = Prisma.FamilyGetPayload<{
  include: { guests: true };
}>;

export type GuestsWithFamily = Prisma.GuestGetPayload<{
  include: { family: true };
}>