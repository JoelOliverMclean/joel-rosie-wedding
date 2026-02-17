"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type PixabayHit = {
  id: number;
  pageURL: string;
  tags: string;
  webformatURL: string;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomThreeWithMinSeeded(
  min: number,
  rand: () => number,
): [number, number, number] {
  const remaining = 1 - min * 3;

  const r1 = rand();
  const r2 = rand();
  const [a, b] = [r1, r2].sort();

  const extra1 = a * remaining;
  const extra2 = (b - a) * remaining;
  const extra3 = (1 - b) * remaining;

  return [min + extra1, min + extra2, min + extra3];
}

export default function GalleryClient({
  initialHits,
}: {
  initialHits: PixabayHit[];
}) {
  const [hits, setHits] = useState<PixabayHit[]>(initialHits);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(-1);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const MIN = 0.25;
  // derived
  const groupsOfThree = Math.ceil(hits.length / 3);

  // seed based on initial data so it matches server + client for the first render
  const seed = useMemo(() => {
    // stable across server/client because initialHits is identical
    const first = hits[0]?.id ?? 1;
    const last = hits[hits.length - 1]?.id ?? 1;
    return (first * 1000003) ^ last ^ groupsOfThree;
  }, [hits, groupsOfThree]);

  const [rowWeights, setRowWeights] = useState<[number, number, number][]>(
    () => {
      // initial weights for initial rows
      const initialRows = Math.ceil(initialHits.length / 3);
      return Array.from({ length: initialRows }, (_, i) =>
        randomThreeWithMinSeeded(MIN, mulberry32(seed + i * 1013)),
      );
    },
  );

  function ensureWeightsForRows(rowCount: number) {
    setRowWeights((prev) => {
      if (prev.length >= rowCount) return prev;

      const next = prev.slice();
      let row = 0;
      while (next.length < rowCount) {
        const rand = mulberry32(seed + row * 1013);
        next.push(randomThreeWithMinSeeded(MIN, rand));
        row++;
      }
      return next;
    });
  }

  const [isImgVisible, setIsImgVisible] = useState(true);

  useEffect(() => {
    if (fullScreenImageIndex < 0) return;

    setIsImgVisible(false);
    const t = window.setTimeout(() => setIsImgVisible(true), 20); // next tick
    return () => window.clearTimeout(t);
  }, [fullScreenImageIndex]);


  const closeModal = () => setFullScreenImageIndex(-1);

  const showPrev = () => setFullScreenImageIndex((i) => (i > 0 ? i - 1 : i));

  const showNext = () =>
    setFullScreenImageIndex((i) => (i >= 0 && i < hits.length - 1 ? i + 1 : i));

  useEffect(() => {
    if (fullScreenImageIndex < 0) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // hits.length is needed so ArrowRight respects new items after loadMore
  }, [fullScreenImageIndex, hits.length, showNext]);

  useEffect(() => {
    if (fullScreenImageIndex < 0) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [fullScreenImageIndex]);

  useEffect(() => {
    ensureWeightsForRows(groupsOfThree);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupsOfThree]);

  async function loadMore() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `/api/pixabay?q=wedding&page=${nextPage}&per_page=17`,
      );
      if (!res.ok) throw new Error("Failed to load more images");
      const data = (await res.json()) as {
        hits: PixabayHit[];
        hasMore: boolean;
      };

      setHits((prev) => {
        const seen = new Set(prev.map((x) => x.id));
        const merged = [...prev];
        for (const h of data.hits) if (!seen.has(h.id)) merged.push(h);
        return merged;
      });

      setPage(nextPage);
      setHasMore(data.hasMore);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { root: null, rootMargin: "400px", threshold: 0 },
    );

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasMore, isLoading]);

  return (
    <>
      {/* Desktop */}
      <section className="mt-6 hidden flex-col gap-3 md:flex">
        {Array.from({ length: groupsOfThree }).map((_, i) => {
          // 3) Use memoised weights instead of calling randomThreeWithMin() in render
          const weights = rowWeights[i] ?? [0.33, 0.33, 0.34];

          return (
            <div key={i} className="flex gap-3">
              {Array.from({ length: 3 }).map((_, j) => {
                const index = i * 3 + j;
                const hit = hits[index];
                return (
                  <div key={j} style={{ flexGrow: weights[j], flexBasis: 0 }}>
                    {hit ? (
                      <figure
                        className={[
                          "group relative h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50",
                        ].join(" ")}
                      >
                        <Image
                          src={hit.webformatURL}
                          alt={hit.tags || "Wedding photo"}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          sizes="(min-width: 768px) 33vw, 50vw"
                          priority={i < 2}
                        />
                        <button
                          onClick={() => {
                            setFullScreenImageIndex(index);
                          }}
                          className="absolute inset-0 cursor-pointer"
                          aria-label="Open source on Pixabay"
                        />
                      </figure>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>

      {/* Mobile */}
      <section className="mt-6 flex flex-col gap-3 md:hidden">
        {hits.map((hit, i) => (
          <figure
            key={hit.id}
            className={[
              "group relative h-[320px] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50",
            ].join(" ")}
          >
            <Image
              src={hit.webformatURL}
              alt={hit.tags || "Wedding photo"}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(min-width: 768px) 33vw, 50vw"
              priority={i < 2}
            />
            <button
              onClick={() => {
                setFullScreenImageIndex(i);
              }}
              className="absolute inset-0 cursor-pointer"
              aria-label="Open source on Pixabay"
            />
          </figure>
        ))}
      </section>

      <div ref={sentinelRef} className="h-1" />
      <div className="mt-6 text-sm text-neutral-600">
        {isLoading
          ? "Loading more…"
          : hasMore
            ? "Scroll to load more"
            : "No more images"}
      </div>

      <section>
        {fullScreenImageIndex >= 0 && fullScreenImageIndex < hits.length && (
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:px-10 md:pt-[calc(env(safe-area-inset-top)+2.5rem)] md:pb-[calc(env(safe-area-inset-bottom)+2.5rem)] lg:px-16 lg:pt-[calc(env(safe-area-inset-top)+3.5rem)] lg:pb-[calc(env(safe-area-inset-bottom)+3.5rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="relative w-full max-w-6xl">
              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-2 right-2 z-20 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/75"
              >
                ×
              </button>

              {/* Prev */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                disabled={fullScreenImageIndex <= 0}
                aria-label="Previous image"
                className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/75 disabled:opacity-40"
              >
                ←
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                disabled={fullScreenImageIndex >= hits.length - 1}
                aria-label="Next image"
                className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white hover:bg-black/75 disabled:opacity-40"
              >
                →
              </button>

              {/* Image container */}
              <div
                className="relative mx-auto flex max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem)] w-full items-center justify-center overflow-hidden rounded-2xl bg-black"
                style={{
                  height:
                    "calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 1.5rem)",
                }}
              >
                <div
                  className={[
                    "absolute inset-0 transition-opacity duration-300 ease-out",
                    isImgVisible ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                >
                  <Image
                    key={hits[fullScreenImageIndex].id}
                    src={hits[fullScreenImageIndex].webformatURL}
                    alt={hits[fullScreenImageIndex].tags || "Wedding photo"}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
