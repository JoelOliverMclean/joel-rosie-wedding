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
      <span className={"font-bold"}>Rufford Mill Car Park Terms:</span> Parking
      is free for wedding guests on the day, they must enter their registration
      at the venue otherwise risk being charged by the parking provider. If cars
      are left overnight, a £1 charge is applicable if collected before 9am -
      any later and guests must pay for a full days parking (£7). Cars are left
      at the persons own risk and discretion.
    </div>
  </div>
);

type Taxi = {
  name: string;
  phone: string;
  website?: string;
};

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
    <div className={"grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"}>
      {taxiData.map((taxi) => (
        <div key={taxi.name} className={"card card--hero p-0! shadow-none!"}>
          <div className={"p-2 text-center"}>{taxi.name}</div>
          <div className={"flex"}>
            <a
              className={
                "link-text flex w-full justify-center gap-2 bg-gradient-to-r from-black/10 to-black/20 p-2 text-sm duration-200 hover:from-black/20"
              }
              href={`tel:${taxi.phone}`}
            >
              <div className={"flex items-center gap-2"}>
                <PhoneCall /> Phone
              </div>
            </a>
            {taxi.website && (
              <a
                className={
                  "link-text flex w-full justify-center gap-2 bg-gradient-to-r from-black/10 to-black/20 text-sm duration-200 hover:from-black/20"
                }
                href={taxi.website}
              >
                <div className={"flex items-center gap-2"}>
                  <Globe /> Web
                </div>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
    <div className={"pt-2"}>
      Taxis can be also be prebooked on apps like Uber or Bolt.
    </div>
  </div>
);

type Hotel = {
  href: string;
  name: string;
  image?: any;
};

import maypoleHotelImg from "@/images/hotels/the-maypole-at-wellow.jpg";
import dukeriesHotelImg from "@/images/hotels/dukeries.webp";
import forestLodgeHotelImg from "@/images/hotels/forestlodge.jpg";
import muthuHotelImg from "@/images/hotels/muthu.jpg";
import travelodgeRetford from "@/images/hotels/travelodge_retford.webp";
import travelodgeMansfield from "@/images/hotels/travelodge_mansfield.webp";

const hotelData: Hotel[] = [
  {
    href: "https://maps.app.goo.gl/JXCcSUSHbxxHnZaF7",
    name: "The Maypole at Wellow",
    image: maypoleHotelImg,
  },
  {
    href: "https://maps.app.goo.gl/6rZ7ifiUrbjzJgUXA",
    name: "The Dukeries Lodge Hotel",
    image: dukeriesHotelImg,
  },
  {
    href: "https://maps.app.goo.gl/XzePgDVwAPSymgxP8",
    name: "The Forest Lodge Hotel",
    image: forestLodgeHotelImg,
  },
  {
    href: "https://maps.app.goo.gl/hUK1V3Jsi6KrXkfu6",
    name: "Muthu Clumber Park Hotel & Spa",
    image: muthuHotelImg,
  },
  {
    href: "https://maps.app.goo.gl/UH9rta5KwQYNJDu1A",
    name: "Travelodge (Retford Markham Moor)",
    image: travelodgeRetford,
  },
  {
    href: "https://maps.app.goo.gl/a4sqbJ6ZMEzw7mao7",
    name: "Travelodge (Mansfield Town Centre)",
    image: travelodgeMansfield,
  },
];

const hotels = (
  <div className={"flex flex-col gap-5"}>
    <div className={"h2"}>Hotels</div>
    <div>Here are some nearby hotels:</div>
    <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"}>
      {hotelData.map((hotel) => (
        <a
          className={"link-text"}
          href={hotel.href}
          key={hotel.name}
          target={"_blank"}
        >
          <div key={hotel.name} className={"card card--hero p-0! shadow-none!"}>
            <div className={"relative h-[150px] overflow-hidden"}>
              <Image
                src={hotel.image}
                alt={`Image of ${hotel.name}`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div
              className={
                "flex h-[4em] items-center justify-center p-2 text-center"
              }
            >
              {hotel.name}
            </div>
          </div>
        </a>
      ))}
    </div>
    <div className={"quote__text pt-3"}>
      You can also take advantage of services like AirBnB, Booking.com and
      others...
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
