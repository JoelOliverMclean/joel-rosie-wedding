import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const families = await prisma.family.findMany({
    include: {
      guests: {
        orderBy: {
          id: "asc"
        }
      }
    }
  });
  return NextResponse.json({ families });
}
