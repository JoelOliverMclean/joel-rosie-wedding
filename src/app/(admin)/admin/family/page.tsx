import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { regenerateRSVPCodes } from "@/app/(admin)/admin/family/actions";

export const dynamic = "force-dynamic";

export default async function FamilyAdminPage() {
  const families = await prisma.family.findMany({
    include: {
      guests: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  const regenerateCodes = async () => {
    "use server";
    await regenerateRSVPCodes();
  };

  return (
    <div className={"section flex flex-col gap-5"}>
      <div className={"flex items-center justify-between"}>
        <h1 className={"h1"}>Families</h1>
        <button onClick={regenerateCodes} className={"btn btn--ghost"}>
          Regenerate Codes
        </button>
      </div>
      {!families ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={"flex flex-col"}>
            <div
              className={
                "grid grid-cols-3 gap-5 border-b-2 border-white p-2 text-xl font-bold"
              }
            >
              <p>Family</p>
              <p>Members</p>
              <p>RSVP Code</p>
            </div>
            {families.map((family, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 gap-5 p-2 ${i < families.length - 1 ? "border-b-1 border-white/50" : ""}`}
              >
                <h3 className={"text-xl font-bold"}>{family.familyName}</h3>
                <div className={"flex flex-wrap gap-2"}>
                  <p>{family.guests.map((g) => g.firstName).join(", ")}</p>
                </div>
                <p>{family.rsvpCode}</p>
              </div>
            ))}
          </div>

          <Link
            href={"/admin/family/new"}
            key={-1}
            className={"btn btn--primary col-span-full"}
          >
            Add new
          </Link>
        </>
      )}
    </div>
  );
}
