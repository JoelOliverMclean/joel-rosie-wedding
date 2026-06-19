"use client";

import { GuestsWithFamily } from "@/lib/prisma-types";
import { Check, SquareArrowDown, SquareArrowUp } from "lucide-react";
import { rsvpResponseToString } from "@/lib/prisma-enum-helper";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SortBy = {
  property: string;
  direction: string;
};

const defaultSortBy = { property: "id", direction: "asc" };

export default function GuestTable(props: {
  guests: GuestsWithFamily[];
  deleteGuests: (guests: GuestsWithFamily[]) => Promise<void>;
}) {
  const router = useRouter();

  const [guests, setGuests] = useState<GuestsWithFamily[]>(props.guests);
  const [selectedGuests, setSelectedGuests] = useState<GuestsWithFamily[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>(defaultSortBy);

  const onTableHeaderClick = (property: string) => {
    let newSortBy = { ...sortBy };
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
    sortGuests(guests, newSortBy);
    setSortBy(newSortBy);
  };

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

  const toggleGuestSelected = useCallback(
    (guest: GuestsWithFamily) => {
      const index = selectedGuests.indexOf(guest);
      if (index >= 0) {
        const newSelectedGuests = selectedGuests.toSpliced(index);
        setSelectedGuests(newSelectedGuests);
      } else {
        setSelectedGuests([...selectedGuests, guest]);
      }
    },
    [selectedGuests],
  );

  const toggleAllGuestsSelected = useCallback(() => {
    if (selectedGuests.length !== guests.length) {
      setSelectedGuests([...guests]);
    } else {
      setSelectedGuests([]);
    }
  }, [guests, selectedGuests.length]);

  const deleteSelected = useCallback(() => {
    props.deleteGuests(selectedGuests).then(() => {
      setSelectedGuests([]);
      router.refresh();
    });
  }, [props, router, selectedGuests]);

  const sortGuests = useCallback(
    (guestList: GuestsWithFamily[], sortBy: SortBy) => {
      const sorted = [...guestList].sort((a, b) => {
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
      });
      setGuests(sorted);
    },
    [],
  );

  useEffect(() => {
    sortGuests(props.guests, sortBy);
  }, []);

  useEffect(() => {
    sortGuests(props.guests, sortBy);
  }, [props.guests]);

  return (
    <>
      <div>
        {guests.length} guests -{" "}
        {[...new Set(guests.map((g) => g.familyId))].length} families
      </div>
      <div className={"card overflow-x-scroll p-2"}>
        <table className={"w-full min-w-6xl lg:min-w-auto"}>
          <thead className="sticky top-0 z-10">
            <tr>
              <th className={"table-header"}>
                <div className={"flex justify-center"}>
                  <div className="checkbox" onClick={toggleAllGuestsSelected}>
                    <Check
                      size={18}
                      className={`${selectedGuests.length === guests.length ? "opacity-100" : "opacity-0"} duration-300`}
                    />
                  </div>
                </div>
              </th>
              <th className={"table-header"}>
                {tableHeader("Name", "firstName")}
              </th>
              <th className={"table-header"}>
                {tableHeader("Family", "family")}
              </th>
              <th className={"table-header"}>
                {tableHeader("Is Child", "child")}
              </th>
              <th className={"table-header"}>
                {tableHeader("Day", "invitedDay")}
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
                <td className={"table-cell"}>
                  <div className={"flex justify-center"}>
                    <div
                      className="checkbox"
                      onClick={() => toggleGuestSelected(guest)}
                    >
                      <Check
                        size={18}
                        className={`${selectedGuests.includes(guest) ? "opacity-100" : "opacity-0"} duration-300`}
                      />
                    </div>
                  </div>
                </td>
                <td className={"table-cell"}>{guest.firstName}</td>
                <td className={"table-cell"}>
                  <div
                    className={"cursor-pointer"}
                    onClick={() =>
                      router.push(`/admin/family/${guest.family.id}`)
                    }
                  >
                    {guest.family.familyName}
                  </div>
                </td>
                <td className={"table-cell"}>
                  <div>
                    <Check
                      size={18}
                      className={`${guest.child ? "opacity-100" : "opacity-0"} duration-300`}
                    />
                  </div>
                </td>
                <td className={"table-cell"}>
                  <div>
                    <Check
                      size={18}
                      className={`${guest.invitedDay ? "opacity-100" : "opacity-0"} duration-300`}
                    />
                  </div>
                </td>
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
      <div>{guests.length} guests</div>
      {selectedGuests.length > 0 && (
        <div
          className={
            "fixed right-0 bottom-10 left-0 z-10 flex justify-center p-5"
          }
        >
          <div className={"pill"}>
            <button className={"btn btn--ghost z-10"} onClick={deleteSelected}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
