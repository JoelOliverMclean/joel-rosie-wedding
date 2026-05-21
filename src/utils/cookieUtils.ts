import {
  getInviteCodeFromCookie,
} from "@/app/rsvp/actions";
import { prisma } from "@/lib/prisma";

export async function canAccessSite(): Promise<boolean> {
  const inviteCode = await getInviteCodeFromCookie();
  if (inviteCode === null) return false;
  const validInvite = await prisma.family.findFirst({
    where: {
      rsvpCode: inviteCode,
    },
  });
  return validInvite !== null;
}
