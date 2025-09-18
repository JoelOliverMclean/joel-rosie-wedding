import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  var families = await prisma.family.findMany()
  return NextResponse.json({families});
}
