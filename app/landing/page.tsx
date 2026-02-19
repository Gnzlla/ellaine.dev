"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { alata } from "../fonts";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(SplitText, CustomEase);

export default function LandingPage() {
  const ContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!ContainerRef.current) return;

    // Custom bounce curve
    CustomEase.create("myBounce", "M0,0 C0.6,0 0.4,1 1,1");

    // Split text into characters
    const split = new SplitText(ContainerRef.current, {
      type: "chars",
      absolute: true,
    });

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        stagger: { amount: 0.35, ease: "sine.in", from: "random" },
      },
    });

    tl.from(split.chars, { ease: "power2.inOut" }, 0) // fade in
      .from(split.chars, { y: -800, ease: "myBounce" }, 0) // bounce down
      .to(
        split.chars,
        {
          scaleX: 1,
          scaleY: 0.95,

          transformOrigin: "50% 100%",
          ease: "power1.out",
        },
        0,
      ) // squash on landing
      .to(split.chars, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        ease: "power2.out",
        duration: 0.25,
      }); // return to original
  });

  return (
    <div
      className={`flex relative overflow-hidden justify-center w-full h-screen leading-75 items-center ${alata.className} text-[650px] bg-[var(--white-background)] text-[var(--black-font)]`}
      ref={ContainerRef}
    >
      <div className="top-35 left-5 absolute rotate-11">L</div>
      <div className="bottom-40 left-40 absolute -rotate-10">A</div>
      <div className="bottom-70 left-150 absolute text-[var(--yellow-font)] rotate-7">
        i
      </div>
      <div className="right-75 bottom-40 absolute -rotate-10">N</div>
      <div className="top-35 right-10 absolute rotate-5">E</div>
    </div>
  );
}
