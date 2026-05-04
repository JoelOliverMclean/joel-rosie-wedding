import React from "react";

function GalleryPage() {
  return (
    <div className={"section flex flex-col items-center lg:items-start gap-5"}>
      <h1>Gallery</h1>
      <p>Photos coming soon</p>
      <div
        className={"w-full h-1 bg-gradient-to-r from-[var(--fg)] to-transparent"}
      ></div>
      <p>
        After the wedding, please feel free to upload any pictures you took on the day!
      </p>
      <button disabled={true} className={"btn btn--primary"}>Upload</button>
    </div>
  );
}

export default GalleryPage;
