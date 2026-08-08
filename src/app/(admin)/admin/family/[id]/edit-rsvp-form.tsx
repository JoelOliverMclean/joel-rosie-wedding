"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function EditRSVPForm(props: {
  rsvpCode?: string;
  onUpdateRSVPCode: (rsvpCode: string) => Promise<void>;
}) {
  const router = useRouter();

  const changeRSVPCode = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);
    const values = Object.fromEntries(data.entries());
    props.onUpdateRSVPCode(values.rsvpCode as string).then(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <form onSubmit={(e) => changeRSVPCode(e)}>
        <div className={"card flex flex-col items-start gap-2 shadow-none!"}>
          <div>
            <div className={"flex items-center gap-2"}>
              <label htmlFor="rsvpCode">RSVP Code</label>
              <input
                type="text"
                defaultValue={props.rsvpCode}
                name="rsvpCode"
              />
            </div>
          </div>
          <input
            className={"btn btn--primary"}
            type="submit"
            defaultValue={"Update"}
          />
        </div>
      </form>
    </div>
  );
}
