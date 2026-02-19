"use client";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loading() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgRef2 = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    if (!imgRef.current || !imgRef2.current) return;

    gsap.to(imgRef.current, {
      duration: 20,
      rotate: 360,
      yoyo: true,
      transformOrigin: "center center",
    });

    gsap.to(imgRef2.current, {
      duration: 20,
      rotate: -360,
      yoyo: true,
      transformOrigin: "center center",
    });
  });
  return (
    <div className="flex flex-col justify-center items-center bg-[var(--white-background)] h-screen">
      <div className="relative flex justify-center items-center leading-0">
        <img
          src="./loading-icon.png"
          alt="Loading Logo svg"
          width={150}
          ref={imgRef}
        />
        <img
          src="./yellow-star.png"
          alt="yellow star"
          className="top-16 right-16 absolute"
          ref={imgRef2}
          width={25}
        />
      </div>
    </div>
  );
}
