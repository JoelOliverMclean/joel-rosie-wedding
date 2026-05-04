"use client";

import { InviteSummary } from "@/app/rsvp/types";
import { useCallback, useEffect, useState } from "react";
import { apiGet } from "@/utils/apiUtils";
import { Loader2 } from "lucide-react";

export default function InviteLookup(props: {
  rsvpCode?: string;
  onInviteSelected: (invite: InviteSummary) => void;
}) {
  const [code, setCode] = useState(() => props.rsvpCode ?? "");
  const [checking, setChecking] = useState(false);

  const handleSubmit = useCallback(() => {
    setChecking(true);
    const value = code.trim();
    apiGet(`/api/family/by-code?code=${value}`).then(({ response, data }) => {
      setChecking(false);
      if (response.ok) {
        props.onInviteSelected(data)
      } else {
        console.log(response)
      }
    }).catch((error) => {
      console.error(error);
    })
  }, [code, props])

  useEffect(() => {
    if (props.rsvpCode) {
      handleSubmit();
    }
  }, [handleSubmit, props.rsvpCode]);

  return (
    <div className="flex self-stretch items-center justify-center">
      <div className="card flex flex-col gap-5">
        { checking ? (<>
          <Loader2 className={"animate-spin"} />
        </>) : (<>
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
        </>)}
      </div>
    </div>
  );
}
