"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Headroom({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const showAnim = gsap
      .from(headerRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .progress(1);

    const scrollTrigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      showAnim.kill();
    };
  }, []);

  return (
    <div ref={headerRef} className="top-0 left-0 z-50 fixed w-full">
      {children}
    </div>
  );
}
