"use client";
import { BaseForm, BaseFormData } from "@/components/forms/BaseForm";
import { apiGet } from "@/utils/apiUtils";
import React, { useState } from "react";
import { FoodPreference } from "../../../generated/prisma";

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  child: boolean;
  invitedDay: boolean;
  invitedEvening: boolean;
  attendingDay: boolean;
  attendingEvening: boolean;
  allergies: string;
  foodPreference?: FoodPreference;
}

interface Family {
  id: number;
  familyName: string;
  guests: Guest[];
}

function RSVPCodePage() {
  const [error, setError] = useState(null);
  const [family, setFamily] = useState<Family | null | undefined>(null);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null | undefined>(
    null,
  );

  const checkCode = (formData: BaseFormData) => {
    console.log(formData);
    apiGet(`/api/family/by-code?code=${formData.code}`).then(
      ({ response, data }) => {
        if (response.status === 200) {
          console.log(data);
          setFamily(data.family);
          setSelectedGuest(data.family.guests[0]);
        } else {
          console.log(data.error);
          setError(data.error);
        }
      },
    );
  };

  return family ? (
    <>
      <div className="panel-green flex flex-col gap-3 text-center">
        <div className="text-2xl font-bold">Hey {family.familyName}s</div>
        <div className="font-semibold">
          We can't wait for you to join our party on Saturday 31st October 2026.
        </div>
        <div className="font-semibold">
          We just need you to answer a few Qs!
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-end gap-1 self-start px-4">
          {family.guests.map((guest) => (
            <div
              className={`rounded-t-xl ${selectedGuest === guest ? "bg-green-700 px-4 pt-3" : "bg-green-900"} px-3 py-2 shadow-black duration-300`}
              onClick={() => setSelectedGuest(guest)}
            >
              {guest.firstName}
            </div>
          ))}
        </div>
        <div className="panel-green w-full">
          {selectedGuest?.invitedDay && (
            <div>
              <input
                type="checkbox"
                name={`${selectedGuest.firstName}_invitedDay`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="panel">
      <BaseForm onSubmitData={checkCode} error={error}>
        <input type="text" name="code" placeholder="Enter your RSVP code" />
      </BaseForm>
    </div>
  );
}

export default RSVPCodePage;
