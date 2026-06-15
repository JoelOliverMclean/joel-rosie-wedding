"use client";

import React, { useEffect, useState } from "react";
import InviteLookup from "@/app/rsvp/InviteLookupComponent";
import { InviteSummary } from "@/app/rsvp/types";
import RsvpForm from "@/app/rsvp/RsvpForm";
import { FoodPreference, Guest, RSVPResponse } from "@/lib/prisma-types";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ConfirmPopover from "@/components/popovers/ConfirmPopover";

export default function RsvpClient(props: {
  rsvpCode?: string;
  initialInvite: InviteSummary | null;
  setInviteCodeAction: (inviteCode: string) => Promise<void>;
  clearInviteCodeAction: () => Promise<void>;
  submitRSVP: (familyId: number, contact: string) => Promise<string>;
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
  const [contact, setContact] = React.useState<string>(
    props.initialInvite?.family.contact ?? "",
  );

  // Ensures client doesn't swap the tree during hydration
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);

  async function handleInviteSelected(selected: InviteSummary) {
    try {
      await props.setInviteCodeAction(selected.family.rsvpCode);
      if (selected.family.rsvpSubmitted) {
        redirect("/rsvp/submitted");
      }
      setInvite(selected);
    } catch {}
  }

  async function handleNotYou() {
    try {
      await props.clearInviteCodeAction();
      setInvite(null);
    } catch {}
  }

  const onConfirmRSVP = async () => {
    if (!invite) return;

    await props.saveGuests(invite.family.guests);
    const errorMsg = await props.submitRSVP(invite.family.id, contact);
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

  function onHighchairRequiredUpdated(guest: Guest, required: boolean) {
    if (invite) {
      const index = invite.family.guests.indexOf(guest);
      const newGuests = invite.family.guests.with(index, {
        ...guest,
        highchairRequired: required,
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
        {/*<h1 className={"w-full text-center sm:w-auto"}>RSVP</h1>*/}
        {invite && (
          <div
            className={
              "flex w-full items-center justify-between gap-5 sm:justify-start"
            }
          >
            <div className={"text-4xl"}>
              {invite.family.guests.length > 1
                ? invite.family.familyName
                : invite.family.guests[0].firstName}
            </div>
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
            <div>
              Please submit your RSVP below before the{" "}
              <strong>8th August 2026</strong>
            </div>
            {invite.family.guests.some((g) => g.child) && (
              <div className={"muted small"}>
                Please note, invited kids are optional but welcome. If you want
                to come without them that&apos;s fine with us.
              </div>
            )}
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
                  onHighchairRequiredChange={onHighchairRequiredUpdated}
                  guestCount={invite.family.guests.length}
                  onSubmit={() => {}}
                  onNotYou={() => {}}
                  onBackToGuests={() => {}}
                />
              ))}
            </div>
            {!invite.family.guests.every(
              (g) => g.rsvpResponse === RSVPResponse.NOT_ATTENDING,
            ) && (
              <div className={"grid grid-cols-1 gap-5 lg:grid-cols-2"}>
                <div className={"card flex flex-col gap-2 shadow-none!"}>
                  <label className={"h2"} htmlFor="contact">
                    Contact
                  </label>
                  <p className={"small"}>
                    Please enter an email or phone number we can contact you on
                    if we need to
                  </p>
                  <input
                    type="text"
                    defaultValue={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>
            )}
            {error && (
              <div className={"mt-10 text-center font-bold text-red-500" + ""}>
                {error}
              </div>
            )}
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
