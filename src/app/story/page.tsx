import React from "react";
import { canAccessSite } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

export default async function StoryPage() {
  const canAccess = await canAccessSite();
  if (!canAccess) {
    redirect("/rsvp");
  }
  return (
    <div className={"section"}>
      <h1>Our Story</h1>
    </div>
  );
}
