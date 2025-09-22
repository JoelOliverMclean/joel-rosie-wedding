"use client";
import { apiPost } from "@/utils/apiUtils";
import { BaseFormData, BaseForm } from "./BaseForm";
import random from "random-string-generator";
import { RefreshCcw, Plus, Check } from "lucide-react";
import { useState } from "react";

interface Guest {
  firstName: string;
  lastName: string;
  isChild: boolean;
  invitedDay: boolean;
  invitedEvening: boolean;
}

function FamilyForm() {
  const [rsvpCode, setRsvpCode] = useState(random(10));
  const [guests, setGuests] = useState<Guest[]>([]);

  const submitNewFamilyForm = (
    data: BaseFormData,
    form: HTMLFormElement | null,
  ) => {
    apiPost("/api/family/new", data).then(({ response, data }) => {
      if (response.status === 200) {
        // clear error
        form?.reset();
        setGuests([]);
      } else {
        // set error
      }
    });
  };

  const addGuestRow = () => {
    let newGuest = {
      firstName: "",
      lastName: "",
      isChild: false,
      invitedDay: false,
      invitedEvening: false,
    };
    setGuests([...guests, newGuest]);
  };

  const updateGuestFirstName = (index: number, firstName: string) => {
    let guest = guests[index];
    guest.firstName = firstName;
    var newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestLastName = (index: number, lastName: string) => {
    let guest = guests[index];
    guest.lastName = lastName;
    var newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestIsChild = (index: number, isChild: boolean) => {
    let guest = guests[index];
    guest.isChild = isChild;
    var newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestIsInvitedDay = (index: number, invitedDay: boolean) => {
    let guest = guests[index];
    guest.invitedDay = invitedDay;
    var newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestIsInvitedEvening = (
    index: number,
    invitedEvening: boolean,
  ) => {
    let guest = guests[index];
    guest.invitedEvening = invitedEvening;
    var newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const regenerateRsvpCode = () => {
    setRsvpCode(random(10));
  };

  return (
    <BaseForm
      onSubmitData={submitNewFamilyForm}
      error={null}
      submitText={"Save Family"}
    >
      <input type="text" name="familyName" placeholder="Family name" />
      <div className="flex flex-row gap-2">
        <input
          readOnly
          className="flex-grow"
          type="text"
          name="rsvpCode"
          placeholder="RSVP Code"
          value={rsvpCode}
        />
        <div className="primary-button" onClick={regenerateRsvpCode}>
          <RefreshCcw />
        </div>
      </div>
      <input type="text" name="rsvpQuestion" placeholder="Secret Question" />
      <input type="text" name="rsvpAnswer" placeholder="Secret Answer" />
      {guests.map((guest, index) => (
        <>
          <label className="font-semibold">Guest {index + 1}</label>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <input
              className="flex-grow"
              type="text"
              name={`guest${index}_firstName`}
              value={guest.firstName}
              placeholder="First name"
              onChange={(e) => updateGuestFirstName(index, e.target.value)}
            />
            <p>Is child?</p>
            <div
              className="rounded-xl bg-green-900 p-2"
              onClick={(e) => updateGuestIsChild(index, !guest.isChild)}
            >
              <Check
                className={`${guest.isChild ? "opacity-100" : "opacity-0"} duration-300`}
              />
            </div>
          </div>
          <input
            type="text"
            name={`guest${index}_lastName`}
            value={guest.lastName}
            placeholder="Last name"
            onChange={(e) => updateGuestLastName(index, e.target.value)}
          />{" "}
          <div className="flex flex-row items-center justify-center gap-3">
            <p>Invited day?</p>
            <div
              className="rounded-xl bg-green-900 p-2"
              onClick={(e) => updateGuestIsInvitedDay(index, !guest.invitedDay)}
            >
              <Check
                className={`${guest.invitedDay ? "opacity-100" : "opacity-0"} duration-300`}
              />
            </div>
            <p>Invited evening?</p>
            <div
              className="rounded-xl bg-green-900 p-2"
              onClick={(e) =>
                updateGuestIsInvitedEvening(index, !guest.invitedEvening)
              }
            >
              <Check
                className={`${guest.invitedEvening ? "opacity-100" : "opacity-0"} duration-300`}
              />
            </div>
          </div>
          <input
            hidden
            type="text"
            name={`guest${index}_isChild`}
            value={guest.isChild ? "true" : "false"}
          />
          <input
            hidden
            type="text"
            name={`guest${index}_invitedDay`}
            value={guest.invitedDay ? "true" : "false"}
          />
          <input
            hidden
            type="text"
            name={`guest${index}_invitedEvening`}
            value={guest.invitedEvening ? "true" : "false"}
          />
        </>
      ))}
      <div
        className="primary-button flex flex-row gap-2 self-center"
        onClick={addGuestRow}
      >
        Add guest <Plus />
      </div>
    </BaseForm>
  );
}

export default FamilyForm;
