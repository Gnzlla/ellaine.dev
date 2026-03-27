"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { alata } from "../fonts";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage({ id }: { id?: string }) {
  const projectRef = useRef<HTMLElement | null>(null);
  const workRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!projectRef.current || !workRef.current || !wrapperRef.current) return;

    const panels = [projectRef.current, workRef.current];

    // Horizontal scroll across both sections
    const horizontalTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        id: "horizontal",
        trigger: wrapperRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + projectRef.current!.offsetWidth, // * 4 gives extra time in workRef
      },
    });

    // Project title animation
    gsap.from(".project-title", {
      y: 100,
      autoAlpha: 0,
      duration: 1,
      scrollTrigger: {
        trigger: projectRef.current,
        containerAnimation: horizontalTween,
        start: "left center",
        toggleActions: "play none none reverse",
      },
    });

    // Work title animation
    gsap.from(".work-title", {
      y: 100,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: workRef.current,
        containerAnimation: horizontalTween,
        start: "left right",
        end: "left center",
        scrub: 2,
      },
    });
  });

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <div className="flex">
        <section
          className="relative w-screen h-screen shrink-0"
          ref={projectRef}
          id={id}
        >
          <div>
            <p>Things I've been working on</p>
            <h3
              className={`project-title ${alata.className} text-[430px] absolute bottom-0 leading-62 mb-35 -right-15`}
            >
              projects
            </h3>
          </div>
        </section>

        <section className="w-screen h-screen shrink-0" ref={workRef}></section>
      </div>
    </div>
  );
}
