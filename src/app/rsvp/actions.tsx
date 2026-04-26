import { prisma } from "@/lib/prisma";
import { InviteSummary } from "@/app/rsvp/types";
import { cookies } from "next/headers";
import { $Enums, FamilyWithGuests, Guest } from "@/lib/prisma-types";
import RSVPResponse = $Enums.RSVPResponse;

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

function isValidContact(contact: string): boolean {
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+?[\d\s\-().]{7,20}$/;

  return emailRegex.test(contact) || phoneRegex.test(contact);
}

export async function confirmRSVP(familyId: number, contact: string) {
  const family: FamilyWithGuests | null = await prisma.family.findUnique({
    where: {
      id: familyId
    },
    include: {
      guests: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!family) {
    console.log("Can't find fam")
    return Error("Cannot find family")
  }

  if (!contact || contact.length === 0) {
    console.log("No contact provided")
    return Error("No contact provided")
  }

  if (!isValidContact(contact)) {
    console.log("Contact not valid");
    return Error("Contact not valid, please provide a phone number or email address");
  }

  for (const guest of family.guests) {
    if (!guest.rsvpResponse) {
      return Error(`No attending choice selected for ${guest.firstName}`)
    }
    if (guest.rsvpResponse !== RSVPResponse.NOT_ATTENDING && !guest.foodPreference) {
      return Error(`No food preference selected for ${guest.firstName}`)
    }
  }

  await prisma.family.update({
    where: { id: familyId },
    data: { rsvpSubmitted: true, contact: contact },
  })

  return null
}

export async function saveGuests(guests: Guest[]) {
  "use server"

  for (const guest of guests) {
    await prisma.guest.update({
      where: { id: guest.id },
      data: {
        ...guest
      }
    })
  }

  return true
}