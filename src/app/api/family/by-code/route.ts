import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { FamilyWithGuests } from "@/lib/prisma-types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  console.log(searchParams);

  const code: string = searchParams.get("code") ?? "";

  console.log(code);

  if (code.length === 0) {
    return NextResponse.json(
      {
        error: "Invalid code",
      },
      {
        status: 400,
      },
    );
  }

  const family: FamilyWithGuests | null = await prisma.family.findFirst({
    where: {
      rsvpCode: code,
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
    return NextResponse.json(
      {
        error: "Invalid code",
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ family });
}