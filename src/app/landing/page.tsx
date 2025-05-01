"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const speechBoxes = [
    () => (
      <div className="z-10 pb-[200px] ps-[120px]">
        <div
          className="bg-white border-2 border-black rounded-xl p-2 text-black text-center"
          onClick={() => setStep(2)}
        >
          <p>Wedding this way</p>
        </div>
      </div>
    ),
    () => (
      <div className="z-10 pb-[400px] pe-[100px]">
        <div
          className="bg-white border-2 border-black rounded-xl p-2 text-black text-center"
          onClick={() => setStep(3)}
        >
          <p>That way</p>
        </div>
      </div>
    ),
    () => (
      <div className="z-10 pb-[200px]">
        <div
          className="bg-white border-2 border-black rounded-xl p-2 text-black text-center"
          onClick={() => setStep(1)}
        >
          <p>Welcome</p>
          <p>in!</p>
        </div>
      </div>
    ),
  ];

  const [step, setStep] = useState(3);
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          src={`/step${step}.jpg`}
          fill
          alt={`step${step}`}
          objectFit="cover"
          objectPosition="left"
        />
      </div>
      {speechBoxes[step - 1]()}
    </div>
  );
}
