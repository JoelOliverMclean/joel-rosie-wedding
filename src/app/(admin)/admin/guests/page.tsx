import { deleteGuests, getGuestList } from "@/app/(admin)/admin/guests/actions";
import GuestTable from "@/app/(admin)/admin/guests/guest-table";
import { GuestsWithFamily } from "@/lib/prisma-types";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function FamilyAdminPage() {
  const guests = await getGuestList()

  const deleteAndUpdateGuests = async (guestsToDelete: GuestsWithFamily[]) => {
    "use server"
    await deleteGuests(guestsToDelete);
    revalidatePath("/admin/guests");
  }

  return (
    <div className={"section flex flex-col gap-5"}>
      <h1>Guests</h1>
      <GuestTable guests={guests} deleteGuests={deleteAndUpdateGuests} />
    </div>
  );
}