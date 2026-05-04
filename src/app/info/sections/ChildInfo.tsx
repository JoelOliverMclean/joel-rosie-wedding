import React from "react";
import Image from "next/image";
import { PhoneCall, Globe } from "lucide-react";

import googleMapsIcon from "../../../images/google-maps-icon.png";
import appleMapsIcon from "../../../images/apple_maps_icon.png";

export default function ChildInfo() {
  return (
    <div className={"flex flex-col gap-5"}>
      We kindly ask that only children who have been specifically invited
      attend. However, if yours are invited but you wish to have a child-free
      night, just make sure you record them as not attending when submitting
      your RSVP
    </div>
  );
}