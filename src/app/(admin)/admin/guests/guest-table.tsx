"use client"

import { GuestsWithFamily } from "@/lib/prisma-types";
import { SquareArrowDown, SquareArrowUp } from "lucide-react";
import { rsvpResponseToString } from "@/lib/prisma-enum-helper";
import { useCallback, useEffect, useState } from "react";

type SortBy = {
  property: string;
  direction: string;
}

const defaultSortBy = { property: "id", direction: "asc" };

export default function GuestTable(props: {
  guests: GuestsWithFamily[];
}) {
  const [guests, setGuests] = useState<GuestsWithFamily[]>(props.guests);
  const [sortBy, setSortBy] = useState<SortBy>(defaultSortBy);

  const onTableHeaderClick = (property: string) => {
    let newSortBy = {...sortBy}
    if (newSortBy.property === property) {
      if (newSortBy.direction === "desc") {
        newSortBy = defaultSortBy;
      } else {
        newSortBy = {
          ...sortBy,
          direction: sortBy.direction === "asc" ? "desc" : "asc",
        };
      }
    } else {
      newSortBy = { ...sortBy, property: property };
    }
    console.log(newSortBy);
    sortGuests(newSortBy);
    setSortBy(newSortBy);
  }

  const tableHeader = (name: string, property: string) => (
    <div className={"flex justify-center"}>
      <div
        onClick={() => onTableHeaderClick(property)}
        className={"flex cursor-pointer! gap-2"}
      >
        {name}
        {sortBy.property === property && (
          <button
            onClick={() => onTableHeaderClick(property)}
            className={"cursor-pointer"}
          >
            {sortBy.direction === "desc" ? (
              <SquareArrowDown />
            ) : (
              <SquareArrowUp />
            )}
          </button>
        )}
      </div>
    </div>
  );

  const sortGuests = useCallback((sortBy: SortBy) => {
    const newGuests = [...guests]
    setGuests(newGuests.sort((a, b) => {
      const getKey = (item: GuestsWithFamily) => {
        if (sortBy.property === "family")
          return item.family?.familyName ?? null;
        else if (sortBy.property === "contact")
          return item.family?.contact ?? null;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return item[sortBy.property] ?? null;
      };

      const keyA = getKey(a);
      const keyB = getKey(b);

      // Handle nulls first — nulls always sort to bottom
      if (keyA === null && keyB === null) return 0;
      if (keyA === null) return sortBy.direction === "asc" ? 1 : -1;
      if (keyB === null) return sortBy.direction === "asc" ? -1 : 1;

      const order =
        typeof keyA === "string"
          ? keyA.localeCompare(keyB)
          : keyA < keyB
            ? -1
            : keyA > keyB
              ? 1
              : 0;

      return sortBy.direction === "asc" ? order : -order;
    }))
  }, [guests]);

  useEffect(() => {
    sortGuests(sortBy)
  }, []);

  return (
    <div className={"card p-2"}>
      <table className={"w-full"}>
        <thead>
          <tr>
            <th className={"table-header"}>
              {tableHeader("Name", "firstName")}
            </th>
            <th className={"table-header"}>
              {tableHeader("Family", "family")}
            </th>
            <th className={"table-header"}>
              {tableHeader("RSVP", "rsvpResponse")}
            </th>
            <th className={"table-header"}>
              {tableHeader("Meal Choice", "foodPreference")}
            </th>
            <th className={"table-header"}>
              {tableHeader("Contact", "contact")}
            </th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className={"table-cell"}>{guest.firstName}</td>
              <td className={"table-cell"}>{guest.family.familyName}</td>
              <td className={"table-cell"}>
                {rsvpResponseToString(guest.rsvpResponse)}
              </td>
              <td className={"table-cell"}>
                {guest.foodPreference &&
                  guest.foodPreference?.substring(0, 1) +
                    "" +
                    guest.foodPreference?.substring(1).toLowerCase()}
              </td>
              <td className={"table-cell"}>{guest.family.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}