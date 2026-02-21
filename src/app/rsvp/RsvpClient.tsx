"use client";

import React from "react";
import InviteLookup from "@/app/rsvp/InviteLookupComponent";
import { InviteSummary } from "@/app/rsvp/types";
import RsvpForm from "@/app/rsvp/RsvpForm";
import { apiPost } from "@/utils/apiUtils";
import { Guest } from "@/lib/prisma-types";

export default function RsvpClient(props: {
  rsvpCode?: string;
  initialInvite: InviteSummary | null;
  setInviteAction: (invite: InviteSummary) => Promise<void>;
  clearInviteAction: () => Promise<void>;
}) {
  const [invite, setInvite] = React.useState<InviteSummary | null>(
    () => props.initialInvite,
  );
  const [status, setStatus] = React.useState<
    "idle" | "saving" | "submitting" | "submitted" | "error"
  >("idle");
  const [guest, setGuest] = React.useState<Guest | null>(null);

  // Ensures client doesn't swap the tree during hydration
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  async function handleInviteSelected(selected: InviteSummary) {
    setStatus("saving");
    try {
      await props.setInviteAction(selected);
      setInvite(selected);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  async function handleNotYou() {
    setStatus("saving");
    try {
      await props.clearInviteAction();
      setInvite(null);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  async function handleSubmit(updatedGuest: Guest) {
    if (!invite) return;
    setStatus("submitting");
    try {
      const result = await apiPost(`/api/rsvp`, { rsvpCode: invite.family.rsvpCode, ...updatedGuest })
      if (!result.response.ok) {
        setStatus("error");
      } else {
        setStatus("submitted");
        setInvite({ family: result.data.family });
        await props.setInviteAction({ family: result.data.family });
        setGuest(null);
      }
    } catch {
      setStatus("error");
    }
  }

  React.useEffect(() => {
    if (invite?.family?.guests?.length === 1) {
      setGuest(invite?.family.guests[0]);
    }
  }, [invite?.family.guests]);

  // During hydration, render a stable shell (or always render lookup)
  if (!hydrated) {
    return (
      <main className="flex flex-col gap-10">
        <h1>RSVP</h1>
        <div className="h-8 w-8 self-center animate-spin rounded-full border-4 border-[var(--primary-hover)] border-t-transparent" />
      </main>
    );
  }

  const rsvpCode = props.rsvpCode ?? "";

  return (
    <main className="section flex flex-col gap-5 items-start">
      <h1>RSVP</h1>
      {invite && (
        <div className={"flex gap-3 items-center"}>
          <div className={"text-3xl"}>{invite.family.familyName}</div>
          <button className={"btn btn--ghost"} onClick={handleNotYou}>Not you?</button>
        </div>
      )}

      {!invite ? (
        <InviteLookup
          rsvpCode={rsvpCode}
          onInviteSelected={handleInviteSelected}
        />
      ) : guest == null ? (
        <div className={"flex flex-col flex-wrap items-start gap-3 card"}>
          {status === "submitted" && <strong>Thanks — RSVP saved.</strong>}
          <div className={"flex flex-wrap items-center gap-5"}>
            <h2 className={"font-bold"}>Guests</h2>
          </div>
          <div className={"flex flex-wrap gap-5"}>
            {invite.family.guests.map((guest: Guest) => (
              <button
                onClick={() => setGuest(guest)}
                className={"btn btn--ghost"}
                key={guest.id}
              >
                {guest.firstName} {guest.lastName}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <RsvpForm
          guest={guest}
          guestCount={invite?.family?.guests?.length ?? 0}
          onSubmit={handleSubmit}
          onNotYou={handleNotYou}
          onBackToGuests={() => setGuest(null)}
        />
      )}
    </main>
  );
}
