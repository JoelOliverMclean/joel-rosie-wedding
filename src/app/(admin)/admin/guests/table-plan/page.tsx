import { getGuestList } from "@/app/(admin)/admin/guests/actions";
import { FoodPreference, GuestsWithFamily } from "@/lib/prisma-types";
import { useCallback } from "react";
import { exportGuestsToPdf } from "@/lib/export-guests-pdf";
import PrintTables from "@/app/(admin)/admin/guests/table-plan/print-tables";

export const dynamic = "force-dynamic";

export default async function FamilyAdminPage() {
  const guests = await getGuestList();
  const guestsByTable = guests.reduce<Record<string, GuestsWithFamily[]>>(
    (acc, guest) => {
      if (guest.tableName.trim().length === 0) return acc;
      (acc[guest.tableName] ??= []).push(guest);
      return acc;
    },
    {},
  );

  const tables = Object.entries(guestsByTable).sort(([a], [b]) => {
    if (a === "Hobbiton") return -1;
    if (b === "Hobbiton") return 1;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  const getFoodPrefString = (foodPref: FoodPreference | null) => {
    const foodPreference =
      foodPref === FoodPreference.VEGETARIAN ? FoodPreference.VEGAN : foodPref;
    return (
      foodPreference &&
      foodPreference?.substring(0, 1) +
        "" +
        foodPreference?.substring(1).toLowerCase()
    );
  };

  return (
    <div className={"section flex flex-col gap-5"}>
      <div className={"flex justify-between"}>
        <h1>Tables</h1>
        <PrintTables guestsByTable={guestsByTable} />
      </div>

      <div className={"grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"}>
        {tables.map(([tableName, tableGuests]) => (
          <div key={tableName}>
            <h2 className={"h2"}>{tableName}</h2>
            <ul className={"p-1"}>
              {tableGuests
                .sort((a, b) => a.id - b.id)
                .sort((a, b) => (a.child ? 1 : -1) - (b.child ? 1 : -1))
                .sort((a, b) => a.family.id - b.family.id)
                .map((guest) => (
                  <li className={"flex"} key={guest.id}>
                    {guest.firstName}{" "}
                    {guest.lastName === ""
                      ? guest.family.familyName
                      : guest.lastName}{" "}
                    <div className={"flex-1"}></div>
                    {}({getFoodPrefString(guest.foodPreference)})
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
