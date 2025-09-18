"use client";
import { apiGet, apiPost } from "@/utils/apiUtils";
import { BaseFormData, BaseForm } from "./BaseForm";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface Family {
  id: string;
  familyName: string;
}

function GuestForm() {

  const [families, setFamilies] = useState<Family[]>([])
  const [family, setFamily] = useState(null)
  const [isChild, setIsChild] = useState(false)

  const submitNewGuestForm = (
    data: BaseFormData,
    form: HTMLFormElement | null,
  ) => {
    apiPost("/api/guests/new", data).then(({ response, data }) => {
      if (response.status === 200) {
        // clear error
        form?.reset();
      } else {
        // set error
      }
    });
  };

  useEffect(() => {
    apiGet("/api/family/all").then(({response, data}) => {
      if (response.status === 200) {
        setFamilies(data.families)
      } else {
        setFamilies([])
      }
    });
  }, [])

  if (families.length === 0) {
    return;
  }

  return (
    <BaseForm onSubmitData={submitNewGuestForm} error={null}>
      <select name="familyId">
        <option value={undefined}>Please select a family</option>
        {families.map((family) => (
          <option key={family.id} value={family.id}>{family.familyName}</option>
        ))}
      </select>
      <input type="text" name="firstName" placeholder="First name" />
      <input type="text" name="lastName" placeholder="Last name" />
      <div className="flex flex-row gap-2 items-center justify-center">
        <p>Guest is child?</p>
        <div className="p-2 bg-green-900 rounded-xl" onClick={(e) => setIsChild(!isChild)}>
          <Check className={`${isChild ? "opacity-100" : "opacity-0"} duration-300`} />
        </div>
      </div>
      <input hidden type="text" name="child" value={isChild ? "true" : "false"} />
    </BaseForm>
  );
}

export default GuestForm;
