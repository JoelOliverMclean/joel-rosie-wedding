"use client";
import { BaseForm, BaseFormData } from "@/components/forms/BaseForm";
import { apiGet } from "@/utils/apiUtils";
import React, { useState } from "react";
import { FoodPreference } from "../../../generated/prisma";
import { Check } from "lucide-react";

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
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<number>(0);

  const checkCode = (formData: BaseFormData) => {
    console.log(formData);
    apiGet(`/api/family/by-code?code=${formData.code}`).then(
      ({ response, data }) => {
        if (response.status === 200) {
          console.log(data);
          setFamily(data.family);
          setGuests(data.family.guests);
          setSelectedGuest(0);
        } else {
          console.log(data.error);
          setError(data.error);
        }
      },
    );
  };

  const updateGuestIsAttendingDay = (index: number, attendingDay: boolean) => {
    console.log(attendingDay);
    const guest = guests[index];
    guest.attendingDay = attendingDay;
    const newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const guestPanelContent = () => {
    const guest: Guest = guests[selectedGuest];
    return (
      <>
        {guest.invitedDay && (
          <>
            <div className="flex flex-row items-center justify-center gap-3">
              <p>Attending ceremony?</p>
              <div
                className="checkbox"
                onClick={(e) =>
                  updateGuestIsAttendingDay(selectedGuest, !guest.attendingDay)
                }
              >
                <Check
                  className={`${guest.attendingDay ? "opacity-100" : "opacity-0"} duration-300`}
                />
              </div>
            </div>
            <input
              hidden
              type="checkbox"
              name={`${guest.firstName}_invitedDay`}
              value={guest.attendingDay ? "true" : "false"}
            />
          </>
        )}
      </>
    );
  };

  return family && guests.length > 0 ? (
    <>
      <div className="panel-green flex flex-col gap-3 text-center">
        <div className="text-2xl font-bold">Hello there</div>
        <div className="font-semibold">
          We cannot wait for you to join us on Saturday 31st October 2026.
        </div>
        <div className="font-semibold">
          We just need you to answer a few Qs!
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-end gap-1 self-start px-4 select-none">
          {family.guests.map((guest, index) => (
            <div
              key={index}
              className={`rounded-t-xl ${selectedGuest === index ? "bg-green-700 px-4 pt-3" : "bg-green-900"} cursor-pointer px-3 py-2 shadow-black duration-300`}
              onClick={() => setSelectedGuest(index)}
            >
              {guest.firstName}
            </div>
          ))}
          <div
            className={`rounded-t-xl bg-transparent px-3 px-4 py-2 pt-3 text-transparent shadow-black duration-300 select-none`}
          >
            boop
          </div>
        </div>
        <div className="panel-green w-full">{guestPanelContent()}</div>
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
