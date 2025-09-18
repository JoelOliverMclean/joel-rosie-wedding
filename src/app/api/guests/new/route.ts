import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const newGuest: {
    firstName: string;
    lastName: string;
    familyId: number;
    child: boolean;
  } = {
    firstName: data.firstName,
    lastName: data.lastName,
    familyId: parseInt(data.familyId),
    child: data.child === "true"
  };

  console.log(newGuest);

  await prisma.guest.create({
    data: newGuest,
  });

  return NextResponse.json(newGuest);
}
