import React from "react";

function Popover({
  children,
  className,
  onDismiss,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  onDismiss: () => void;
}>) {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-5"
      onClick={onDismiss}
    >
      <div
        className={`card max-h-screen max-w-[320px] ${className ?? ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Popover;
