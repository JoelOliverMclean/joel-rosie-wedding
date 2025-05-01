import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-start gap-10 p-4 md:p-10">
      <div className="">
        <p>The wedding of</p>
        <h1>Joel &</h1>
        <h1>Rosie</h1>
      </div>
      <ul className="flex flex-col gap-2 rounded-xl bg-black/50 p-2 text-xl">
        <li className="to- cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 hover:border-green-700 hover:ps-2">
          RSVP
        </li>
        <li className="to- cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 hover:border-green-700 hover:ps-2">
          About Us
        </li>
        <li className="to- cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 hover:border-green-700 hover:ps-2">
          Important Info
        </li>
        <li className="to- cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 hover:border-green-700 hover:ps-2">
          Gallery
        </li>
        <li className="to- cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 hover:border-green-700 hover:ps-2">
          Guestbook
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
