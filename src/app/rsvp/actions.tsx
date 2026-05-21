import { prisma } from "@/lib/prisma";
import { InviteSummary } from "@/app/rsvp/types";
import { cookies } from "next/headers";
import { $Enums, FamilyWithGuests, Guest } from "@/lib/prisma-types";
import RSVPResponse = $Enums.RSVPResponse;

const INVITE_CODE_COOKIE = "__Secure-invite-code";

export async function getInviteCodeFromCookie(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(INVITE_CODE_COOKIE)?.value ?? null;
}

export async function setInviteCodeCookie(code: string) {
  "use server";

  const jar = await cookies();
  jar.set(INVITE_CODE_COOKIE, code, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearInviteCodeCookie() {
  "use server";

  const jar = await cookies();
  jar.delete(INVITE_CODE_COOKIE)
}

export async function getInviteFromCookie(): Promise<InviteSummary | null> {
  const inviteCode = await getInviteCodeFromCookie();
  if (!inviteCode) return null;

  try {
    const family = await prisma.family.findFirst({
      where: {
        rsvpCode: inviteCode
      },
      include: {
        guests: true
      }
    })
    if (!family) return null;
    return { family: family }
  } catch {
    return null;
  }
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

  for (const guest of family.guests) {
    if (!guest.rsvpResponse) {
      return Error(`No attending choice selected for ${guest.firstName}`)
    }
    if (guest.rsvpResponse !== RSVPResponse.NOT_ATTENDING && !guest.foodPreference) {
      return Error(`No food preference selected for ${guest.firstName}`)
    }
  }

  const fullNo = family.guests.every(guest => guest.rsvpResponse === RSVPResponse.NOT_ATTENDING)

  if (!fullNo && (!contact || contact.length === 0)) {
    console.log("No contact provided");
    return Error("No contact provided");
  }

  if (!fullNo && !isValidContact(contact)) {
    console.log("Contact not valid");
    return Error(
      "Contact not valid, please provide a phone number or email address",
    );
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