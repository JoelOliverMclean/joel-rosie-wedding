import React from "react";

export default function DressCodeInfo() {
  return (
    <div className={"flex flex-col gap-5"}>
      <div>
        The Ceremony dress code is Formal. The wedding party
        will be autumnal in theme, we ask that guests please avoid wearing the
        following colours:
      </div>
      <div>
        <div className={"h2"}>Colours to avoid</div>
        <div className={"flex gap-3 p-3"}>
          <div className={"pill bg-red-800! text-white!"}>Red</div>
          {/*<div className={"pill bg-green-700! text-white!"}>Green</div>*/}
          <div className={"pill bg-gray-50! text-black!"}>White</div>
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        <div className={"h2"}>The After Party</div>
        <div>
          For the after party, guests (particularly little ones) are welcome to
          wear fancy dress &quot;a la Halloween&quot;, but only for the evening.
        </div>
        {/*<div className={"font-bold"}>*/}
        {/*  There will be a Bride & Groom judged best-dressed competition!*/}
        {/*</div>*/}
      </div>
    </div>
  );
}