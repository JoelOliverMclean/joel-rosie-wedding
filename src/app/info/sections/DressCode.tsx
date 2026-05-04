import React from "react";
import { Ghost } from "lucide-react";

export default function DressCodeInfo() {
  return (
    <div className={"flex flex-col gap-5"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"h2 flex gap-2"}>Ceremony</div>
        <div>
        The dress code is formal. The wedding party
        will be autumnal in theme, we ask that guests please avoid wearing red
        </div>
      </div>
      {/*<div>*/}
      {/*  <div className={"h2"}>Avoid</div>*/}
      {/*  <div className={"flex gap-3 p-3"}>*/}
      {/*    <div className={"pill bg-red-800! text-white!"}>Red</div>*/}
      {/*    /!*<div className={"pill bg-green-700! text-white!"}>Green</div>*!/*/}
      {/*    /!*<div className={"pill bg-gray-50! text-black!"}>White</div>*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={"flex flex-col gap-2"}>
        <div className={"h2 flex gap-2"}>The After Party <Ghost/></div>
        <div>
          For the after party, all guests are welcome (but by no means forced) to
          wear fancy dress &quot;a la Halloween&quot;, but only for the evening.
        </div>
      </div>
    </div>
  );
}