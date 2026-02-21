import { prisma } from "@/lib/prisma";
import Link from "next/link";

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

  return (
    <div className={"section flex flex-col gap-5"}>
      <h1 className={"h1"}>Families</h1>
      {!families ? (
        <div>Waiting...</div>
      ) : (
        <div
          className={
            "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          {families.map((family) => (
            <div key={family.id} className={"pill flex flex-col gap-2"}>
              <h2 className={"h2"}>{family.familyName}</h2>
              <div className={"flex flex-wrap justify-center gap-2"}>
                <div>-</div>
                {family.guests.map((guest) => (
                  <div key={guest.id} className={""}>
                    {guest.firstName} -
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Link
            href={"/admin/family/new"}
            key={-1}
            className={"btn btn--primary col-span-full"}
          >
            Add new
          </Link>
        </div>
      )}
    </div>
  );
}