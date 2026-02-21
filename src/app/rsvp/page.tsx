import RsvpClient from "./RsvpClient";
import {
  clearInviteCookie,
  getInviteFromCookie,
  setInviteCookie,
} from "@/app/rsvp/actions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [_: string]: string | string[] | undefined }>;
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
