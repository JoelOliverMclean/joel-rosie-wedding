import React from "react";
import { Ghost, Leaf } from "lucide-react";

export default function DressCodeInfo() {
  return (
    <div className={"flex flex-col gap-5"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"h2 flex gap-2"}>Ceremony <Leaf /></div>
        <div>
        The dress code is formal. The wedding party
        will be autumnal in theme, we ask that guests please avoid wearing red or white attire (white shirts with formal suits are perfectly fine), thanks!
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
        <div className={"h2 flex gap-2"}>The Evening Reception <Ghost/></div>
        <div>
          For the evening reception, the dress code is formal, with a special exception...
          <br/>
          <br/>
          ...All guests are welcome (but by no means forced) to
          wear fancy dress &quot;a la Halloween&quot;. This only applies to the evening reception.
        </div>
      </div>
    </div>
  );
}