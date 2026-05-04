import React from "react";
import DressCodeInfo from "@/app/info/sections/DressCode";
import TravelAndAccommodationInfo from "@/app/info/sections/TravelAndAccomodation";
import DietaryRequirementInfo from "@/app/info/sections/DietaryRequirements";
import ContactInfo from "@/app/info/sections/ContactInfo";
import WhereAndWhen from "@/app/info/sections/WhereAndWhen";
import GiftInfo from "@/app/info/sections/GiftInfo";
import { canAccessSite } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

async function InfoPage() {
  const canAccess = await canAccessSite();
  if (!canAccess) {
    redirect("/rsvp");
  }

  const header = (name: string) => (
    <div className={""}>
      <div className={"text-2xl font-bold"}>{name}</div>
      <div className={"h-1 bg-gradient-to-r from-[var(--fg)] to-transparent"}></div>
    </div>
  );

  return (
    <div className={"section flex flex-col gap-5"}>
      <div className={"h1"}>FYI</div>

      {header("Where and When?")}
      <WhereAndWhen />

      {header("What should I wear?")}
      <DressCodeInfo />

      {header("Gifts and Things")}
      <GiftInfo />

      {header("Getting here and staying here")}
      <TravelAndAccommodationInfo />

      {header("Dietary Requirements")}
      <DietaryRequirementInfo />

      {header("Contact Us")}
      <ContactInfo />
    </div>
  );
}

export default InfoPage;
