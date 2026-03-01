import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
  });
}

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const base64 = auth.slice("Basic ".length);
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [user, pass] = decoded.split(":");

  if (
    user !== process.env.BASIC_AUTH_USER ||
    pass !== process.env.BASIC_AUTH_PASS
  ) {
    return unauthorized();
  }

  return NextResponse.next();
}

// Protect only these paths:
export const config = {
  matcher: ["/admin/:path*", "/internal/:path*"],
};
