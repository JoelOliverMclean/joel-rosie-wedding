"use client";

import { FoodPreference, Guest, RSVPResponse } from "@/lib/prisma-types";
import React from "react";
import {
  parseFoodPreference,
  parseRSVPResponse,
} from "@/lib/prisma-enum-helper";

export default function RsvpForm(props: {
  guest: Guest;
  onFoodPreferenceChange: (
    guest: Guest,
    foodPreference: FoodPreference,
  ) => void;
  onRSVPResponseChange: (guest: Guest, rsvpResponse: RSVPResponse) => void;
  onAllergiesChange: (guest: Guest, allergies: string) => void;
  guestCount: number;
  onSubmit: (updatedGuest: Guest) => void;
  onNotYou: () => void;
  onBackToGuests: () => void;
}) {

  function onFoodPreferenceUpdated(foodPreference: string) {
    props.onFoodPreferenceChange(props.guest, parseFoodPreference(foodPreference))
  }

  function onRSVPResponseUpdated(rsvpResponse: string) {
    props.onRSVPResponseChange(props.guest, parseRSVPResponse(rsvpResponse));
  }

  function onAllergiesUpdated(allergies: string) {
    props.onAllergiesChange(props.guest, allergies);
  }

  return (
    <div key={props.guest.id} className={"card flex flex-col gap-5"}>
      <div className={"h2 font-bold"}>
        {props.guest.firstName} {props.guest.lastName}
      </div>
      <div className={"flex flex-col gap-2"}>
        <label htmlFor="rsvpResponse">Attendance *</label>
        <select
          name={"rsvpResponse"}
          value={props.guest.rsvpResponse ?? undefined}
          onChange={(e) => onRSVPResponseUpdated(e.target.value)}
        >
          <option value={undefined}>Choose one...</option>
          {props.guest.invitedDay && (
            <option value={RSVPResponse.FULL_DAY}>Whole Day</option>
          )}
          <option value={RSVPResponse.EVENING_ONLY}>
            Evening{props.guest.invitedDay && " Only"}
          </option>
          <option value={RSVPResponse.NOT_ATTENDING}>Not attending</option>
        </select>
      </div>
      {props.guest.rsvpResponse !== RSVPResponse.NOT_ATTENDING && (
        <>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="foodPreference">Food Preference *</label>
            <select
              name={"foodPreference"}
              value={props.guest.foodPreference ?? undefined}
              onChange={(e) => onFoodPreferenceUpdated(e.target.value)}
            >
              <option value={undefined}>Choose one...</option>
              <option value={FoodPreference.MEAT}>Meat</option>
              <option value={FoodPreference.VEGETARIAN}>Vegetarian</option>
              <option value={FoodPreference.VEGAN}>Vegan</option>
            </select>
          </div>
          <div className={"flex flex-col gap-2"}>
            <label htmlFor="allergies">
              Allergies/Dietary Requirements{" "}
              <span className={"muted small"}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder={"e.g. Gluten free, nut allergy, etc..."}
              name={"allergies"}
              value={props.guest.allergies}
              onChange={(e) => onAllergiesUpdated(e.target.value)}
            />
          </div>
        </>
      )}
      <div className={"text-end muted small"}>* = required</div>
    </div>
  );
}