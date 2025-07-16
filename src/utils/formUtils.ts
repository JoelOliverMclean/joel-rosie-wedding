import { FormEvent } from "react";

export const getFormJson = (event: FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  return Object.fromEntries(formData.entries());
};
