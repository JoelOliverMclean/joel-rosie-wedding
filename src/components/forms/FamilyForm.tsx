"use client";
import { apiPost } from "@/utils/apiUtils";
import { BaseFormData, BaseForm } from "./BaseForm";
import random from "random-string-generator";
import { RefreshCcw } from 'lucide-react'
import { useState } from "react";

function FamilyForm() {

  const [rsvpCode, setRsvpCode] = useState(random(10))

  const submitNewFamilyForm = (
    data: BaseFormData,
    form: HTMLFormElement | null,
  ) => {
    apiPost("/api/family/new", data).then(({ response, data }) => {
      if (response.status === 200) {
        // clear error
        form?.reset();
      } else {
        // set error
      }
    });
  };

  const regenerateRsvpCode = () => {
    setRsvpCode(random(10))
  }

  return (
    <BaseForm onSubmitData={submitNewFamilyForm} error={null}>
      <input type="text" name="familyName" placeholder="Family name" />
      <div className="flex flex-row gap-2">
        <input readOnly className="flex-grow" type="text" name="rsvpCode" placeholder="RSVP Code" value={rsvpCode} />
        <div className="primary-button" onClick={regenerateRsvpCode}>
            <RefreshCcw />
        </div>
      </div>
      <input type="text" name="rsvpQuestion" placeholder="Secret Question" />
      <input type="text" name="rsvpAnswer" placeholder="Secret Answer" />
    </BaseForm>
  );
}

export default FamilyForm;
