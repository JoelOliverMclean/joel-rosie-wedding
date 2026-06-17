import React from "react";
import whatsAppIcon from "@/images/whatsapp.png";
import Image from "next/image";
import notattending from "@/images/ron-swanson-not-attending.gif";
import { getInviteFromCookie } from "@/app/rsvp/actions";
import { InviteSummary } from "@/app/rsvp/types";
import { FamilyWithGuests, RSVPResponse } from "@/lib/prisma-types";
import { apiGet } from "@/utils/apiUtils";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function isNoOneComing(family: FamilyWithGuests | null) {
  if (!family) return false;
  return family.guests.every((guest) => {
    return guest.rsvpResponse === RSVPResponse.NOT_ATTENDING;
  });
}

export default async function RSVPSubmittedPage() {
  const inviteCookie = await getInviteFromCookie();
  if (!inviteCookie) {
    redirect("/rsvp");
  }
  const family = await prisma.family.findFirst({
    where: {
      rsvpCode: inviteCookie?.family.rsvpCode,
    },
    include: {
      guests: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  const noOneComing = isNoOneComing(family);

  return (
    <>
      <div className={"section flex flex-col gap-5"}>
        <div className={"h2 text-center"}>
          Thank you for submitting your RSVP
        </div>
        {!noOneComing && (
          <div>
            Feel free to check out the other pages and if you need any more
            information, the info page specifically is your friend
          </div>
        )}
        <div
          className={"h-1 bg-gradient-to-r from-[var(--fg)] to-transparent"}
        ></div>
        {noOneComing ? (
          <div className={"card self-center overflow-clip p-0!"}>
            <Image src={notattending} alt={""} />
          </div>
        ) : (
          <div className={"small muted flex flex-col items-center gap-1"}>
            <p>
              If you need to change anything or can no longer attend, get in
              touch with Joel
            </p>
            <a
              className={"link-text flex items-center gap-1 p-1"}
              href="https://wa.me/447869177266"
            >
              <Image
                src={whatsAppIcon}
                alt={"whatsapp icon"}
                width={24}
                height={24}
              />
              WhatsApp
            </a>
            or text on{" "}
            <a className={"link-text underline"} href="tel:+447869177266">
              07869177266
            </a>
          </div>
        )}
      </div>
    </>
  );
}
