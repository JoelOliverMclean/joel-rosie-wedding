import RsvpClient from "./RsvpClient";
import {
  clearInviteCodeCookie,
  confirmRSVP,
  getInviteFromCookie,
  saveGuests,
  setInviteCodeCookie,
} from "@/app/rsvp/actions";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [_: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const redirectParam = params?.redirect;
  const rsvpCodeParam = params?.rsvpCode;
  const rsvpCode =
    typeof rsvpCodeParam === "string"
      ? rsvpCodeParam
      : Array.isArray(rsvpCodeParam)
        ? rsvpCodeParam[0]
        : undefined;
  const redirectTo =
    typeof redirectParam === "string" && redirectParam.length > 0
      ? redirectParam
      : null;

  const initialInvite = await getInviteFromCookie();

  if (initialInvite?.family?.rsvpSubmitted) {
    redirect("/rsvp/submitted");
  }

  const onSubmitRSVP = async (familyId: number, contact: string) => {
    "use server";
    const errorResponse = await confirmRSVP(familyId, contact);
    if (errorResponse) {
      return errorResponse.message;
    } else {
      if (initialInvite) {
        initialInvite.family.rsvpSubmitted = true;
      }
      redirect("/rsvp/submitted");
    }
  };

  return (
    <RsvpClient
      rsvpCode={rsvpCode ?? ""}
      initialInvite={initialInvite}
      setInviteCodeAction={setInviteCodeCookie}
      clearInviteCodeAction={clearInviteCodeCookie}
      submitRSVP={onSubmitRSVP}
      saveGuests={saveGuests}
      redirectTo={redirectTo}
    />
  );
}
