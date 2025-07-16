import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const prisma = await import("@/lib/prisma").then((mod) => mod.prisma);

  const data = await request.json();

  const newGuest: {
    id: string;
    name: string;
    plusOne?: string;
    email: string;
    question: string;
    answer: string;
    rsvp: boolean;
    createdAt?: Date;
    updatedAt: Date;
  } = {
    id: crypto.randomUUID(), // or any UUID generator
    name: data.name,
    plusOne: data.plusOne, // optional; omit or set to undefined/null if not needed
    email: data.email,
    question: data.question,
    answer: data.answer,
    rsvp: false,
    createdAt: new Date(), // optional; Prisma will use default if omitted
    updatedAt: new Date(),
  };

  console.log(newGuest);

  await prisma.guest.create({
    data: newGuest,
  });

  return NextResponse.json(newGuest);
}
