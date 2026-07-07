"use client";

import { Check, Plus, X } from "lucide-react";
import { useState } from "react";

export interface NewGuest {
  firstName: string;
  lastName: string;
  isChild: boolean;
  invitedDay: boolean;
  invitedEvening: boolean;
}

export default function AddNewGuest(props: {
  saveNewGuest: (data: NewGuest) => void;
}) {
  const [guest, setGuest] = useState<NewGuest | null>(null);

  const startAddNewGuest = () => {
    setGuest({
      firstName: "",
      lastName: "",
      isChild: false,
      invitedDay: false,
      invitedEvening: false,
    });
  };

  const cancelAddingGuest = () => {
    setGuest(null);
  };

  const saveNewGuest = () => {
    if (!guest) return;
    props.saveNewGuest(guest);
    setGuest(null);
  };

  const updateGuestFirstName = (firstName: string) => {
    if (!guest) return;
    setGuest({ ...guest, firstName: firstName });
  };

  const updateGuestLastName = (lastName: string) => {
    if (!guest) return;
    setGuest({ ...guest, lastName: lastName });
  };

  const updateGuestIsChild = (isChild: boolean) => {
    if (!guest) return;
    setGuest({ ...guest, isChild: isChild });
  };

  const updateGuestIsInvitedDay = (invitedDay: boolean) => {
    if (!guest) return;
    setGuest({ ...guest, invitedDay: invitedDay });
  };

  const updateGuestIsInvitedEvening = (invitedEvening: boolean) => {
    if (!guest) return;
    setGuest({ ...guest, invitedEvening: invitedEvening });
  };

  return guest ? (
    <div className={"card flex flex-col items-start gap-4 shadow-none!"}>
      <h3>New guest</h3>
      <input
        className="flex-grow"
        type="text"
        name={`guest_firstName`}
        value={guest.firstName}
        placeholder="First name"
        onChange={(e) => updateGuestFirstName(e.target.value)}
      />
      <div className={"flex flex-row items-center justify-center gap-4"}>
        <p>Is child?</p>
        <div
          className="checkbox"
          onClick={() => updateGuestIsChild(!guest.isChild)}
        >
          <Check
            size={18}
            className={`${guest.isChild ? "opacity-100" : "opacity-0"} duration-300`}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-3">
        <p>Invited day?</p>
        <div
          className="checkbox"
          onClick={() => updateGuestIsInvitedDay(!guest.invitedDay)}
        >
          <Check
            size={18}
            className={`${guest.invitedDay ? "opacity-100" : "opacity-0"} duration-300`}
          />
        </div>
        <p>Invited evening?</p>
        <div
          className="checkbox"
          onClick={() => updateGuestIsInvitedEvening(!guest.invitedEvening)}
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
        name={`guest_isChild`}
        value={guest.isChild ? "true" : "false"}
        readOnly={true}
      />
      <input
        hidden
        type="text"
        name={`guest_invitedDay`}
        value={guest.invitedDay ? "true" : "false"}
        readOnly={true}
      />
      <input
        hidden
        type="text"
        name={`guest_invitedEvening`}
        value={guest.invitedEvening ? "true" : "false"}
        readOnly={true}
      />
      <div className={"flex gap-2"}>
        <button
          onClick={cancelAddingGuest}
          className="btn btn--ghost flex flex-row gap-2 self-center"
        >
          Cancel <X />
        </button>
        <button
          onClick={saveNewGuest}
          className="btn btn--primary flex flex-row gap-2 self-center"
        >
          Save guest <Check />
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={startAddNewGuest}
      className="btn btn--ghost flex flex-row gap-2 self-center"
    >
      Add guest <Plus />
    </button>
  );
}
