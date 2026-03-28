import React from "react";
import whatsAppIcon from "@/images/whatsapp.png"
import Image from "next/image";

export default function RSVPSubmittedPage() {
  return (
    <>
      <div className={"section flex flex-col gap-5"}>
        <div className={"h2 text-center"}>
          Thank you for submitting your RSVP
        </div>
        <div
          className={"h-1 bg-gradient-to-r from-[var(--fg)] to-transparent"}
        ></div>
        <div className={"small muted flex items-center gap-1"}>
          <p>
            If you need to change anything or can no longer attend, get in touch
            with Joel on
          </p>
          <a
            className={"link-text flex items-center gap-1 p-1"}
            href="https://wa.me/447869177266"
          >
            <Image
              src={whatsAppIcon}
              alt={"whatsapp icon"}
              width={24}
              height={24}
            />
            WhatsApp
          </a>
          <p>
            or text on{" "}
            <a className={"link-text underline"} href="tel:+447869177266">
              07869177266
            </a>
          </p>
        </div>
      </div>
    </>
  );
}