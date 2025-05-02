"use client";
import RSVPPopover from "@/components/popovers/RSVPPopover";
import Link from "next/link";
import React, { useState } from "react";

interface UnlockFormData {
  password: string;
}

function HomePage() {
  const [showRSVP, setShowRSVP] = useState(false);

  const [unlocked, setUnlocked] = useState(false);

  const submitUnlock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: UnlockFormData = {
      password: formData.get("password") as string,
    };

    if (data.password === "mellon") {
      setUnlocked(true);
    } else {
      alert("Incorrect password");
      setUnlocked(false);
    }
    form.reset();
  };

  const toggleRSVPPopover = () => {
    setShowRSVP((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start gap-10 p-4 md:p-10">
      <div className="select-none">
        <p className="text-xl">The wedding of</p>
        <h1>Joel &</h1>
        <h1>Rosie</h1>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-black/50 p-4 text-xl">
        {unlocked ? (
          <>
            <div
              onClick={toggleRSVPPopover}
              className="cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 select-none hover:border-green-700 hover:ps-2 hover:pe-0"
            >
              RSVP
            </div>
            <Link
              href={"/about"}
              className="cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 select-none hover:border-green-700 hover:ps-2 hover:pe-0"
            >
              About Us
            </Link>
            <Link
              href={"/info"}
              className="cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 select-none hover:border-green-700 hover:ps-2 hover:pe-0"
            >
              Important Info
            </Link>
            <Link
              href={"/gallery"}
              className="cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 select-none hover:border-green-700 hover:ps-2 hover:pe-0"
            >
              Gallery
            </Link>
            <Link
              href={"/guestbook"}
              className="cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 select-none hover:border-green-700 hover:ps-2 hover:pe-0"
            >
              Guestbook
            </Link>
          </>
        ) : (
          <>
            <form onSubmit={submitUnlock}>
              <div className="flex flex-col gap-4">
                <label htmlFor="password" className="text-center select-none">
                  Enter guest password
                </label>
                <input
                  className="rounded-lg bg-green-950/75 px-2 py-1 focus:outline-none"
                  type="password"
                  name="password"
                />
                <input
                  className="cursor-pointer rounded-full bg-green-700 p-2 shadow-md shadow-black/50 select-none hover:bg-green-600"
                  type="submit"
                  value={"Enter"}
                />
              </div>
            </form>
          </>
        )}
      </div>
      {showRSVP && <RSVPPopover onDismiss={toggleRSVPPopover} />}
    </div>
  );
}

export default HomePage;
