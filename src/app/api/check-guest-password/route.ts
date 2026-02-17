import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log(data);

  if (data.password === "" || data.password === undefined) {
    return NextResponse.json(
      {},
      { status: 403, statusText: "Password required." },
    );
  }

  if (data.password === "mellon") {
    return NextResponse.json(
      {},
      { status: 200, statusText: "Access granted"}
    );
  } else {
    return NextResponse.json(
      {},
      { status: 401, statusText: "Password incorrect." },
    );
  }
}