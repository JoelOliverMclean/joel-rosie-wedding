"use client";
import React, { useState } from "react";
import Popover from "./_Popover";

function RSVPPopover({ onDismiss }: Readonly<{ onDismiss: () => void }>) {
  const [attending, setAttending] = useState(false);
  const submitRSVP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("RSVP submitted");
  };

  const toggleAttending = () => {
    setAttending((prev) => !prev);
  };

  return (
    <Popover onDismiss={onDismiss}>
      <div className="flex flex-col items-center gap-4">
        <h2>RSVP</h2>
        <form onSubmit={submitRSVP}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              className="rounded-lg bg-green-950 px-2 py-1 focus:outline-none"
              placeholder="Name (both if couple)"
            />
            <input
              type="email"
              className="rounded-lg bg-green-950 px-2 py-1 focus:outline-none"
              placeholder="E-mail"
            />
            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <label>Attending?</label>
                <div
                  className="toggle relative w-[90px] cursor-pointer flex-col rounded-full bg-black/50 p-[2px]"
                  onClick={toggleAttending}
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center gap-4 select-none">
                    <p>No</p>
                    <p>Yes</p>
                  </div>
                  <div
                    className={`h-[25px] duration-300 ${attending ? "toggleOn w-[48px] bg-green-700" : "toggleOff w-[40px] bg-red-500"} rounded-full`}
                  ></div>
                </div>
              </div>
            </div>
            <input hidden type="text" name="attending" />
            <input
              className="cursor-pointer rounded-full bg-green-700 px-4 py-2 text-lg shadow-md shadow-black/50 hover:bg-green-600"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Popover>
  );
}

export default RSVPPopover;
