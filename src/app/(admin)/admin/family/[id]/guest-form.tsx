"use client"

import { Guest } from "@/lib/prisma-types";
import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditGuestForm(props: {
  guest: Guest;
  onUpdateGuest: (guest: Guest) => Promise<void>;
}) {
  const router = useRouter();

  const [invitedDay, setInvitedDay] = useState(props.guest.invitedDay);
  const [invitedEvening, setInvitedEvening] = useState(props.guest.invitedEvening);
  const [isChild, setIsChild] = useState(props.guest.child);

  const updateGuest = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);
    const values = Object.fromEntries(data.entries());
    const guest: Guest = {
      ...props.guest,
      firstName: values.firstName as string,
      child: values.isChild === "true",
      invitedDay: values.invitedDay === "true",
      invitedEvening: values.invitedEvening === "true",
    };
    props.onUpdateGuest(guest).then(() => {
      console.log("Updated!")
      router.refresh()
    });
  }

  useEffect(() => {
    setInvitedDay(props.guest.invitedDay)
    setInvitedEvening(props.guest.invitedEvening)
    setIsChild(props.guest.child)
  }, [props.guest]);

  return (
    <div>
      <form onSubmit={(e) => updateGuest(e)}>
        <div className={"card flex flex-col items-start gap-2 shadow-none!"}>
          <div>
            <div className={"flex items-center gap-2"}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                defaultValue={props.guest.firstName}
                name="firstName"
              />
            </div>
            <div className={"flex items-center gap-2"}>
              <label htmlFor="invitedDay">Is Child</label>
              <div className={"checkbox"} onClick={() => setIsChild(!isChild)}>
                <Check
                  className={`${isChild ? "opacity-100" : "opacity-0"} duration-300`}
                />
              </div>
              <input
                hidden
                readOnly
                type="text"
                name="isChild"
                value={isChild ? "true" : "false"}
              />
            </div>
          </div>
          <div className={"flex flex-wrap gap-2"}>
            <div className={"flex items-center gap-2"}>
              <label htmlFor="invitedDay">Invited Day</label>
              <div
                className={"checkbox"}
                onClick={() => setInvitedDay(!invitedDay)}
              >
                <Check
                  className={`${invitedDay ? "opacity-100" : "opacity-0"} duration-300`}
                />
              </div>
              <input
                hidden
                readOnly
                type="text"
                name="invitedDay"
                value={invitedDay ? "true" : "false"}
              />
            </div>
            <div className={"flex items-center gap-2"}>
              <label htmlFor="invitedEvening">Invited Evening</label>
              <div
                className={"checkbox"}
                onClick={() => setInvitedEvening(!invitedEvening)}
              >
                <Check
                  className={`${invitedEvening ? "opacity-100" : "opacity-0"} duration-300`}
                />
              </div>
              <input
                hidden
                readOnly
                type="text"
                name="invitedEvening"
                value={invitedEvening ? "true" : "false"}
              />
            </div>
          </div>
          <input
            className={"btn btn--primary"}
            type="submit"
            defaultValue={"Update Guest"}
          />
        </div>
      </form>
    </div>
  );
}
