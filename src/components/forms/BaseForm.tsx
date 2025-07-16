import { getFormJson } from "@/utils/formUtils";
import React, {
  FormEvent,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";

export type BaseFormData = {
  [k: string]: FormDataEntryValue;
};

export function BaseForm({
  children,
  onSubmitData,
  error,
}: Readonly<{
  children?: ReactNode;
  onSubmitData: (data: BaseFormData, form: HTMLFormElement | null) => void;
  error: string | null | undefined;
}>) {
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormJson(event);
    onSubmitData(data, formRef.current);
  };

  return (
    <form onSubmit={submitForm} ref={formRef}>
      <div className="flex flex-col gap-4">
        {children}
        {error && <p className="font-bold text-red-600">{error}</p>}
        <input type="submit" />
      </div>
    </form>
  );
}
