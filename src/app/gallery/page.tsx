import React from "react";
import { canAccessSite } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

async function GalleryPage() {
  const canAccess = await canAccessSite();
  if (!canAccess) {
    redirect("/rsvp?redirect=gallery");
  }

  return (
    <div className={"section flex flex-col items-center gap-5 lg:items-start"}>
      <h1>Gallery</h1>
      <p>Photos coming soon</p>
      <div
        className={
          "h-1 w-full bg-gradient-to-r from-[var(--fg)] to-transparent"
        }
      ></div>
      <p>
        After the wedding, please feel free to upload any pictures you took on
        the day!
      </p>
      <button disabled={true} className={"btn btn--primary"}>
        Upload
      </button>
    </div>
  );
}

export default GalleryPage;
