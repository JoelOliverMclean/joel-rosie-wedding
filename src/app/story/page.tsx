import React from "react";
import { canAccessSite } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";
import StoryGallery from "@/app/story/story-gallery";

export default async function StoryPage() {
  const canAccess = await canAccessSite();
  if (!canAccess) {
    redirect("/rsvp");
  }

  return <StoryGallery />;
}
