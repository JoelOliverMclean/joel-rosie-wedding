import { cookies } from "next/headers";
import RsvpClient from "./RsvpClient";
import { InviteSummary } from "@/app/rsvp/types";

const INVITE_COOKIE = "rsvp_invite";

async function getInviteFromCookie(): Promise<InviteSummary | null> {
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rsvpCodeParam = params?.rsvpCode;
  const rsvpCode =
    typeof rsvpCodeParam === "string"
      ? rsvpCodeParam
      : Array.isArray(rsvpCodeParam)
        ? rsvpCodeParam[0]
        : undefined

  const initialInvite = await getInviteFromCookie();

  return (
    <RsvpClient
      rsvpCode={rsvpCode ?? ""}
      initialInvite={initialInvite}
      setInviteAction={setInviteCookie}
      clearInviteAction={clearInviteCookie}
    />
  );
}
