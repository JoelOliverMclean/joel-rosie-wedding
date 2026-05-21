import { getFamily, updateGuest } from "@/app/(admin)/admin/family/[id]/actions";
import { Guest } from "@/lib/prisma-types";
import EditGuestForm from "./guest-form";
import { revalidatePath } from "next/cache";

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
    await updateGuest(guest)
    revalidatePath(`admin/family/${id}`)
  };

  return (
    <div className={"section flex flex-col gap-5"}>
      <p className={"muted"}>Family</p>
      <h1>{family?.familyName}</h1>
      {guests.map((guest, index) =>
        <EditGuestForm key={index} guest={guest} onUpdateGuest={onUpdateGuest} />
      )}
    </div>
  );
}
