"use client";

import React, { useEffect, useState } from "react";
import InviteLookup from "@/app/rsvp/InviteLookupComponent";
import { InviteSummary } from "@/app/rsvp/types";
import RsvpForm from "@/app/rsvp/RsvpForm";
import { apiPost } from "@/utils/apiUtils";
import { Guest } from "@/lib/prisma-types";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmPopover from "@/components/popovers/ConfirmPopover";

export default function RsvpClient(props: {
  rsvpCode?: string;
  initialInvite: InviteSummary | null;
  setInviteAction: (invite: InviteSummary) => Promise<void>;
  clearInviteAction: () => Promise<void>;
  submitRSVP: (familyId: number) => Promise<boolean>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

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
      if (selected.family.rsvpSubmitted) {
        redirect("/rsvp/submitted")
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

  const onConfirmRSVP = async () => {
    const submitted = await props.submitRSVP(invite?.family?.id ?? -1);
    if (submitted) {
      setShowSubmitConfirm(false);
    }
  }

  React.useEffect(() => {
    if (invite?.family?.guests?.length === 1) {
      setGuest(invite?.family.guests[0]);
    }
  }, [invite?.family.guests]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
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
        <div className="h-8 w-8 self-center animate-spin rounded-full border-4 border-[var(--primary-hover)] border-t-transparent" />
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
            <div className={"text-3xl"}>{invite.family.familyName}</div>
            <button className={"btn btn--ghost"} onClick={handleNotYou}>
              Not you?
            </button>
          </div>
        )}

        {!invite ? (
          <InviteLookup
            rsvpCode={rsvpCode}
            onInviteSelected={handleInviteSelected}
          />
        ) : guest == null ? (
          <div className={"card flex flex-col flex-wrap items-start gap-5"}>
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
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className={"btn btn--primary w-full"}
            >
              Submit RSVP
            </button>
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
      {showSubmitConfirm && (
        <ConfirmPopover
          onConfirmAction={onConfirmRSVP}
          onDismissAction={() => setShowSubmitConfirm(false)}
        />
      )}
    </>
  );
}
