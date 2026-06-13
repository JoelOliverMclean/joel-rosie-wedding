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
            {families.map((family, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 gap-5 p-2 ${i < families.length - 1 ? "border-b-1 border-white" : ""}`}
              >
                <h2 className={"h2"}>
                  {family.id} - {family.familyName}
                </h2>
                <div className={"col-span-2 flex flex-wrap gap-2"}>
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
