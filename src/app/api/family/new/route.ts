import { prisma } from "@/lib/prisma"
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
    rsvpAnswer: data.rsvpAnswer
  };

  console.log(newFamily);

  await prisma.family.create({
    data: newFamily,
  });

  return NextResponse.json(newFamily);
}
