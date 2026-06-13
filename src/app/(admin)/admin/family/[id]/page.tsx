import {
  getFamily,
  updateGuest,
  updateRSVPCode,
} from "@/app/(admin)/admin/family/[id]/actions";
import { Guest } from "@/lib/prisma-types";
import EditGuestForm from "./guest-form";
import EditRSVPForm from "@/app/(admin)/admin/family/[id]/edit-rsvp-form";

export default async function FamilyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const family = await getFamily(id);
  const guests: Guest[] =
    family?.guests?.toSorted((a, b) => Number(a.child) - Number(b.child)) ?? [];

  const onUpdateGuest = async (guest: Guest) => {
    "use server";
    await updateGuest(guest);
  };
  const onUpdateRSVPCode = async (rsvpCode: string) => {
    "use server";
    if (family) await updateRSVPCode(family.id, rsvpCode);
  };

  return (
    <div className={"section flex flex-col gap-5"}>
      <p className={"muted"}>Family</p>
      <h1>{family?.familyName}</h1>
      {guests.map((guest, index) => (
        <EditGuestForm
          key={index}
          guest={guest}
          onUpdateGuest={onUpdateGuest}
        />
      ))}
      <EditRSVPForm
        rsvpCode={family?.rsvpCode}
        onUpdateRSVPCode={onUpdateRSVPCode}
      />
    </div>
  );
}
