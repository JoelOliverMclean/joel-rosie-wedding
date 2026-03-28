"use client";

import { FoodPreference, Guest } from "@/lib/prisma-types";
import React from "react";
import { parseFoodPreference } from "@/lib/prisma-enum-helper";

export default function RsvpForm(props: {
  guest: Guest;
  guestCount: number;
  onSubmit: (updatedGuest: Guest) => void;
  onNotYou: () => void;
  onBackToGuests: () => void;
}) {
  const [updatedGuest, setUpdatedGuest] = React.useState<Guest>({
    ...props.guest,
  });

  function onAttendingDayUpdated(attendingDay: boolean) {
    setUpdatedGuest({ ...updatedGuest, attendingDay: attendingDay });
  }

  function onAttendingEveningUpdated(attendingEvening: boolean) {
    setUpdatedGuest({ ...updatedGuest, attendingEvening: attendingEvening });
  }

  function onFoodPreferenceUpdated(foodPreference: string) {
    setUpdatedGuest({
      ...updatedGuest,
      foodPreference: parseFoodPreference(foodPreference),
    });
  }

  function onAllergiesUpdated(allergies: string) {
    setUpdatedGuest({
      ...updatedGuest,
      allergies: allergies,
    });
  }

  function onSubmitPressed() {
    props.onSubmit(updatedGuest);
  }

  return (
    <div className={"flex flex-col items-start gap-5"}>
      <div key={props.guest.id} className={"card flex flex-col gap-5"}>
        { props.guestCount > 1 &&
          <button className={"btn btn--ghost"} onClick={props.onBackToGuests}>
            ← Back to guests
          </button>
        }
        <div className={"h2 font-bold"}>
          {props.guest.firstName} {props.guest.lastName}
        </div>
        {props.guest.invitedDay && (
          <div className={"flex items-center gap-5"}>
            <label htmlFor="attendingDay">Attending Ceremony?</label>
            <div
              className={
                "flex h-[24px] w-[24px] cursor-pointer rounded-md border-[1.5px] border-[var(--fg)] p-[2px]"
              }
              onClick={() => onAttendingDayUpdated(!updatedGuest.attendingDay)}
            >
              {updatedGuest.attendingDay && (
                <div className={"flex-1 rounded-sm bg-white"}></div>
              )}
            </div>
          </div>
        )}
        {props.guest.invitedEvening && (
          <div className={"flex items-center gap-5"}>
            <label htmlFor="attendingEvening">Attending Party?</label>
            <div
              className={
                "flex h-[24px] w-[24px] cursor-pointer rounded-md border-[1.5px] border-[var(--fg)] p-[2px]"
              }
              onClick={() =>
                onAttendingEveningUpdated(!updatedGuest.attendingEvening)
              }
            >
              {updatedGuest.attendingEvening && (
                <div className={"flex-1 rounded-sm bg-white"}></div>
              )}
            </div>
          </div>
        )}
        <div className={"flex flex-wrap items-center gap-5"}>
          <label htmlFor="foodPreference">Food Preference</label>
          <select
            name={"foodPreference"}
            value={updatedGuest.foodPreference ?? FoodPreference.MEAT}
            onChange={(e) => onFoodPreferenceUpdated(e.target.value)}
          >
            <option value={FoodPreference.MEAT}>Meat</option>
            <option value={FoodPreference.VEGETARIAN}>Vegetarian</option>
            <option value={FoodPreference.VEGAN}>Vegan</option>
          </select>
        </div>
        <div className={"flex flex-col gap-2"}>
          <label htmlFor="allergies">Allergies/Dietary Requirements</label>
          <input
            type="text"
            name={"allergies"}
            value={updatedGuest.allergies}
            onChange={(e) => onAllergiesUpdated(e.target.value)}
          />
        </div>
        <div className={"flex items-center justify-center"}>
          <button onClick={onSubmitPressed} className={"btn btn--primary"}>
            Update RSVP
          </button>
        </div>
      </div>
    </div>
  );
}