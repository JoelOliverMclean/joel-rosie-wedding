import React from "react";
import Image from "next/image";

import moneyplease from "@/images/moneyplease.gif"

export default function GiftInfo() {
  return (
    <div className={"flex flex-col items-start gap-5"}>
      <div>
        {
          "We weren't quite sure how to word this without it sounding awkward, so let's just pretend this isn't a strange thing to put on a website."
        }
      </div>
      <div>{"We have everything we need, apart from money - but please don't feel any obligation."}</div>
      <div>
        {
          "However if you would like to give a gift, a contribution towards our future/honeymoon would be hugely appreciated."
        }
      </div>
      <div className={"card self-center overflow-clip p-0!"}>
        <Image src={moneyplease} alt={""} />
      </div>
    </div>
  );
}