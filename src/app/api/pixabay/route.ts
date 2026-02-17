// app/api/pixabay/route.ts
import { NextResponse } from "next/server";

type PixabayHit = {
  id: number;
  pageURL: string;
  tags: string;
  webformatURL: string;
};

type PixabayResponse = {
  hits: PixabayHit[];
  totalHits?: number;
};

export async function GET(req: Request) {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing PIXABAY_API_KEY" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "wedding";
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "17";

  const url =
    "https://pixabay.com/api/?" +
    new URLSearchParams({
      key,
      q,
      image_type: "photo",
      safesearch: "true",
      order: "popular",
      page,
      per_page,
    });

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch images from Pixabay" },
      { status: 500 },
    );
  }

  const data = (await res.json()) as PixabayResponse;

  // Basic "hasMore" inference (Pixabay doesn't return explicit next-page info)
  const perPageNum = Number(per_page);
  const hasMore = (data.hits?.length ?? 0) === perPageNum;

  return NextResponse.json({
    hits: data.hits ?? [],
    hasMore,
  });
}
