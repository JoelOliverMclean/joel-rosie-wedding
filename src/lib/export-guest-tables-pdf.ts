import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { $Enums, FoodPreference, GuestsWithFamily } from "@/lib/prisma-types";
import { rsvpResponseToString } from "@/lib/prisma-enum-helper";
import RSVPResponse = $Enums.RSVPResponse;

// jspdf-autotable augments jsPDF's type with `lastAutoTable`, but that
// augmentation isn't always picked up depending on import order/tsconfig,
// so this narrows it locally rather than sprinkling `as any` everywhere.
type DocWithAutoTable = jsPDF & { lastAutoTable: { finalY: number } };

// Same "Foo" capitalization used for meal names throughout — pulled out
// once so the guest rows and the summary breakdown can't drift apart.
const formatEnumLabel = (value: string) =>
  value.substring(0, 1) + value.substring(1).toLowerCase();

/**
 * Builds a landscape-orientation PDF of the given guests — a full guest
 * table followed by a summary block (headcounts, RSVP split, meal
 * breakdown) — and triggers a browser download.
 */
export function exportGuestTablesToPdf(
  guestsByTable: Record<string, GuestsWithFamily[]>,
) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm" });

  doc.setFontSize(16);
  doc.text("Table Arrangements", 14, 15);

  doc.setFontSize(10);

  const finalTables = Object.entries(guestsByTable).sort(([a], [b]) => {
    if (a === "Hobbiton") return -1;
    if (b === "Hobbiton") return 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  finalTables.map(([tableName, finalGuests]) => {
    doc.setFontSize(14);
    doc.text(tableName, 14, 24);

    doc.setFontSize(10);

    const rows = finalGuests.map((g) => [
      `${g.firstName} ${g.lastName.length > 0 ? g.lastName : g.family?.familyName}`,
      g.child ? "Yes" : "",
      g.highchairRequired ? "Yes" : "",
      g.foodPreference ? formatEnumLabel(g.foodPreference) : "",
      g.allergies == "No" ||
      g.allergies.includes("N/A") ||
      g.allergies.includes("intol")
        ? ""
        : (g.allergies ?? ""),
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Child", "Highchair?", "Food Preference", "Allergies"]],
      body: rows,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.addPage();
  });

  const dateStamp = new Date().toISOString().slice(0, 10);
  doc.save(`guest-list-${dateStamp}.pdf`);
}
