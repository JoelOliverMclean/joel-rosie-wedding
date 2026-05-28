import React from "react";
import Image from "next/image";
import ronparty from "@/images/ron-party.gif";

export default function WhereAndWhen() {
  return (
    <div className={"flex flex-col gap-5"}>
      <div>
        Our ceremony and evening reception are both at{" "}
        <a
          className={"link-text"}
          target={"_blank"}
          href="https://maps.app.goo.gl/KwUC8Tqdo2nVDHhR8"
        >
          Rufford Mill Wedding Venue
        </a>{" "}
        on <span className={"font-bold"}>31st October 2026</span>
      </div>
      <div>
        Day guests, please arrive by <span className={"font-bold"}>1pm</span> to
        give time for everyone to be seated before the ceremony starts. On-site
        bar is open from <span className={"font-bold"}>12:30pm</span>
      </div>
      <div>
        The ceremony will take place at{" "}
        <span className={"font-bold"}>1.30pm</span>
      </div>
      <div>
        The evening reception will begin at <span className={"font-bold"}>7pm</span>{" "}
        in the evening on the same day.
      </div>
      <div className={"card p-0! self-center overflow-clip"}>
        <Image src={ronparty} alt={""} />
      </div>
    </div>
  );
}