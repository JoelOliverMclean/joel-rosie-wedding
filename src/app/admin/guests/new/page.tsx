import GuestForm from "@/components/forms/GuestForm";
import React from "react";

function NewGuestPage() {
  return (
    <div className="flex flex-col gap-5 p-10 text-xl">
      <h2>Add new guest</h2>
      <div className="w-[500px] rounded-md bg-black/50 p-5">
        <GuestForm />
      </div>
    </div>
  );
}

export default NewGuestPage;
