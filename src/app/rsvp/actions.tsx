import { InviteSummary } from "@/app/rsvp/types";
import { cookies } from "next/headers";

const INVITE_COOKIE = "rsvp_invite";

export async function getInviteFromCookie(): Promise<InviteSummary | null> {
  const jar = await cookies();
  const raw = jar.get(INVITE_COOKIE)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw) as InviteSummary;
  } catch {
    return null;
  }
}


export async function setInviteCookie(invite: InviteSummary) {
  "use server";

  const jar = await cookies();
  jar.set(INVITE_COOKIE, JSON.stringify(invite), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearInviteCookie() {
  "use server";

  const jar = await cookies();
  jar.set(INVITE_COOKIE, "", { path: "/", maxAge: 0 });
}
