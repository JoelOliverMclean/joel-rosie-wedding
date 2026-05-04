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
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
      onClick={onDismiss}
    >
      <div
        className="max-w-[320px] card"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Popover;
