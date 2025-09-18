import FamilyForm from "@/components/forms/FamilyForm";
import React from "react";

function NewFamilyPage() {
  return (
    <div className="flex flex-col gap-5 p-10 text-xl">
      <h2>Add new family</h2>
      <div className="w-[500px] rounded-md bg-black/50 p-5">
        <FamilyForm />
      </div>
    </div>
  );
}

export default NewFamilyPage;
