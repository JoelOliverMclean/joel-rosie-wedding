"use client";
import Popover from "@/components/popovers/_Popover";
import { FormEvent, useEffect, useState } from "react";
import { ImagePlus, UploadCloud, X } from "lucide-react";
import Image from "next/image";

type UploadItem = {
  file: File;
  previewUrl: string;
  status: "idle" | "uploading" | "success" | "error";
  errorMessage: string | null;
};

export default function UploadPopover({
  onDismissAction,
}: {
  onDismissAction: () => void;
}) {
  const [items, setItems] = useState<UploadItem[]>([]);

  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return;
    const newItems: UploadItem[] = Array.from(fileList).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: "idle",
      errorMessage: null,
    }));
    setItems((prev) => [...prev, ...newItems]);
  }

  function removeItem(index: number) {
    setItems((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function uploadOne(index: number) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, status: "uploading" } : it)),
    );

    const formData = new FormData();
    formData.append("photo", items[index].file);

    try {
      const res = await fetch("/api/photos/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((it, i) =>
            i === index ? { ...it, status: "success" } : it,
          ),
        );
      } else {
        const data = await res.json();
        setItems((prev) =>
          prev.map((it, i) =>
            i === index
              ? {
                  ...it,
                  status: "error",
                  errorMessage: data.error ?? "Upload failed",
                }
              : it,
          ),
        );
      }
    } catch {
      setItems((prev) =>
        prev.map((it, i) =>
          i === index
            ? { ...it, status: "error", errorMessage: "Network error" }
            : it,
        ),
      );
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const pendingIndexes = items
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => item.status === "idle" || item.status === "error")
      .map(({ i }) => i);

    await Promise.all(pendingIndexes.map((i) => uploadOne(i)));
  }

  const allDone =
    items.length > 0 && items.every((it) => it.status === "success");
  const anyUploading = items.some((it) => it.status === "uploading");

  const onDismiss = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
    onDismissAction();
  };

  return (
    <Popover onDismiss={onDismiss} className={"w-full max-w-[640px]!"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {allDone ? (
          <p>Thanks! Your photos will appear once approved.</p>
        ) : (
          <>
            <label
              htmlFor="photo-input"
              className="relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-4 text-center duration-300 hover:border-gray-400"
            >
              <ImagePlus className="h-8 w-8 text-gray-400" />
              <span className="text-sm">
                {items.length === 0
                  ? "Click to choose photos"
                  : `${items.length} photo${items.length === 1 ? "" : "s"} selected — click to add more`}
              </span>
            </label>
            <input
              id="photo-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
            />

            {items.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {items.map((item, i) => (
                  <div
                    key={item.previewUrl}
                    className="relative h-24 overflow-hidden rounded-md border border-gray-200"
                  >
                    <Image
                      src={item.previewUrl}
                      alt={item.file.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    {item.status === "idle" && (
                      <button
                        type="button"
                        onClick={() => removeItem(i)}
                        className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white"
                        aria-label="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                    {item.status === "uploading" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white">
                        Uploading…
                      </div>
                    )}
                    {item.status === "success" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white">
                        Done
                      </div>
                    )}
                    {item.status === "error" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-900/60 p-1 text-center text-[10px] text-white">
                        {item.errorMessage}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={items.length === 0 || anyUploading}
              className="btn btn--primary flex gap-2"
            >
              Upload {items.length > 0 && `(${items.length})`} <UploadCloud />
            </button>
          </>
        )}
        <button
          type="button"
          disabled={anyUploading}
          onClick={onDismiss}
          className="btn btn--ghost"
        >
          {allDone ? "Dismiss" : "Cancel"}
        </button>
      </form>
    </Popover>
  );
}
