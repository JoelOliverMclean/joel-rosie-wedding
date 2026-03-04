import React from "react";

export default function TimeAndDateInfo() {
  return <div className={"flex flex-col gap-5 px-2"}>
    <div>
      The ceremony will take place at{" "}
      <span className={"font-bold"}>1pm</span> on the{" "}
      <span className={"font-bold"}>31st October 2026</span>
    </div>
    <div>
      The after party will begin at <span className={"font-bold"}>7pm</span>{" "}
      in the evening on the same day.
    </div>
  </div>
}