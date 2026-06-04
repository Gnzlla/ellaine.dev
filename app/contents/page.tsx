"use client";
import React, { useRef } from "react";
import { alata } from "../fonts";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, CustomEase, ScrambleTextPlugin);

const NAV_ITEMS = [
  { label: "About Me", section: "about", subtitle: "KNOW MORE ABOUT ME!" },
  { label: "Projects", section: "projects", subtitle: "WHAT I DID" },
  { label: "Tech Stack", section: "tech", subtitle: "WHAT CAN I DO?" },
  { label: "Contact", section: "footer", subtitle: "LET'S COLLABORATE!" },
];

export default function TableOfContents() {
  const closeMenuRef = useRef<() => void>(() => {});

  useGSAP(() => {
    CustomEase.create("hop", "0.87,0,0.13,1");

    // ── Scramble setup ────────────────────────────────────────────────────────
    const scrambleElements =
      document.querySelectorAll<HTMLElement>(".scrambleText");
    const originalTexts = new Map<HTMLElement, string>();
    scrambleElements.forEach((el) =>
      originalTexts.set(el, el.textContent || ""),
    );

    // ── SplitText — one split per nav item h1 ────────────────────────────────
    // We track splits so we can reset them on close without re-splitting.
    const allSplits: ReturnType<typeof SplitText.create>[] = [];

    document.querySelectorAll<HTMLElement>(".menu-col a h1").forEach((el) => {
      const split = SplitText.create(el, { type: "lines", linesClass: "line" });
      allSplits.push(split);
      // Start lines above their clip container (the <a> has overflow:hidden)
      gsap.set(split.lines, { yPercent: -110 });
    });

    // ── DOM nodes ─────────────────────────────────────────────────────────────
    const menuToggleBtn =
      document.querySelector<HTMLElement>(".menu-toggle-btn");
    const menuExitBtn = document.querySelector<HTMLElement>(".menu-exit-btn");
    const menuOverlay = document.querySelector<HTMLElement>(".menu-overlay");
    const menuOverlayContent = document.querySelector<HTMLElement>(
      ".menu-overlay-content",
    );
    const hamburgerIcon = document.querySelector<HTMLElement>(
      ".menu-hamburger-icon",
    );

    if (
      !menuToggleBtn ||
      !menuExitBtn ||
      !menuOverlay ||
      !menuOverlayContent ||
      !hamburgerIcon
    )
      return;

    // Set the overlay content to its closed position in GSAP units
    // (not via Tailwind -translate-y-1/2, which GSAP will fight)
    gsap.set(menuOverlayContent, { yPercent: -50 });

    let isOpen = false;
    let isAnimating = false;

    // ── Open ──────────────────────────────────────────────────────────────────
    const openMenu = () => {
      if (isOpen || isAnimating) return;
      isAnimating = true;
      isOpen = true;
      hamburgerIcon.classList.add("active");

      // Allow pointer events on the overlay immediately
      gsap.set(menuOverlay, { pointerEvents: "auto" });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false;
        },
      });

      // 1. Reveal overlay via clip-path wipe
      tl.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "hop",
      })
        // 2. Slide content into view simultaneously
        .to(menuOverlayContent, { yPercent: 0, duration: 1, ease: "hop" }, "<")
        // 3. Lines rise up inside their clipped containers, staggered per item
        .to(
          allSplits.flatMap((s) => s.lines),
          { yPercent: 0, duration: 0.7, ease: "hop", stagger: 0.08 },
          "-=0.4",
        );
    };

    // ── Close ─────────────────────────────────────────────────────────────────
    const closeMenu = () => {
      if (!isOpen || isAnimating) return;
      isAnimating = true;
      isOpen = false;
      hamburgerIcon.classList.remove("active");

      const tl = gsap.timeline({
        onComplete: () => {
          // Reset line positions for next open
          gsap.set(
            allSplits.flatMap((s) => s.lines),
            { yPercent: -110 },
          );
          gsap.set(menuOverlay, { pointerEvents: "none" });
          isAnimating = false;
        },
      });

      tl.to(menuOverlayContent, { yPercent: -50, duration: 1, ease: "hop" }).to(
        menuOverlay,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "<",
      );
    };

    closeMenuRef.current = closeMenu;

    // ── Event listeners ───────────────────────────────────────────────────────
    menuToggleBtn.addEventListener("click", () =>
      isOpen ? closeMenu() : openMenu(),
    );
    menuExitBtn.addEventListener("click", closeMenu);
    menuOverlay
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));

    // ── Scramble hover ────────────────────────────────────────────────────────
    scrambleElements.forEach((el) => {
      const original = originalTexts.get(el) || "";
      const tl = gsap.timeline({ paused: true }).to(el, {
        duration: 1.2,
        scrambleText: {
          text: original,
          revealDelay: 0.2,
          chars: "upperAndLowerCase",
        },
      });
      (el as any)._tl = tl;
      (el as any)._originalText = original;
    });
  }, []);

  const onEnter = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget as any)?._tl?.restart();

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const original = (e.currentTarget as any)._originalText;
    if (original) gsap.set(e.currentTarget, { textContent: original });
  };

  const handleNavClick = (sectionId: string) => {
    closeMenuRef.current();
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  };

  return (
    <>
      {/* ── Menu Overlay ──────────────────────────────────────────────────────── */}
      {/*
        `pointer-events-none` by default — GSAP switches it to `auto` on open
        and back to `none` on close (set in the timeline onComplete).
        Initial clip-path hides everything; GSAP animates it open.
      */}
      <div
        className="z-[199] fixed inset-0 bg-[var(--white-background)] overflow-hidden pointer-events-none will-change-[clip-path] menu-overlay"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        {/*
          NO Tailwind translate here — GSAP owns this element's transform.
          gsap.set(menuOverlayContent, { yPercent: -50 }) in useGSAP handles
          the initial position so there's no conflict.
        */}
        <div
          className="fixed inset-0 flex overflow-hidden pointer-events-auto will-change-transform menu-overlay-content"
        >
          {/* Exit button */}
          <button
            className="top-4 sm:top-5 right-4 sm:right-8 z-10 absolute hover:shadow-2xl p-2 border border-transparent rounded-xl duration-300 ease-in cursor-pointer menu-exit-btn"
            aria-label="Close menu"
          >
            <div className="relative flex justify-center items-center w-8 h-8">
              <span className="absolute bg-neutral-800 w-4 h-[1.5px] rotate-45" />
              <span className="absolute bg-neutral-800 w-4 h-[1.5px] -rotate-45" />
            </div>
          </button>

          {/* Centred content */}
          <div className="relative flex justify-center items-center w-full">
            <div className="px-6 sm:px-10 lg:px-0 w-full lg:w-3/4 max-w-3xl">
              <p className="mb-6 sm:mb-8 text-neutral-400 text-xs text-center tracking-widest">
                CONTENTS
              </p>

              <div className="flex flex-col">
                {NAV_ITEMS.map(({ label, section, subtitle }) => (
                  <div key={section} className="menu-col">
                    <h3 className="mb-1 text-neutral-400 text-xs tracking-widest">
                      {subtitle}
                    </h3>

                    {/*
                      overflow-hidden here is what clips the SplitText lines
                      so the `yPercent: -110` start position is invisible.
                      Without this the lines slide in from above visibly.
                    */}
                    <a
                      href={`#${section}`}
                      className="block overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(section);
                      }}
                    >
                      <h1
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                        className={`
                          scrambleText font-medium leading-tight text-neutral-800
                          ${alata.className}
                          text-[11vw] sm:text-[8vw] md:text-[7vw] lg:text-[55px]
                        `}
                      >
                        {label}
                      </h1>
                    </a>

                    <hr className="mt-3 sm:mt-4 border-neutral-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Each SplitText line needs its own overflow clip */
        .line {
          overflow: hidden;
          will-change: transform;
        }

        .menu-hamburger-icon.active span:nth-child(1) {
          transform: translateY(0) rotate(45deg) scaleX(1.05) !important;
        }
        .menu-hamburger-icon.active span:nth-child(2) {
          transform: translateY(0) rotate(-45deg) scaleX(1.05) !important;
        }
      `}</style>
    </>
  );
}
