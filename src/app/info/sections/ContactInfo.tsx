import React from "react";
import Image from "next/image";

import needanything from "@/images/needanything.gif";
import dealwithproblems from "@/images/dealwithproblems.gif";

export default function ContactInfo() {
  return (
    <div className={"flex flex-col gap-5"}>
      <div
        className={"card flex flex-col gap-0 self-center overflow-clip p-0!"}
      >
          <Image src={needanything} alt={""} />
          <Image src={dealwithproblems} alt={""} />
      </div>
      <div className={"small muted self-center"}>or talk to the best men or women</div>
    </div>
  );
}