import { getInviteFromCookie } from "@/app/rsvp/actions";

export async function canAccessSite(): Promise<boolean> {
  const invite = await getInviteFromCookie();
  return invite !== null;
}
