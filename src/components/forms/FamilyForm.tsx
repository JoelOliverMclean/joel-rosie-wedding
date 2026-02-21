"use client";
import { apiPost } from "@/utils/apiUtils";
import { BaseFormData, BaseForm } from "./BaseForm";
import random from "random-string-generator";
import { RefreshCcw, Plus, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Guest {
  firstName: string;
  lastName: string;
  isChild: boolean;
  invitedDay: boolean;
  invitedEvening: boolean;
}

function FamilyForm() {
  const router = useRouter();

  const [rsvpCode, setRsvpCode] = useState(random(10));
  const [guests, setGuests] = useState<Guest[]>([]);

  const submitNewFamilyForm = (
    data: BaseFormData,
    form: HTMLFormElement | null,
  ) => {
    apiPost("/api/family/new", data).then((result) => {
      if (result.response.status === 200) {
        // clear error
        form?.reset();
        router.push("/admin/family");
      } else {
        // set error
      }
    });
  };

  const addGuestRow = () => {
    const newGuest = {
      firstName: "",
      lastName: "",
      isChild: false,
      invitedDay: false,
      invitedEvening: false,
    };
    setGuests([...guests, newGuest]);
  };

  const updateGuestFirstName = (index: number, firstName: string) => {
    const guest = guests[index];
    guest.firstName = firstName;
    const newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestLastName = (index: number, lastName: string) => {
    const guest = guests[index];
    guest.lastName = lastName;
    const newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestIsChild = (index: number, isChild: boolean) => {
    const guest = guests[index];
    guest.isChild = isChild;
    const newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestIsInvitedDay = (index: number, invitedDay: boolean) => {
    const guest = guests[index];
    guest.invitedDay = invitedDay;
    const newGuests = [...guests];
    newGuests[index] = guest;
    setGuests(newGuests);
  };

  const updateGuestIsInvitedEvening = (
    index: number,
    invitedEvening: boolean,
  ) => {
    const guest = guests[index];
    guest.invitedEvening = invitedEvening;
    const newGuests = [...guests];
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
      <div className="flex flex-row items-center gap-2">
        <input
          readOnly
          className="flex-grow"
          type="text"
          name="rsvpCode"
          placeholder="RSVP Code"
          value={rsvpCode}
        />
        <div className="btn btn--primary" onClick={regenerateRsvpCode}>
          <RefreshCcw />
        </div>
      </div>
      <input type="text" name="rsvpQuestion" placeholder="Secret Question" />
      <input type="text" name="rsvpAnswer" placeholder="Secret Answer" />
      {guests.map((guest, index) => (
        <div key={index} className={"flex flex-col gap-4"}>
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
              className="checkbox"
              onClick={() => updateGuestIsChild(index, !guest.isChild)}
            >
              <Check
                size={18}
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
              className="checkbox"
              onClick={() => updateGuestIsInvitedDay(index, !guest.invitedDay)}
            >
              <Check
                size={18}
                className={`${guest.invitedDay ? "opacity-100" : "opacity-0"} duration-300`}
              />
            </div>
            <p>Invited evening?</p>
            <div
              className="checkbox"
              onClick={() =>
                updateGuestIsInvitedEvening(index, !guest.invitedEvening)
              }
            >
              <Check
                size={18}
                className={`${guest.invitedEvening ? "opacity-100" : "opacity-0"} duration-300`}
              />
            </div>
          </div>
          <input
            hidden
            type="text"
            name={`guest${index}_isChild`}
            value={guest.isChild ? "true" : "false"}
            readOnly={true}
          />
          <input
            hidden
            type="text"
            name={`guest${index}_invitedDay`}
            value={guest.invitedDay ? "true" : "false"}
            readOnly={true}
          />
          <input
            hidden
            type="text"
            name={`guest${index}_invitedEvening`}
            value={guest.invitedEvening ? "true" : "false"}
            readOnly={true}
          />
        </div>
      ))}
      <div
        className="btn btn--ghost flex flex-row gap-2 self-center"
        onClick={addGuestRow}
      >
        Add guest <Plus />
      </div>
    </BaseForm>
  );
}

export default FamilyForm;
