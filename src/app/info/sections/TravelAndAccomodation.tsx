import React from "react";
import Image from "next/image";
import { PhoneCall, Globe } from "lucide-react";

import googleMapsIcon from "../../../images/google-maps-icon.png";
import appleMapsIcon from "../../../images/apple_maps_icon.png";

const carPark = (
  <div className={"flex flex-col gap-5"}>
    <div className={"h2"}>Car Parking</div>
    <div>You can find directions to the car park here:</div>
    <div className={"flex flex-wrap items-center gap-5"}>
      <a
        className={"link-text"}
        href="https://maps.app.goo.gl/QKJjUvdR4LGSwtK49"
      >
        <div className={"flex items-center gap-2"}>
          <Image
            src={googleMapsIcon}
            alt={"google maps icon"}
            width={24}
            height={24}
          />
          Google Maps
        </div>
      </a>
      <a
        className={"link-text"}
        href="https://maps.apple.com/place?place-id=I535E826A17761005&address=Rufford+Lane%2C+Rufford%2C+Newark%2C+NG22+9DG%2C+England&coordinate=53.1832538%2C-1.035005&name=Car+Park&_provider=9902"
      >
        <div className={"flex items-center gap-2"}>
          <Image
            src={appleMapsIcon}
            alt={"apple maps icon"}
            width={24}
            height={24}
          />
          Apple Maps
        </div>
      </a>
    </div>
    <div>
      <span className={"font-bold"}>Rufford Mill Car Park Terms:</span> All cars
      left overnight are left at the persons own risk and discretion but must be
      collected and offsite by 8.30am the following day.
    </div>
  </div>
);

type Taxi = {
  name: string;
  phone: string;
  website?: string;
}

const taxiData: Taxi[] = [
  {
    name: "Abbey Taxis",
    phone: "01623825546",
  },
  {
    name: "AAA Cabs",
    phone: "01623835656",
    website: "https://www.aaacabs.co.uk/",
  },
  {
    name: "ACE-ABC",
    phone: "01623654321",
    website: "https://www.ace-abc.co.uk/",
  },
  {
    name: "Veezu",
    phone: "01179252626",
    website: "https://www.veezu.co.uk/",
  },
];

const taxis = (
  <div className={"flex flex-col gap-5"}>
    <div className={"h2"}>Taxis</div>
    <div>
      It is recommended to pre-book a taxi if you need one. Here are some
      venue-recommended services:
    </div>
    <div className={"flex flex-wrap gap-5"}>
      {taxiData.map((taxi) => (
        <div
          key={taxi.name}
          className={"pill flex justify-center gap-2 w-full md:w-max"}
        >
          {taxi.name}
          <a className={"link-text flex gap-2"} href={`tel:${taxi.phone}`}>
            <div className={"flex items-center gap-2"}>
              <PhoneCall /> Phone
            </div>
          </a>
          {taxi.website && (
            <a className={"link-text flex gap-2"} href={taxi.website}>
              <div className={"flex items-center gap-2"}>
                <Globe /> Web
              </div>
            </a>
          )}
        </div>
      ))}
    </div>
    <div className={"quote__text"}>
      Taxis can be &quot;prebooked&quot; on apps like Uber or Bolt, however this
      does not reserve them for the time, it simply automatically requests one
      for you at the time you need it, meaning it is not totally guaranteed
      (reliant on a driver accepting your ride at the time)
    </div>
  </div>
);

type Hotel = {
  href: string;
  name: string;
}

const hotelData: Hotel[] = [
  {
    href: "https://maps.app.goo.gl/JXCcSUSHbxxHnZaF7",
    name: "The Maypole at Wellow",
  },
  {
    href: "https://maps.app.goo.gl/6rZ7ifiUrbjzJgUXA",
    name: "The Dukeries Lodge Hotel",
  },
  {
    href: "https://maps.app.goo.gl/XzePgDVwAPSymgxP8",
    name: "The Forest Lodge Hotel",
  },
  {
    href: "https://maps.app.goo.gl/hUK1V3Jsi6KrXkfu6",
    name: "Muthu Clumber Park Hotel & Spa",
  },
  {
    href: "https://maps.app.goo.gl/NLJihJgTMTJuF9V466",
    name: "Travelodge (Retford Markham Moor)",
  },
  {
    href: "https://maps.app.goo.gl/a4sqbJ6ZMEzw7mao7",
    name: "Travelodge (Mansfield Town Centre)",
  },
];

const hotels = (
  <div className={"flex flex-col gap-5"}>
    <div className={"h2"}>Hotels</div>
    <div>Here is a list of nearby hotels:</div>
    <div className={"flex flex-col gap-2 px-3"}>
      {hotelData.map((hotel) => (
        <a
          className={"link-text"}
          href={hotel.href}
          key={hotel.name}
          target={"_blank"}
        >
          {hotel.name}
        </a>
      ))}
    </div>
    <div className={"quote__text"}>
      You can also take advantage of services like AirBnB, Booking.com or even
      spare room.
    </div>
  </div>
);

export default function TravelAndAccommodationInfo() {
  return (
    <div className={"flex flex-col gap-5"}>
      {carPark}
      {taxis}
      {hotels}
    </div>
  );
}