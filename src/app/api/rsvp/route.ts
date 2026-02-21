import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseFoodPreference } from "@/lib/prisma-enum-helper";
import { FamilyWithGuests } from "@/lib/prisma-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.rsvpCode) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    let foodPreference = undefined
    try {
      foodPreference = parseFoodPreference(body.foodPreference);
    } catch (err) {
      console.log(err)
    }

    await prisma.guest.update({
      where: {
        familyId: body.familyId,
        id: body.id,
      },
      data: {
        attendingDay: body.attendingDay,
        attendingEvening: body.attendingEvening,
        foodPreference: foodPreference,
        allergies: body.allergies,
      },
    });

    const family: FamilyWithGuests | null = await prisma.family.findFirst({
      where: {
        id: body.familyId,
      },
      include: {
        guests: {
          orderBy: [
            {
              child: "asc",
            },
            {
              id: "asc",
            },
          ],
        },
      },
    });

    return NextResponse.json({ ok: true, family });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
