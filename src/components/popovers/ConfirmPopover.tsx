"use client"

import Popover from "@/components/popovers/_Popover";

export default function ConfirmPopover({
  onConfirmAction,
  onDismissAction,
}: {
  onConfirmAction: () => void;
  onDismissAction: () => void;
}) {
  return (
    <Popover onDismiss={onDismissAction}>
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to confirm? This cannot be undone.</p>
        <div className={"flex gap-4"}>
          <button
            onClick={onConfirmAction}
            className={"btn btn--primary flex-1/2"}
          >
            Yes
          </button>
          <button
            onClick={onDismissAction}
            className={"btn btn--ghost flex-1/2"}
          >
            No
          </button>
        </div>
      </div>
    </Popover>
  );
}