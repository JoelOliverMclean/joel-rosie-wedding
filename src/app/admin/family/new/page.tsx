import FamilyForm from "@/components/forms/FamilyForm";
import React from "react";

function NewFamilyPage() {
  return (
    <>
      <h2 className="font-bold text-shadow-lg">Add new family</h2>
      <div className="panel w-[500px]">
        <FamilyForm />
      </div>
    </>
  );
}

export default NewFamilyPage;
