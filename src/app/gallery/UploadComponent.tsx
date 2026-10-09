"use client";

import { UploadCloud } from "lucide-react";
import UploadPopover from "@/app/gallery/UploadPopover";
import { useState } from "react";

export default function UploadComponent() {
  const [showUploadPopover, setShowUploadPopover] = useState(false);

  const onShowUploadPopover = () => {
    setShowUploadPopover(true);
  };
  const onDismissPopover = () => {
    setShowUploadPopover(false);
  };

  return (
    <>
      <button
        className={"btn--primary btn flex gap-2"}
        onClick={onShowUploadPopover}
      >
        Upload <UploadCloud />
      </button>

      {showUploadPopover && (
        <UploadPopover onDismissAction={onDismissPopover} />
      )}
    </>
  );
}
