import { getInviteCodeFromCookie } from "@/app/rsvp/actions";
import { prisma } from "@/lib/prisma";

export async function canAccessSite(): Promise<boolean> {
  const inviteCode = await getInviteCodeFromCookie();
  console.log("Found invite code cookie,", inviteCode);
  if (inviteCode === null) return false;
  const validInvite = await prisma.family.findFirst({
    where: {
      rsvpCode: inviteCode,
    },
  });
  const canAccess = validInvite !== null;
  console.log("canAccess", canAccess);
  return canAccess;
}
