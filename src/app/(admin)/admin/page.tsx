"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className={"section flex flex-col gap-5"}>
      <Link className={"btn btn--ghost"} href={"/admin/family"}>
        Families & RSVP Codes
      </Link>
      <Link className={"btn btn--ghost"} href={"/admin/guests"}>
        Guests and Food Choices
      </Link>
      <Link className={"btn btn--ghost"} href={"/admin/photos"}>
        Photo Approvals
      </Link>
      <Link className={"btn btn--ghost"} href={"/admin/photos/approved"}>
        Manage Photos
      </Link>
    </div>
  );
}
