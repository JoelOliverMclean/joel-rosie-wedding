import FamilyForm from "@/components/forms/FamilyForm";
import Link from "next/link";

export default function NewFamilyPage() {
  return (
    <div className={"section flex flex-col items-start gap-5"}>
      <Link href={"/admin/family"} className={"btn btn--ghost"}>Back to all</Link>
      <h1 className={"h1"}>New family</h1>
      <FamilyForm />
    </div>
  )
}