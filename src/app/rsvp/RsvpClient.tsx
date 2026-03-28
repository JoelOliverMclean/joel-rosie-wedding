"use client";

import React, { useEffect, useState } from "react";
import InviteLookup from "@/app/rsvp/InviteLookupComponent";
import { InviteSummary } from "@/app/rsvp/types";
import RsvpForm from "@/app/rsvp/RsvpForm";
import { apiPost } from "@/utils/apiUtils";
import { FoodPreference, Guest, RSVPResponse } from "@/lib/prisma-types";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmPopover from "@/components/popovers/ConfirmPopover";
import { parseFoodPreference, parseRSVPResponse } from "@/lib/prisma-enum-helper";
import { saveGuests } from "@/app/rsvp/actions";

export default function RsvpClient(props: {
  rsvpCode?: string;
  initialInvite: InviteSummary | null;
  setInviteAction: (invite: InviteSummary) => Promise<void>;
  clearInviteAction: () => Promise<void>;
  submitRSVP: (familyId: number) => Promise<string>;
  saveGuests: (guests: Guest[]) => Promise<boolean>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [invite, setInvite] = React.useState<InviteSummary | null>(
    () => props.initialInvite,
  );
  const [status, setStatus] = React.useState<
    "idle" | "saving" | "submitting" | "submitted" | "error"
  >("idle");

  // Ensures client doesn't swap the tree during hydration
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  async function handleInviteSelected(selected: InviteSummary) {
    setStatus("saving");
    try {
      await props.setInviteAction(selected);
      if (selected.family.rsvpSubmitted) {
        redirect("/rsvp/submitted");
      }
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

  async function updateGuests() {
    setError(null)
    if (!invite) return;
    setStatus("submitting");
    try {
      const result = await props.saveGuests(invite.family.guests);
      if (!result) {
        setStatus("error");
      } else {
        setStatus("submitted");
        await props.setInviteAction(invite);
      }
    } catch {
      setStatus("error");
    }
  }

  const onConfirmRSVP = async () => {
    if (!invite) return;

    await props.saveGuests(invite.family.guests)
    const errorMsg = await props.submitRSVP(invite.family.id);
    setError(errorMsg);
    setShowSubmitConfirm(false);
  };

  function onFoodPreferenceUpdated(
    guest: Guest,
    foodPreference: FoodPreference,
  ) {
    if (invite) {
      const index = invite.family.guests.indexOf(guest);
      const newGuests = invite.family.guests.with(index, {
        ...guest,
        foodPreference: foodPreference,
      });
      const newFamily = { ...invite.family, guests: newGuests };
      setInvite({ ...invite, family: newFamily });
    }
  }

  function onRSVPResponseUpdated(guest: Guest, rsvpResponse: RSVPResponse) {
    if (invite) {
      const index = invite.family.guests.indexOf(guest);
      const newGuests = invite.family.guests.with(index, {
        ...guest,
        rsvpResponse: rsvpResponse,
      });
      const newFamily = { ...invite.family, guests: newGuests };
      setInvite({ ...invite, family: newFamily });
    }
  }

  function onAllergiesUpdated(guest: Guest, allergies: string) {
    if (invite) {
      const index = invite.family.guests.indexOf(guest);
      const newGuests = invite.family.guests.with(index, {
        ...guest,
        allergies: allergies,
      });
      const newFamily = { ...invite.family, guests: newGuests };
      setInvite({ ...invite, family: newFamily });
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("rsvpCode")) {
      params.delete("rsvpCode");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  // During hydration, render a stable shell (or always render lookup)
  if (!hydrated) {
    return (
      <main className="flex flex-col gap-10">
        <h1>RSVP</h1>
        <div className="h-8 w-8 animate-spin self-center rounded-full border-4 border-[var(--primary-hover)] border-t-transparent" />
      </main>
    );
  }

  const rsvpCode = props.rsvpCode ?? "";

  return (
    <>
      <main className="section flex flex-col items-start gap-5">
        <h1>RSVP</h1>
        {invite && (
          <div className={"flex items-center gap-3"}>
            <div className={"text-4xl"}>{invite.family.familyName}</div>
            <button className={"btn btn--ghost"} onClick={handleNotYou}>
              Not you{invite.family.guests.length > 1 && " guys"}?
            </button>
          </div>
        )}

        {!invite ? (
          <InviteLookup
            rsvpCode={rsvpCode}
            onInviteSelected={handleInviteSelected}
          />
        ) : (
          <div className={"flex w-full flex-col gap-5"}>
            {status === "submitted" && <strong className={"italic text-center"}>RSVP saved - remember to submit before the deadline</strong>}
            {/*<div className={"flex flex-wrap items-center gap-5"}>*/}
            {/*  <h2 className={"font-bold"}>Guests</h2>*/}
            {/*</div>*/}
            <div className={"grid grid-cols-1 gap-5 lg:grid-cols-2"}>
              {invite.family.guests.map((guest: Guest) => (
                <RsvpForm
                  key={guest.id}
                  guest={guest}
                  onFoodPreferenceChange={onFoodPreferenceUpdated}
                  onAllergiesChange={onAllergiesUpdated}
                  onRSVPResponseChange={onRSVPResponseUpdated}
                  guestCount={invite.family.guests.length}
                  onSubmit={() => {}}
                  onNotYou={() => {}}
                  onBackToGuests={() => {}}
                />
              ))}
            </div>
            {error && <div className={"mt-10 text-red-500 font-bold text-center" +
              ""}>{error}</div>}
            <div className={"mt-10 flex flex-col gap-5 md:flex-row"}>
              {/*<button*/}
              {/*  onClick={() => updateGuests()}*/}
              {/*  className={"btn btn--ghost w-full"}*/}
              {/*>*/}
              {/*  Save RSVP*/}
              {/*</button>*/}
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className={"btn btn--primary w-full"}
              >
                Submit RSVP
              </button>
            </div>
          </div>
        )}
      </main>
      {showSubmitConfirm && (
        <ConfirmPopover
          onConfirmAction={onConfirmRSVP}
          onDismissAction={() => setShowSubmitConfirm(false)}
        />
      )}
    </>
  );
}
