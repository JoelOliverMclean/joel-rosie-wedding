"use client";
import { apiPost } from "@/utils/apiUtils";
import { BaseFormData, BaseForm } from "./baseForm";

function NewGuestForm() {
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

  return (
    <BaseForm onSubmitData={submitNewGuestForm} error={null}>
      <input type="text" name="name" placeholder="Guest name" />
      <input type="text" name="plusOne" placeholder="Plus one name" />
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="question" placeholder="Question" />
      <input type="text" name="answer" placeholder="Answer" />
    </BaseForm>
  );
}

export default NewGuestForm;
