"use client";
import { useRef } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { alata } from "../fonts";

gsap.registerPlugin(CustomEase);

// Each letter has a vertical "nudge" (translateY as % of font-size)
// so they sit at staggered heights — like a bouncing keyboard.
// This replaces the brittle absolute-positioning approach entirely.
const LETTERS: {
  char: string;
  nudge: string;
  accent?: boolean;
  rotate: string;
}[] = [
  { char: "L", nudge: "-15%", rotate: "-6deg" },
  { char: "A", nudge: "20%", rotate: "5deg" },
  { char: "i", nudge: "-25%", rotate: "-4deg", accent: true },
  { char: "N", nudge: "18%", rotate: "7deg" },
  { char: "E", nudge: "-10%", rotate: "-5deg" },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      CustomEase.create("bounce", "M0,0 C0.6,0 0.4,1 1,1");

      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");

      gsap.set(letters, { autoAlpha: 0, y: -600 });
      gsap.set(taglineRef.current, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "bounce", duration: 0.9 } });

      const order = [...letters].sort(() => Math.random() - 0.5);
      order.forEach((el, i) => {
        tl.to(el, { autoAlpha: 1, y: 0 }, i * 0.12);
      });

      tl.to(letters, {
        scaleY: 0.88,
        scaleX: 1.06,
        transformOrigin: "50% 100%",
        ease: "power2.out",
        duration: 0.12,
        stagger: 0.04,
      });

      tl.to(letters, {
        scaleY: 1,
        scaleX: 1,
        ease: "elastic.out(1, 0.4)",
        duration: 0.6,
        stagger: 0.04,
      });

      tl.to(
        taglineRef.current,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.7,
        },
        "-=0.3",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className={`
        relative flex flex-col items-center justify-center
        w-full h-dvh overflow-hidden 
        bg-[var(--white-background)]
        ${alata.className}
      `}
    >
      <div
        className="flex justify-center items-end leading-none select-none"
        style={{ fontSize: "clamp(100px, 22vw, 260px)" }}
      >
        {LETTERS.map(({ char, nudge, accent, rotate }) => (
          <span
            key={char}
            className={`
              hero-letter inline-block
              ${
                accent
                  ? "text-[var(--yellow-font)]"
                  : "text-[var(--black-font)]"
              }
            `}
            style={{
              transform: `translateY(${nudge}) rotate(${rotate})`,
              marginInline: "-0.01em",
              willChange: "transform, opacity",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <p
        ref={taglineRef}
        className="opacity-50 mt-6 text-[var(--black-font)] text-center uppercase tracking-widest"
        style={{
          fontSize: "clamp(0.65rem, 1.8vw, 1rem)",
          letterSpacing: "0.25em",
        }}
      >
        web developer · designer · builder
      </p>
    </section>
  );
}
