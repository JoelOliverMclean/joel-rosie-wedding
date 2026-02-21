"use client";

import { InviteSummary } from "@/app/rsvp/types";
import { useState } from "react";
import { apiGet } from "@/utils/apiUtils";

export default function InviteLookup(props: {
  rsvpCode?: string;
  onInviteSelected: (invite: InviteSummary) => void;
}) {
  const [code, setCode] = useState(() => props.rsvpCode ?? "");

  function handleSubmit() {
    const value = code.trim();
    apiGet(`/api/family/by-code?code=${value}`).then(({ response, data }) => {
      if (response.ok) {
        props.onInviteSelected(data)
      } else {
        console.log(response)
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className="flex self-stretch items-center justify-center">
      <div className="card flex flex-col gap-5">
        <div>Enter the RSVP code on your invite</div>

        <input
          className="text-center"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          inputMode="text"
        />

        <button className="btn btn--primary" onClick={handleSubmit}>
          Find Invite
        </button>
      </div>
    </div>
  );
}
