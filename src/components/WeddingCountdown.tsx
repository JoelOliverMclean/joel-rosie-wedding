"use client";

import { useEffect, useState } from "react";

type TimeParts = {
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type WeddingCountdownProps = {
  targetIso: string;
  completeText?: string;
};

function getTimeParts(targetMs: number): TimeParts {
  const now = Date.now();
  const diff = targetMs - now;

  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { done: false, days, hours, minutes, seconds };
}

export default function WeddingCountdown({
  targetIso,
  completeText = "We're married!",
}: WeddingCountdownProps) {
  const targetMs = new Date(targetIso).getTime();

  const [time, setTime] = useState<TimeParts>(() => getTimeParts(targetMs));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeParts(targetMs));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetMs]);

  if (time.done) {
    return <div>{completeText}</div>;
  }

  const bigNumStyle = "text-4xl"
  const bigTextStyle = "text-2xl"
  const smallerNumStyle =
    time.days < 1 && time.hours < 1 ? bigNumStyle : "text-2xl";
  const smallerTextStyle =
    time.days < 1 && time.hours < 1 ? bigTextStyle : "text-lg";

  return (
    <div className={"flex flex-col gap-2"}>
      <div
        className={
          "flex flex-col flex-wrap items-center justify-center gap-0 font-bold"
        }
      >
        <div className={["flex gap-2", bigTextStyle].join(" ")}>
          {time.days > 0 && (
            <div>
              <span className={bigNumStyle}>{time.days}</span> days
            </div>
          )}
          {time.hours > 0 && (
            <div>
              <span className={bigNumStyle}>{time.hours}</span> hours
            </div>
          )}
        </div>
        { time.days < 1 && (
          <div className={["flex gap-2", smallerTextStyle].join(" ")}>
            {time.minutes > 0 && (
              <div>
                <span className={smallerNumStyle}>{time.minutes}</span> minutes
              </div>
            )}
            {/*{time.seconds > 0 && (*/}
            {/*  <div>*/}
            {/*    <span className={smallerNumStyle}>{time.seconds}</span> seconds*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        )}
      </div>
    </div>
  );
}
