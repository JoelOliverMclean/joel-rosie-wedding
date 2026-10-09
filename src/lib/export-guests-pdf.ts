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
export function exportGuestsToPdf(
  guests: GuestsWithFamily[],
  mealOnly: boolean,
) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm" });

  doc.setFontSize(16);
  doc.text(
    mealOnly ? "Wedding Breakfast Guests (day only)" : "Wedding Guests",
    14,
    15,
  );

  doc.setFontSize(10);
  doc.setTextColor(120);
  // doc.text(
  //   `Generated ${new Date().toLocaleDateString()} \u2014 ${guests.length} guests`,
  //   14,
  //   21,
  // );
  doc.setTextColor(0);

  const finalGuests = mealOnly
    ? guests.filter(
        (guest) =>
          guest.familyId != 21 &&
          guest.rsvpResponse == RSVPResponse.FULL_DAY &&
          guest.foodPreference != null,
      )
    : guests;

  const rows = finalGuests.map((g) => [
    g.firstName,
    g.family?.familyName ?? "",
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
    startY: 26,
    head: [
      ["Name", "Family", "Child", "Highchair?", "Food Preference", "Allergies"],
    ],
    body: rows,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [40, 40, 40], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  addSummary(doc, guests, mealOnly);

  const dateStamp = new Date().toISOString().slice(0, 10);
  doc.save(`guest-list-${dateStamp}.pdf`);
}

/** Appends headcount + meal-breakdown tables below the main guest table. */
function addSummary(doc: jsPDF, guests: GuestsWithFamily[], mealOnly: boolean) {
  const totalGuests = guests.length;

  const fullDay = guests.filter(
    (g) => g.rsvpResponse === RSVPResponse.FULL_DAY,
  );
  const fullDayChildren = fullDay.filter((g) => g.child);
  const eveningOnly = guests.filter(
    (g) => g.rsvpResponse === RSVPResponse.EVENING_ONLY,
  );
  const eveningOnlyChildren = eveningOnly.filter((g) => g.child);
  const attending = fullDay.length + eveningOnly.length;

  // "Eating" = has picked a meal at all. "Day guests eating" narrows
  // that to the subset actually invited for the day, since evening-only
  // guests presumably aren't being catered a meal.
  const eating = guests.filter(
    (g) => g.foodPreference != null && g.familyId != 21,
  );
  const dayGuestsEating = eating.filter(
    (g) => g.rsvpResponse == RSVPResponse.FULL_DAY,
  );
  const dayChildGuestsEating = dayGuestsEating.filter((g) => g.child);
  const eveningGuestsEating = guests.filter((g) => g.invitedEvening);
  const eveningChildGuestsEating = eveningGuestsEating.filter((g) => g.child);

  const summaryRows: [string, string][] = [
    ["Total guests", `${totalGuests}`],
    ["Attending (total)", `${attending}`],
    ["  \u2013 Full day", `${fullDay.length}`],
    ["      \u2013 Children", `${fullDayChildren.length}`],
    ["  \u2013 Evening only", `${eveningOnly.length}`],
    ["Day guests eating (meal selected)", `${dayGuestsEating.length}`],
  ];

  // Tally meal choice counts separately per invite type. Two Records
  // rather than one, so a guest invited to both slots (if that's
  // possible in your data) is counted in both columns independently.
  const tallyBy = (list: GuestsWithFamily[]) =>
    list.reduce<Record<string, number>>((acc, g) => {
      const foodPref =
        g.foodPreference == FoodPreference.VEGETARIAN
          ? FoodPreference.VEGAN
          : g.foodPreference;
      const meal = foodPref as string;
      acc[meal] = (acc[meal] ?? 0) + 1;
      return acc;
    }, {});

  const dayMealCounts = tallyBy(dayGuestsEating);
  const dayChildMealCounts = tallyBy(dayChildGuestsEating);
  const eveningMealCounts = tallyBy(eveningGuestsEating);
  const eveningChildMealCounts = tallyBy(eveningChildGuestsEating);

  // Union of meal names across both groups — a meal picked only by
  // evening guests (or only by day guests) still needs its own row,
  // just with a 0 on the other side, rather than being dropped.
  const allMeals = new Set([
    ...Object.keys(dayMealCounts),
    ...Object.keys(dayChildMealCounts),
    ...Object.keys(eveningMealCounts),
    ...Object.keys(eveningChildMealCounts),
  ]);
  const mealRows = Array.from(allMeals)
    .map((meal) => ({
      meal,
      day:
        "" +
        Math.max(
          0,
          (dayMealCounts[meal] ?? 0) - (dayChildMealCounts[meal] ?? 0),
        ) +
        " adults\n" +
        (dayChildMealCounts[meal] ?? 0) +
        " children",
      evening:
        "" +
        Math.max(
          0,
          (eveningMealCounts[meal] ?? 0) - (eveningChildMealCounts[meal] ?? 0),
        ) +
        " adults\n" +
        (eveningChildMealCounts[meal] ?? 0) +
        " children",
    }))
    .map(({ meal, day, evening }) => [
      formatEnumLabel(meal),
      `${day}`,
      `${evening}`,
    ]);
  const dayAdultsEating = dayGuestsEating.length - dayChildGuestsEating.length;
  const eveningOnlyAdults = eveningOnly.length - eveningOnlyChildren.length;
  const eveningAdults =
    fullDay.filter((g) => !g.child).length + eveningOnlyAdults;
  const totalDayEating = `${dayAdultsEating} adults\n${dayChildGuestsEating.length} children`;
  const totalEvening = `${eveningAdults} adults\n${fullDayChildren.length + eveningOnlyChildren.length} children`;

  // Leave room below the guest table; start a fresh page if there
  // isn't enough space left (A4 landscape is ~210mm tall).
  let startY = (doc as DocWithAutoTable).lastAutoTable.finalY + 12;
  if (startY > 160) {
    doc.addPage();
    startY = 20;
  }

  doc.setFontSize(12);
  doc.text("Summary", 14, startY - 4);

  if (!mealOnly)
    autoTable(doc, {
      startY,
      head: [["", "Count"]],
      body: summaryRows,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40], textColor: 255 },
      tableWidth: 90,
    });

  if (mealRows.length > 0) {
    const head = [["Meal Choice", "Day", "Evening"]];
    autoTable(doc, {
      startY,
      margin: mealOnly ? undefined : { left: 112 },
      head: head,
      foot: [["Totals", totalDayEating, totalEvening]],
      body: mealRows,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40], textColor: 255 },
      tableWidth: 90,
    });
  }
}
