import RsvpClient from "./RsvpClient";
import {
  clearInviteCookie, confirmRSVP,
  getInviteFromCookie,
  setInviteCookie,
} from "@/app/rsvp/actions";
import { redirect } from "next/navigation";

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

  if (initialInvite?.family?.rsvpSubmitted) {
    redirect("/rsvp/submitted");
  }

  const onSubmitRSVP = async (familyId: number) => {
    "use server"
    const error = await confirmRSVP(familyId);
    if (error) {
      console.log(error);
      return false;
    } else {
      if (initialInvite) {
        initialInvite.family.rsvpSubmitted = true;
        await setInviteCookie(initialInvite);
      }
      redirect("/rsvp/submitted");
    }
  }

  return (
    <RsvpClient
      rsvpCode={rsvpCode ?? ""}
      initialInvite={initialInvite}
      setInviteAction={setInviteCookie}
      clearInviteAction={clearInviteCookie}
      submitRSVP={onSubmitRSVP}
    />
  );
}
