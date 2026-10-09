"use client";

import { useCallback } from "react";
import { exportGuestTablesToPdf } from "@/lib/export-guest-tables-pdf";
import { GuestsWithFamily } from "@/lib/prisma-types";

export default function PrintTables(props: {
  guestsByTable: Record<string, GuestsWithFamily[]>;
}) {
  const print = useCallback(() => {
    exportGuestTablesToPdf(props.guestsByTable);
  }, [props.guestsByTable]);

  return (
    <button onClick={print} className={"btn btn--ghost"}>
      Print
    </button>
  );
}
