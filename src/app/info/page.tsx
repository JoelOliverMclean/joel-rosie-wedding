import React from "react";
import LocationInfo from "@/app/info/sections/Location";
import TimeAndDateInfo from "@/app/info/sections/TimeAndDate";
import DressCodeInfo from "@/app/info/sections/DressCode";
import TravelAndAccommodationInfo from "@/app/info/sections/TravelAndAccomodation";
import DietaryRequirementInfo from "@/app/info/sections/DietaryRequirements";


function InfoPage() {

  const header = (name: string) => (
    <div className={"pill-ish"}>
      <span className={"text-2xl font-bold"}>{name}</span>
    </div>
  );

  return (
    <div className={"section flex flex-col gap-5"}>
      <div className={"h1"}>Information</div>

      {header("Location")}
      <LocationInfo />

      {header("Time & Date")}
      <TimeAndDateInfo />

      {header("Dress Code")}
      <DressCodeInfo />

      {header("Travel & Accommodation")}
      <TravelAndAccommodationInfo />

      {header("Dietary Requirements")}
      <DietaryRequirementInfo />
    </div>
  );
}

export default InfoPage;
