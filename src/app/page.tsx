"use client";
import RSVPPopover from "@/components/popovers/RSVPPopover";
import Link from "next/link";
import React, { useState } from "react";

interface UnlockFormData {
  password: string;
}

function HomePage() {
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

  return (
    <>
      {unlocked ? (
        <div className="panel self-start">
          <div className="flex flex-col gap-2 text-xl">
            <Link
              href={"/rsvp"}
              className="cursor-pointer border-b-3 border-transparent py-1 pe-2 duration-300 select-none hover:border-green-700 hover:ps-2 hover:pe-0"
            >
              RSVP
            </Link>
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
          </div>
        </div>
      ) : (
        <div className="panel">
          <form onSubmit={submitUnlock}>
            <div className="flex flex-col gap-4">
              <label htmlFor="password" className="text-center select-none">
                Enter guest password
              </label>
              <input type="password" name="password" />
              <input type="submit" value={"Enter"} />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default HomePage;
