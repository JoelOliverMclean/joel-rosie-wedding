import React from "react";

function Popover({
  children,
  onDismiss,
}: Readonly<{
  children: React.ReactNode;
  onDismiss: () => void;
}>) {
  return (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-black/50"
      onClick={onDismiss}
    >
      <div
        className="max-w-[320px] rounded-3xl bg-green-900/80 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Popover;
