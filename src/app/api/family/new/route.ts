import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const newFamily: {
    familyName: string;
    rsvpCode: string;
    rsvpQuestion: string;
    rsvpAnswer: string;
  } = {
    familyName: data.familyName,
    rsvpCode: data.rsvpCode,
    rsvpQuestion: data.rsvpQuestion,
    rsvpAnswer: data.rsvpAnswer,
  };

  const guests = extractGuestsFromData(data);

  const family = await prisma.family.create({
    data: newFamily,
  });

  for (const guest of guests) {
    await prisma.guest.create({
      data: {
        firstName: guest.firstName,
        lastName: guest.lastName ?? "",
        child: guest.isChild,
        familyId: family.id,
        invitedDay: guest.invitedDay,
        invitedEvening: guest.invitedEvening,
      },
    });
  }

  return NextResponse.json(newFamily);
}

interface Guest {
  firstName: string;
  lastName: string;
  isChild: boolean;
  invitedDay: boolean;
  invitedEvening: boolean;
}

function extractGuestsFromData(data: Record<string, unknown>): Guest[] {
  // Group fields by guest index
  const grouped: Record<string, Partial<Guest>> = {};

  for (const key of Object.keys(data)) {
    const m = key.match(
      /^guest(\d+)_(firstName|lastName|isChild|invitedDay|invitedEvening)$/,
    );
    if (!m) continue;

    const [, idx, prop] = m as [string, string, keyof Guest];
    const value = data[key];

    if (!grouped[idx]) grouped[idx] = {};

    if (
      prop === "isChild" ||
      prop === "invitedDay" ||
      prop === "invitedEvening"
    ) {
      // Coerce common truthy/falsey representations to boolean
      (grouped[idx][prop] as boolean | undefined) = toBool(value);
    } else {
      (grouped[idx][prop] as string | undefined) = String(value ?? "");
    }
  }

  // Ensure stable order by guest index and validate required fields
  const isComplete = (g: Partial<Guest>): g is Guest =>
    typeof g.firstName === "string" &&
    g.firstName.length > 0 &&
    typeof g.lastName === "string" &&
    typeof g.isChild === "boolean";

  return Object.keys(grouped)
    .sort((a, b) => Number(a) - Number(b))
    .map((i) => grouped[i])
    .filter(isComplete);
}

// Helper: robust boolean coercion
function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "yes" || s === "y";
  }
  return false;
}
