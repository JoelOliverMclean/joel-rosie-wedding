import Image from "next/image";

export const rsvpDeadline = new Date("2026-08-15");

import cry from "@/images/david-tennant-cry.gif";

export default function TooLateToRSVP() {
  return (
    <main className="section mx-auto flex max-w-md flex-col items-center gap-5 text-center">
      <div className={"text-4xl"}>RSVP Deadline Passed</div>
      <Image
        className={"card -z-10 overflow-clip rounded-lg! p-0!"}
        src={cry}
        alt={"cry"}
      />
      <p>
        Apologies, but the RSVP deadline was the{" "}
        {rsvpDeadline.toLocaleDateString()}
      </p>
      <p>
        Numbers, food choices and allergens have now been confirmed with the
        venue and the seating plan has been arranged
      </p>
    </main>
  );
}
